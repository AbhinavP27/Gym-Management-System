import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { members as initialMembers } from "../data/dashboard";

const STORAGE_KEY = "urbangrind-members";
const MemberContext = createContext(null);
const SEED_MEMBER_IDS = new Set(initialMembers.map((member) => Number(member.id)));
const normalizeEmail = (value = "") => value.trim().toLowerCase();

const buildDefaultEmail = (name, id) => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/(^\.|\.$)/g, "");

  return `${slug || "member"}${id}@urbangrind.demo`;
};

const normalizeFeedback = (feedback = []) => {
  if (!Array.isArray(feedback)) {
    return [];
  }

  return feedback
    .filter((entry) => entry && typeof entry === "object")
    .map((entry, index) => ({
      id:
        entry.id ??
        `feedback-${entry.createdAt ?? "legacy"}-${index}`,
      category: entry.category?.trim() || "General",
      rating: Math.max(1, Math.min(5, Number(entry.rating) || 5)),
      message: entry.message?.trim() ?? "",
      createdAt: entry.createdAt ?? new Date().toISOString(),
    }))
    .filter((entry) => entry.message);
};

const normalizeMember = (member) => {
  const id = Number(member.id);
  const name = member.name?.trim() ?? "";

  return {
    id,
    name,
    plan: member.plan?.trim() ?? "",
    trainerId: Number(member.trainerId) || null,
    trainer: member.trainer?.trim() ?? "",
    expiry: member.expiry ?? "",
    email: member.email?.trim() || buildDefaultEmail(name, id),
    password: member.password ?? "",
    gender: member.gender?.trim() ?? "",
    phone: member.phone?.trim() || `+91 900000${String(id).padStart(4, "0")}`,
    address: member.address?.trim() || "Chennai, Tamil Nadu",
    fitnessGoal: member.fitnessGoal?.trim() || "Build strength and stay consistent",
    emergencyContact:
      member.emergencyContact?.trim() || "Family Contact | +91 9444400000",
    joinedAt: member.joinedAt ?? "2025-01-01",
    feedback: normalizeFeedback(member.feedback),
    isDeleted: Boolean(member.isDeleted),
    deletedAt: member.deletedAt ?? null,
  };
};

const loadMembers = () => {
  const fallback = initialMembers.map(normalizeMember);

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

    const normalizedStored = parsed.map(normalizeMember);
    const storedById = new Map(normalizedStored.map((member) => [member.id, member]));
    const mergedSeedMembers = fallback.map((seedMember) => {
      const existing = storedById.get(seedMember.id);

      if (!existing) {
        return seedMember;
      }

      const shouldUseSeedEmail =
        !existing.email || existing.email.endsWith("@urbangrind.demo");

      return normalizeMember({
        ...seedMember,
        ...existing,
        email: shouldUseSeedEmail ? seedMember.email : existing.email,
      });
    });
    const customMembers = normalizedStored.filter(
      (member) => !SEED_MEMBER_IDS.has(member.id)
    );

    return [...mergedSeedMembers, ...customMembers];
  } catch {
    return fallback;
  }
};

const addMonths = (dateString, months) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  date.setMonth(date.getMonth() + months);
  return date.toISOString().slice(0, 10);
};

export const MemberProvider = ({ children }) => {
  const [memberRecords, setMemberRecords] = useState(() => loadMembers());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memberRecords));
    } catch (error) {
      console.error("Failed to persist members", error);
    }
  }, [memberRecords]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      setMemberRecords(loadMembers());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const members = useMemo(
    () => memberRecords.filter((member) => !member.isDeleted),
    [memberRecords]
  );

  const isEmailTaken = (email, excludeMemberId = null) => {
    const normalizedTargetEmail = normalizeEmail(email);

    if (!normalizedTargetEmail) {
      return false;
    }

    return memberRecords.some(
      (member) =>
        member.id !== Number(excludeMemberId) &&
        normalizeEmail(member.email) === normalizedTargetEmail
    );
  };

  const updateMemberPlan = (memberId, nextPlanName) => {
    setMemberRecords((current) =>
      current.map((member) =>
        member.id === memberId
          ? {
              ...member,
              plan: nextPlanName,
              expiry: addMonths(new Date().toISOString().slice(0, 10), 1),
            }
          : member
      )
    );
  };

  const updateMemberProfile = (memberId, updates) => {
    const nextEmail = updates.email?.trim();
    if (nextEmail && isEmailTaken(nextEmail, memberId)) {
      return {
        ok: false,
        error: "This email is already used by another member.",
      };
    }

    setMemberRecords((current) =>
      current.map((member) =>
        member.id === memberId
          ? {
              ...member,
              name: updates.name?.trim() || member.name,
              email: updates.email?.trim() || member.email,
              phone: updates.phone?.trim() || member.phone,
              address: updates.address?.trim() || member.address,
              fitnessGoal: updates.fitnessGoal?.trim() || member.fitnessGoal,
              emergencyContact:
                updates.emergencyContact?.trim() || member.emergencyContact,
            }
          : member
      )
    );

    return { ok: true };
  };

  const switchMemberTrainer = (memberId, trainer) => {
    setMemberRecords((current) =>
      current.map((member) =>
        member.id === memberId
          ? {
              ...member,
              trainerId: trainer?.id ?? null,
              trainer: trainer?.name ?? "",
            }
          : member
      )
    );
  };

  const addMemberFeedback = (memberId, feedback) => {
    setMemberRecords((current) =>
      current.map((member) =>
        member.id === memberId
          ? {
              ...member,
              feedback: [
                {
                  id: `feedback-${memberId}-${Date.now()}`,
                  category: feedback.category?.trim() || "General",
                  rating: Math.max(1, Math.min(5, Number(feedback.rating) || 5)),
                  message: feedback.message?.trim() ?? "",
                  createdAt: new Date().toISOString(),
                },
                ...member.feedback,
              ].filter((entry) => entry.message),
            }
          : member
      )
    );
  };

  const removeMemberFeedback = ({ memberId, feedbackId, createdAt }) => {
    setMemberRecords((current) =>
      current.map((member) =>
        member.id === Number(memberId)
          ? {
              ...member,
              feedback: member.feedback.filter(
                (entry) =>
                  !(
                    entry.id === feedbackId &&
                    entry.createdAt === createdAt
                  )
              ),
            }
          : member
      )
    );
  };

  const deleteMemberAccount = (memberId) => {
    setMemberRecords((current) =>
      current.map((member) =>
        member.id === memberId
          ? {
              ...member,
              isDeleted: true,
              deletedAt: new Date().toISOString(),
            }
          : member
      )
    );
  };

  const getMemberById = (memberId) =>
    memberRecords.find((member) => member.id === Number(memberId)) ?? null;

  const registerMember = ({
    name,
    email,
    password,
    phone,
    gender,
    plan,
    trainerId,
    trainer,
  }) => {
    if (isEmailTaken(email)) {
      return {
        ok: false,
        error: "This email is already used by another member.",
      };
    }

    const nextId = memberRecords.length
      ? Math.max(...memberRecords.map((member) => member.id)) + 1
      : 1;
    const today = new Date().toISOString().slice(0, 10);
    const newMember = normalizeMember({
      id: nextId,
      name,
      email,
      password,
      phone,
      gender,
      plan,
      trainerId,
      trainer,
      expiry: addMonths(today, 1),
      joinedAt: today,
      feedback: [],
      isDeleted: false,
      deletedAt: null,
    });

    setMemberRecords((current) => [...current, newMember]);

    return {
      ok: true,
      member: newMember,
    };
  };

  const value = useMemo(
    () => ({
      members,
      allMembers: memberRecords,
      getMemberById,
      isEmailTaken,
      registerMember,
      updateMemberPlan,
      updateMemberProfile,
      switchMemberTrainer,
      addMemberFeedback,
      removeMemberFeedback,
      deleteMemberAccount,
    }),
    [members, memberRecords]
  );

  return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>;
};

export const useMembers = () => {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error("useMembers must be used within a MemberProvider");
  }

  return context;
};
