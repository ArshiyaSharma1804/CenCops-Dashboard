
import card1 from "./assets/image IPDR.png";
import card2 from "./assets/image OSINT.png";
import card3 from "./assets/image MOBILE.png";
import card4 from "./assets/image HARD_DRIVE.png";
import card5 from "./assets/image MEDIA.png";

export const experts = [
  { id: 1, name: "Insp. Singh Sandhu", email: "sandhu@zoho.gov.in", badge: "PUN-078", category: "IPDR / CDR", cases: 4, rank: "Inspector", dob: "06-12-1977", age: "48 Years", district: "SAS Nagar", state: "Punjab", status: "Active", specialization: "Social Media" },
  { id: 2, name: "SI R. Kapoor", email: "ranvir.kapoor@gmail.com", badge: "CHD-071", category: "OSINT", cases: 3, rank: "Sub-Inspector", dob: "15-08-1985", age: "40 Years", district: "Chandigarh", state: "Chandigarh", status: "Active", specialization: "Cyber Forensics" },
  { id: 3, name: "SI T. Banerjee", email: "president.banerjee@gmail.com", badge: "KAN-324", category: "Mobile", cases: 3, rank: "Sub-Inspector", dob: "22-11-1990", age: "35 Years", district: "Kanpur", state: "Uttar Pradesh", status: "Active", specialization: "Mobile Forensics" },
  { id: 4, name: "Const. Ali Raza", email: "aliraza1@drdo.gov.in", badge: "UKR-742", category: "Hard Drive", cases: 2, rank: "Constable", dob: "10-05-1995", age: "30 Years", district: "Dehradun", state: "Uttarakhand", status: "Active", specialization: "Data Recovery" },
  { id: 5, name: "Const. K. Singh", email: "kulwinder29@gmail.com", badge: "CHD-009", category: "Media", cases: 3, rank: "Constable", dob: "01-02-1992", age: "34 Years", district: "Chandigarh", state: "Chandigarh", status: "Active", specialization: "Audio/Video Analysis" },
  { id: 6, name: "Insp. P. Sharma", email: "p.sharma@gov.in", badge: "DEL-101", category: "OSINT", cases: 2, rank: "Inspector", dob: "14-09-1980", age: "45 Years", district: "New Delhi", state: "Delhi", status: "Active", specialization: "Open Source Intelligence" },
  { id: 7, name: "Const. J. Doe", email: "j.doe@gov.in", badge: "MUM-202", category: "Mobile", cases: 1, rank: "Constable", dob: "30-07-1998", age: "27 Years", district: "Mumbai", state: "Maharashtra", status: "Active", specialization: "Device Unlocking" },
];

export const cases = [
  { id: 1, case: "Image seized laptop", assignedTo: "SI R. Kapoor", orderId: "ORD-2026-0158", date: "14th April", due: "Today", status: "DONE", category: "OSINT" },
  { id: 2, case: "Extract WhatsApp artifacts", assignedTo: "Const. K. Singh", orderId: "ORD-2024-0171", date: "1st May", due: "15th June", status: "PENDING", category: "Media" },
  { id: 3, case: "Recover deleted partition", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0001", date: "7th June", due: "15th June", status: "PENDING", category: "IPDR / CDR" },
  { id: 4, case: "Network log review", assignedTo: "SI T. Banerjee", orderId: "ORD-2025-7891", date: "10th June", due: "20th June", status: "DONE", category: "Mobile" },
  { id: 5, case: "Incident report draft", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0002", date: "1st June", due: "22nd June", status: "IN PROGRESS", category: "IPDR / CDR" },
  { id: 6, case: "Internship planner format", assignedTo: "Const. Ali Raza", orderId: "INT-3001", date: "10th June", due: "30th June", status: "IN PROGRESS", category: "Hard Drive" },
  { id: 7, case: "Analyse CCTV-3061", assignedTo: "Const. K. Singh", orderId: "ORD-2025-3172", date: "14th June", due: "16th July", status: "IN PROGRESS", category: "Media" },
  { id: 8, case: "Social media tracing", assignedTo: "Insp. P. Sharma", orderId: "ORD-2026-0159", date: "15th April", due: "18th April", status: "IN PROGRESS", category: "OSINT" },
  { id: 9, case: "Deep web forum monitoring", assignedTo: "Insp. P. Sharma", orderId: "ORD-2026-0160", date: "16th April", due: "20th April", status: "PENDING", category: "OSINT" },
  { id: 10, case: "Tower dump analysis", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0003", date: "2nd June", due: "10th June", status: "DONE", category: "IPDR / CDR" },
  { id: 11, case: "Cross-reference CDR", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0004", date: "3rd June", due: "12th June", status: "PENDING", category: "IPDR / CDR" },
  { id: 12, case: "Bypass pattern lock", assignedTo: "Const. J. Doe", orderId: "ORD-2025-7892", date: "11th June", due: "21th June", status: "IN PROGRESS", category: "Mobile" },
  { id: 13, case: "SIM card cloning detection", assignedTo: "SI T. Banerjee", orderId: "ORD-2025-7893", date: "12th June", due: "25th June", status: "PENDING", category: "Mobile" },
  { id: 14, case: "Decrypt ransomware files", assignedTo: "Const. Ali Raza", orderId: "INT-3002", date: "11th June", due: "25th June", status: "DONE", category: "Hard Drive" },
  { id: 15, case: "Audio enhancement", assignedTo: "Const. K. Singh", orderId: "ORD-2025-3173", date: "15th June", due: "20th July", status: "DONE", category: "Media" },
];

export const categories = [
  { id: 1, name: "IPDR / CDR", experts: 1, cases: 4, image: card1 },
  { id: 2, name: "OSINT", experts: 2, cases: 3, image: card2 },
  { id: 3, name: "Mobile", experts: 2, cases: 3, image: card3 },
  { id: 4, name: "Hard Drive", experts: 1, cases: 2, image: card4 },
  { id: 5, name: "Media", experts: 1, cases: 3, image: card5 },
];

export const currentCategory = "IPDR / CDR";
export const currentUser = "DSP Pandey";
