
import card1 from "./assets/image IPDR.png";
import card2 from "./assets/image OSINT.png";
import card3 from "./assets/image MOBILE.png";
import card4 from "./assets/image HARD_DRIVE.png";
import card5 from "./assets/image MEDIA.png";

export const officers = [
  { id: 1, name: "Insp. Singh Sandhu", badge: "PUN-078", email: "singh.sandhu@cencops.gov", department: "Digital Forensics", tasks: 4, rank: "Inspector", dob: "06-12-1977", age: "48 Years", district: "SAS Nagar", state: "Punjab" },
  { id: 2, name: "Sub. Insp. Priya Sharma", badge: "DEL-142", email: "p.sharma@cencops.gov", department: "Cyber Intelligence", tasks: 7, rank: "Sub Inspector", dob: "14-03-1990", age: "36 Years", district: "New Delhi", state: "Delhi" },
  { id: 3, name: "ACP Rajesh Kumar", badge: "MAH-005", email: "r.kumar@cencops.gov", department: "Media", tasks: 2, rank: "Asst. Commissioner", dob: "22-08-1982", age: "44 Years", district: "Mumbai", state: "Maharashtra" },
  { id: 4, name: "Const. Amit Patel", badge: "GUJ-881", email: "a.patel@cencops.gov", department: "IPDR/CDR", tasks: 12, rank: "Constable", dob: "05-11-1995", age: "31 Years", district: "Ahmedabad", state: "Gujarat" },
  { id: 5, name: "Tech. Sarah Jones", badge: "INT-442", email: "s.jones@cencops.gov", department: "Digital Forensics", tasks: 5, rank: "Technical Officer", dob: "19-01-1988", age: "38 Years", district: "Bangalore", state: "Karnataka" },
  { id: 6, name: "Insp. Vikram Singh", badge: "RAJ-210", email: "v.singh@cencops.gov", department: "Media", tasks: 8, rank: "Inspector", dob: "30-05-1980", age: "46 Years", district: "Jaipur", state: "Rajasthan" },
  { id: 7, name: "Sgt. Anita Desai", badge: "KAR-099", email: "a.desai@cencops.gov", department: "Cyber Intelligence", tasks: 3, rank: "Sergeant", dob: "11-09-1992", age: "34 Years", district: "Mysore", state: "Karnataka" }
];

export const tasks = [
  { id: 1, task: "Image seized laptop", assignedTo: "SI R. Kapoor", orderId: "ORD-2026-0158", date: "14th April", due: "Today", status: "DONE", department: "OSINT" },
  { id: 2, task: "Extract WhatsApp artifacts", assignedTo: "Const. K. Singh", orderId: "ORD-2024-0171", date: "1st May", due: "15th June", status: "PENDING", department: "Media" },
  { id: 3, task: "Recover deleted partition", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0001", date: "7th June", due: "15th June", status: "PENDING", department: "IPDR / CDR" },
  { id: 4, task: "Network log review", assignedTo: "SI T. Banerjee", orderId: "ORD-2025-7891", date: "10th June", due: "20th June", status: "DONE", department: "Mobile" },
  { id: 5, task: "Incident report draft", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0002", date: "1st June", due: "22nd June", status: "IN PROGRESS", department: "IPDR / CDR" },
  { id: 6, task: "Internship planner format", assignedTo: "Const. Ali Raza", orderId: "INT-3001", date: "10th June", due: "30th June", status: "IN PROGRESS", department: "Hard Drive" },
  { id: 7, task: "Analyse CCTV-3061", assignedTo: "Const. K. Singh", orderId: "ORD-2025-3172", date: "14th June", due: "16th July", status: "IN PROGRESS", department: "Media" },
  { id: 8, task: "Social media tracing", assignedTo: "Insp. P. Sharma", orderId: "ORD-2026-0159", date: "15th April", due: "18th April", status: "IN PROGRESS", department: "OSINT" },
  { id: 9, task: "Deep web forum monitoring", assignedTo: "Insp. P. Sharma", orderId: "ORD-2026-0160", date: "16th April", due: "20th April", status: "PENDING", department: "OSINT" },
  { id: 10, task: "Tower dump analysis", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0003", date: "2nd June", due: "10th June", status: "DONE", department: "IPDR / CDR" },
  { id: 11, task: "Cross-reference CDR", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0004", date: "3rd June", due: "12th June", status: "PENDING", department: "IPDR / CDR" },
  { id: 12, task: "Bypass pattern lock", assignedTo: "Const. J. Doe", orderId: "ORD-2025-7892", date: "11th June", due: "21th June", status: "IN PROGRESS", department: "Mobile" },
  { id: 13, task: "SIM card cloning detection", assignedTo: "SI T. Banerjee", orderId: "ORD-2025-7893", date: "12th June", due: "25th June", status: "PENDING", department: "Mobile" },
  { id: 14, task: "Decrypt ransomware files", assignedTo: "Const. Ali Raza", orderId: "INT-3002", date: "11th June", due: "25th June", status: "DONE", department: "Hard Drive" },
  { id: 15, task: "Audio enhancement", assignedTo: "Const. K. Singh", orderId: "ORD-2025-3173", date: "15th June", due: "20th July", status: "DONE", department: "Media" },
];

export const departments = [
  { id: 1, name: "IPDR / CDR", officers: 1, tasks: 4, image: card1 },
  { id: 2, name: "OSINT", officers: 2, tasks: 3, image: card2 },
  { id: 3, name: "Mobile", officers: 2, tasks: 3, image: card3 },
  { id: 4, name: "Hard Drive", officers: 1, tasks: 2, image: card4 },
  { id: 5, name: "Media", officers: 1, tasks: 3, image: card5 },
];

export const currentDepartment = "IPDR / CDR";
export const currentUser = "DSP Pandey";
