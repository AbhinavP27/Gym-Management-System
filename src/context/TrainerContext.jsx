import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { trainers as initialTrainerRoster } from "../data/dashboard";

const STORAGE_KEY = "urbangrind-trainer-roster";
const TrainerContext = createContext(null);

export const TRAINER_STATUSES = ["Active", "Busy", "On Leave"];

export const getTrainerStatusClass = (status) => {
  if (status === "Active") return "pill--green";
  if (status === "Busy") return "pill--blue";
  return "pill--amber";
};

const normalizeTrainer = (trainer) => ({
  ...trainer,
  specialization: trainer.specialization ?? trainer.role ?? "",
  members: Number(trainer.members) || 0,
  status: TRAINER_STATUSES.includes(trainer.status)
    ? trainer.status
    : TRAINER_STATUSES[0],
});

const loadTrainerRoster = () => {
  const fallback = initialTrainerRoster.map(normalizeTrainer);

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

    return parsed.map(normalizeTrainer);
  } catch {
    return fallback;
  }
};

export const TrainerProvider = ({ children }) => {
  const [trainers, setTrainers] = useState(() => loadTrainerRoster());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trainers));
  }, [trainers]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      setTrainers(loadTrainerRoster());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateTrainerStatus = (trainerId, status) => {
    setTrainers((current) =>
      current.map((trainer) =>
        trainer.id === trainerId ? { ...trainer, status } : trainer
      )
    );
  };

  const addTrainer = ({ name, specialization, members, status }) => {
    setTrainers((current) => [
      ...current,
      {
        id: current.length ? Math.max(...current.map((trainer) => trainer.id)) + 1 : 1,
        name,
        role: specialization,
        specialization,
        members: Number(members) || 0,
        status,
        certificates: "",
        experience: "",
        details: "",
      },
    ]);
  };

  const value = useMemo(
    () => ({
      trainers,
      addTrainer,
      updateTrainerStatus,
    }),
    [trainers]
  );

  return (
    <TrainerContext.Provider value={value}>{children}</TrainerContext.Provider>
  );
};

export const useTrainerDirectory = () => {
  const context = useContext(TrainerContext);

  if (!context) {
    throw new Error("useTrainerDirectory must be used within a TrainerProvider");
  }

  return context;
};
