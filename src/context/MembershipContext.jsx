import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { membershipPlans as initialMembershipPlans } from "../data/dashboard";

const STORAGE_KEY = "urbangrind-membership-plans";
const MembershipContext = createContext(null);

const normalizePlan = (plan, fallbackId) => ({
  id: Number(plan.id) || fallbackId,
  name: plan.name?.trim() ?? "",
  price: plan.price?.trim() ?? "",
  features: Array.isArray(plan.features)
    ? plan.features.map((feature) => feature.trim()).filter(Boolean)
    : [],
  popular: Boolean(plan.popular),
  trainerRequired: Boolean(plan.trainerRequired),
});

const loadMembershipPlans = () => {
  const fallback = initialMembershipPlans.map((plan, index) =>
    normalizePlan(plan, index + 1)
  );

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return fallback;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return fallback;
    }

    return parsed.map((plan, index) => normalizePlan(plan, index + 1));
  } catch {
    return fallback;
  }
};

export const MembershipProvider = ({ children }) => {
  const [plans, setPlans] = useState(() => loadMembershipPlans());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      setPlans(loadMembershipPlans());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const savePlan = ({ id, name, price, features, popular, trainerRequired }) => {
    setPlans((current) => {
      const normalizedPlan = normalizePlan(
        {
          id,
          name,
          price,
          features,
          popular,
          trainerRequired,
        },
        current.length ? Math.max(...current.map((plan) => plan.id)) + 1 : 1
      );

      const withoutCurrent = current.filter((plan) => plan.id !== normalizedPlan.id);
      const nextPlans = [...withoutCurrent, normalizedPlan].sort(
        (first, second) => first.id - second.id
      );

      if (!normalizedPlan.popular) {
        return nextPlans;
      }

      return nextPlans.map((plan) => ({
        ...plan,
        popular: plan.id === normalizedPlan.id,
      }));
    });
  };

  const deletePlan = (planId) => {
    setPlans((current) => current.filter((plan) => plan.id !== planId));
  };

  const value = useMemo(
    () => ({
      plans,
      savePlan,
      deletePlan,
    }),
    [plans]
  );

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembershipPlans = () => {
  const context = useContext(MembershipContext);

  if (!context) {
    throw new Error("useMembershipPlans must be used within a MembershipProvider");
  }

  return context;
};
