export const officers = [
  { id: 1, name: "Insp. Singh Sandhu", email: "sandhu@zoho.gov.in", badge: "PUN-078", department: "Digital Forensics Lab", tasks: 2 },
  { id: 2, name: "SI R. Kapoor", email: "ranvir.kapoor@gmail.com", badge: "CHD-071", department: "Police Station, Sector 17", tasks: 1 },
  { id: 3, name: "SI T. Banerjee", email: "president.banerjee@gmail.com", badge: "KAN-324", department: "Threat Intelligence", tasks: 1 },
  { id: 4, name: "Const. Ali Raza", email: "aliraza1@drdo.gov.in", badge: "UKR-742", department: "Cyber Crime Cell", tasks: 1 },
  { id: 5, name: "Const. K. Singh", email: "kulwinder29@gmail.com", badge: "CHD-009", department: "Digital Forensics Lab", tasks: 2 },
];

export const tasks = [
  { id: 1, task: "Image seized laptop", assignedTo: "SI R. Kapoor", orderId: "ORD-2026-0158", date: "14th April", due: "Today", status: "DONE" },
  { id: 2, task: "Extract WhatsApp artifacts", assignedTo: "Const. K. Singh", orderId: "ORD-2024-0171", date: "1st May", due: "15th June", status: "PENDING" },
  { id: 3, task: "Recover deleted partition", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0001", date: "7th June", due: "15th June", status: "PENDING" },
  { id: 4, task: "Network log review", assignedTo: "SI T. Banerjee", orderId: "ORD-2025-7891", date: "10th June", due: "20th June", status: "DONE" },
  { id: 5, task: "Incident report draft", assignedTo: "Insp. Singh Sandhu", orderId: "ORD-2026-0002", date: "1st June", due: "22nd June", status: "IN PROGRESS" },
  { id: 6, task: "Internship planner format", assignedTo: "Const. Ali Raza", orderId: "INT-3001", date: "10th June", due: "30th June", status: "IN PROGRESS" },
  { id: 7, task: "Analyse CCTV-3061", assignedTo: "Const. K. Singh", orderId: "ORD-2025-3172", date: "14th June", due: "16th July", status: "IN PROGRESS" },
];

export const departments = [
  { id: 1, name: "Digital Forensics", officers: 2, tasks: 4, image: "image_4_dfl.png", status: "ACTIVE" },
  { id: 2, name: "Cyber Crime", officers: 1, tasks: 1, image: "image_4_cc.png", status: "SWITCH" },
  { id: 3, name: "Threat Intelligence", officers: 1, tasks: 1, image: "image_4_ti.png", status: "SWITCH" },
];

export const currentDepartment = "Digital Forensics Lab";
export const currentUser = "DSP Pandey";
