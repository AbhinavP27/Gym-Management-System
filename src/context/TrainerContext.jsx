import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { trainers as initialTrainerRoster } from "../data/dashboard";
import { useMembers } from "./MemberContext";

const STORAGE_KEY = "urbangrind-trainer-roster";
const TrainerContext = createContext(null);
const TRAINER_SEED_BY_ID = new Map(
  initialTrainerRoster.map((trainer) => [Number(trainer.id), trainer])
);
const TRAINER_NAME_MIGRATION = {
  "Smith Doe": "Tharun Kumar",
  "Emily Smith": "Varsha Tharun",
  "Michael John": "Alen Mathew",
};

export const TRAINER_STATUSES = ["Active", "Busy", "On Leave"];

export const getTrainerStatusClass = (status) => {
  if (status === "Active") return "pill--green";
  if (status === "Busy") return "pill--blue";
  return "pill--amber";
};

const normalizeTrainer = (trainer) => ({
  ...trainer,
  name: TRAINER_NAME_MIGRATION[trainer.name] ?? trainer.name ?? "",
  specialization: trainer.specialization ?? trainer.role ?? "",
  email:
    trainer.email?.trim() ||
    TRAINER_SEED_BY_ID.get(Number(trainer.id))?.email?.trim() ||
    `${(TRAINER_NAME_MIGRATION[trainer.name] ?? trainer.name ?? "trainer")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ".")
      .replace(/(^\.|\.$)/g, "")}@urbangrind.com`,
  members: Number(trainer.members) || 0,
  image: trainer.image ?? "",
  certificates: trainer.certificates ?? "",
  experience: trainer.experience ?? "",
  details: trainer.details ?? "",
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

    const normalizedStored = parsed.map(normalizeTrainer);
    const storedById = new Map(normalizedStored.map((trainer) => [Number(trainer.id), trainer]));
    const mergedSeedTrainers = fallback.map((seedTrainer) =>
      normalizeTrainer({
        ...seedTrainer,
        ...storedById.get(Number(seedTrainer.id)),
      })
    );
    const customTrainers = normalizedStored.filter(
      (trainer) => !TRAINER_SEED_BY_ID.has(Number(trainer.id))
    );

    return [...mergedSeedTrainers, ...customTrainers];
  } catch {
    return fallback;
  }
};

export const TrainerProvider = ({ children }) => {
  const { members } = useMembers();
  const [trainerRoster, setTrainerRoster] = useState(() => loadTrainerRoster());

  const trainers = useMemo(() => {
    const memberCountByTrainer = members.reduce((accumulator, member) => {
      if (member.trainerId == null) {
        return accumulator;
      }

      accumulator[member.trainerId] = (accumulator[member.trainerId] ?? 0) + 1;
      return accumulator;
    }, {});

    return trainerRoster.map((trainer) => ({
      ...trainer,
      members: memberCountByTrainer[trainer.id] ?? 0,
    }));
  }, [members, trainerRoster]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trainerRoster));
    } catch (error) {
      console.error("Failed to persist trainer roster", error);
    }
  }, [trainerRoster]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      setTrainerRoster(loadTrainerRoster());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateTrainerStatus = (trainerId, status) => {
    setTrainerRoster((current) =>
      current.map((trainer) =>
        trainer.id === trainerId ? { ...trainer, status } : trainer
      )
    );
  };

  const addTrainer = ({
    name,
    specialization,
    image,
    certificates,
    experience,
  }) => {
    setTrainerRoster((current) => [
      ...current,
      {
        id: current.length ? Math.max(...current.map((trainer) => trainer.id)) + 1 : 1,
        name,
        role: specialization,
        specialization,
        members: 0,
        image: image ?? "",
        status: TRAINER_STATUSES[0],
        certificates: certificates ?? "",
        experience: experience ?? "",
        details: "",
      },
    ]);
  };

  const saveTrainer = ({
    id,
    name,
    specialization,
    image,
    certificates,
    experience,
  }) => {
    setTrainerRoster((current) =>
      current.map((trainer) =>
        trainer.id === id
          ? {
              ...trainer,
              name,
              role: specialization,
              specialization,
              image: image ?? trainer.image ?? "",
              certificates: certificates ?? trainer.certificates ?? "",
              experience: experience ?? trainer.experience ?? "",
            }
          : trainer
      )
    );
  };

  const deleteTrainer = (trainerId) => {
    setTrainerRoster((current) =>
      current.filter((trainer) => trainer.id !== trainerId)
    );
  };

  const value = useMemo(
    () => ({
      trainers,
      addTrainer,
      saveTrainer,
      deleteTrainer,
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
