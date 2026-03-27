import trainer1 from "../assets/trainer1.png";
import trainer2 from "../assets/trainer2.png";
import trainer3 from "../assets/trainer3.png";

const trainerProfiles = [
  {
    id: 1,
    name: "Tharun Kumar",
    role: "Strength Trainer",
    image: trainer1,
    status: "Active",
    certificates: "ACE Certified Trainer",
    experience: "8+ Years Experience",
    details: "Specialist in strength training, muscle gain programs and athletic performance.",
  },
  {
    id: 2,
    name: "Varsha Tharun",
    role: "Cardio Trainer",
    image: trainer2,
    status: "Busy",
    certificates: "ISSA Cardio Specialist",
    experience: "6+ Years Experience",
    details: "Expert in fat loss, endurance training and cardiovascular fitness programs.",
  },
  {
    id: 3,
    name: "Alen Mathew",
    role: "Bodybuilding Trainer",
    image: trainer3,
    status: "On Leave",
    certificates: "IFBB Certified Coach",
    experience: "10+ Years Experience",
    details: "Professional bodybuilding coach with expertise in competition preparation.",
  },
];

export const membershipPlans = [
  {
    id: 1,
    name: "Basic",
    price: "Rs 999 / month",
    features: [
      "Access to Gym Equipment",
      "Basic Workout Plan",
      "Locker Facility",
      "Fitness Assessment",
    ],
    popular: false,
    trainerRequired: false,
  },
  {
    id: 2,
    name: "Gold",
    price: "Rs 3499 / month",
    features: [
      "All Premium Features",
      "Personal Trainer (8 sessions)",
      "Diet Consultation",
      "Monthly Progress Tracking",
    ],
    popular: true,
    trainerRequired: true,
  },
  {
    id: 3,
    name: "Diamond",
    price: "Rs 5499 / month",
    features: [
      "All Gold Features",
      "Unlimited Personal Training",
      "Body Transformation Program",
      "Priority Support",
    ],
    popular: false,
    trainerRequired: true,
  },
];

export const members = [
  { id: 101, name: "Aarav Mehta", plan: "Gold", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-04-18" },
  { id: 102, name: "Neha Verma", plan: "Diamond", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-04-22" },
  { id: 103, name: "Rohan Nair", plan: "Gold", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-04-29" },
  { id: 104, name: "Priya Menon", plan: "Basic", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-05-03" },
  { id: 105, name: "Karthik Das", plan: "Diamond", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-05-09" },
  { id: 106, name: "Sana Ali", plan: "Gold", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-05-14" },
  { id: 107, name: "Vivek Raj", plan: "Basic", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-05-19" },
  { id: 108, name: "Meera Pillai", plan: "Gold", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-05-24" },
  { id: 109, name: "Ishaan Kapoor", plan: "Diamond", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-05-30" },
  { id: 110, name: "Kavya Reddy", plan: "Basic", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-06-05" },
  { id: 111, name: "Rahul Soman", plan: "Gold", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-06-11" },
  { id: 112, name: "Ananya Iyer", plan: "Diamond", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-06-17" },
  { id: 113, name: "Tarun Joseph", plan: "Basic", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-06-22" },
  { id: 114, name: "Diya Balan", plan: "Gold", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-06-28" },
  { id: 115, name: "Manav Khanna", plan: "Diamond", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-07-03" },
  { id: 116, name: "Sneha George", plan: "Basic", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-07-09" },
  { id: 117, name: "Arjun Paul", plan: "Gold", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-07-14" },
  { id: 118, name: "Nisha Thomas", plan: "Diamond", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-07-20" },
  { id: 119, name: "Varun Shetty", plan: "Basic", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-07-25" },
  { id: 200, name: "Pooja Rao", plan: "Gold", trainerId: 1, trainer: "Tharun Kumar", expiry: "2026-07-31" },
];

export const trainers = trainerProfiles.map((trainer) => ({
  ...trainer,
  specialization: trainer.role,
  members: members.filter((member) => member.trainerId === trainer.id).length,
}));

export const stats = {
  members: members.length,
  trainers: trainers.length,
  activePlans: membershipPlans.length,
  revenue: 54000,
};

export const membershipChart = [
  { name: "Basic", value: 6 },
  { name: "Gold", value: 8 },
  { name: "Diamond", value: 6 },
];
