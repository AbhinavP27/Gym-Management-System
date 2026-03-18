export const stats = {
  members: 120,
  trainers: 8,
  activePlans: 95,
  revenue: 54000
}

export const trainers = [
  { id:1, name:"Rahul", specialization:"Strength", members:12 },
  { id:2, name:"Arjun", specialization:"Fat Loss", members:10 },
  { id:3, name:"Vikram", specialization:"Cardio", members:8 }
]

export const members = [
  { id:1, name:"John", plan:"Monthly", trainer:"Rahul", expiry:"2026-04-10" },
  { id:2, name:"David", plan:"Quarterly", trainer:"Arjun", expiry:"2026-06-10" },
  { id:3, name:"Sam", plan:"Yearly", trainer:"Vikram", expiry:"2027-01-01" }
]

export const membershipChart = [
  { name:"Monthly", value:40 },
  { name:"Quarterly", value:30 },
  { name:"Half Year", value:15 },
  { name:"Yearly", value:15 }
]