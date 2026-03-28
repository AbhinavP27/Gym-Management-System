import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMembers } from "./MemberContext";
import { useTrainerDirectory } from "./TrainerContext";

const STORAGE_KEY = "urbangrind-attendance";
const AttendanceContext = createContext(null);

export const getToday = () => new Date().toISOString().split("T")[0];

const buildAttendanceRoster = (trainers, members) => {
  const today = getToday();

  return [
    ...trainers.map((trainer, index) => ({
      id: `trainer-${trainer.id}`,
      userId: trainer.id,
      name: trainer.name,
      role: "trainer",
      trainerId: null,
      date: today,
      status: index % 2 === 0 ? "Present" : "Absent",
    })),
    ...members.map((member, index) => ({
      id: `member-${member.id}`,
      userId: member.id,
      name: member.name,
      role: "member",
      trainerId: member.trainerId,
      date: today,
      status: index % 4 === 0 ? "Absent" : "Present",
    })),
  ];
};

const normalizeAttendance = (entries) => {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries
    .filter((entry) => entry && typeof entry === "object")
    .map((entry) => ({
      id: entry.id,
      userId: Number(entry.userId),
      name: entry.name ?? "",
      role: entry.role,
      trainerId: entry.trainerId == null ? null : Number(entry.trainerId),
      date: entry.date ?? getToday(),
      status: entry.status === "Absent" ? "Absent" : "Present",
    }));
};

const loadStoredAttendance = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    return normalizeAttendance(JSON.parse(stored));
  } catch {
    return null;
  }
};

const syncRoster = (currentEntries, trainers, members) => {
  const today = getToday();
  const currentMap = new Map(
    currentEntries
      .filter((entry) => entry.date === today)
      .map((entry) => [entry.id, entry])
  );

  return buildAttendanceRoster(trainers, members).map((entry) => {
    const existing = currentMap.get(entry.id);

    return existing
      ? {
          ...entry,
          status: existing.status,
        }
      : entry;
  });
};

export const AttendanceProvider = ({ children }) => {
  const { members } = useMembers();
  const { trainers } = useTrainerDirectory();
  const [attendance, setAttendance] = useState(() => {
    const stored = loadStoredAttendance();
    return stored && stored.length ? syncRoster(stored, trainers, members) : buildAttendanceRoster(trainers, members);
  });

  useEffect(() => {
    setAttendance((current) => syncRoster(current, trainers, members));
  }, [members, trainers]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
    } catch (error) {
      console.error("Failed to persist attendance", error);
    }
  }, [attendance]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      const stored = loadStoredAttendance();
      setAttendance(stored && stored.length ? syncRoster(stored, trainers, members) : buildAttendanceRoster(trainers, members));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [members, trainers]);

  const toggleAttendanceStatus = (id) => {
    setAttendance((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Present" ? "Absent" : "Present",
            }
          : item
      )
    );
  };

  const value = useMemo(
    () => ({
      attendance,
      toggleAttendanceStatus,
    }),
    [attendance]
  );

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>;
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);

  if (!context) {
    throw new Error("useAttendance must be used within an AttendanceProvider");
  }

  return context;
};
