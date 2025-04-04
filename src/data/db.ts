
import { Medicine } from "@/hooks/use-cart";

export type Symptom = {
  id: string;
  name: string;
  description: string;
  relatedMedicines: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  orders: Order[];
  medicalHistory: string[];
};

export type Order = {
  id: string;
  items: { medicineId: string; quantity: number }[];
  totalAmount: number;
  date: string;
  status: "processing" | "delivered" | "cancelled";
  address: string;
};

export type ChatMessage = {
  id: string;
  sender: "user" | "doctor";
  message: string;
  timestamp: number;
};

// Mock medicines database
export const medicines: Medicine[] = [
  {
    id: "m1",
    name: "Paracetamol",
    description: "Relief from fever and mild to moderate pain.",
    price: 5.99,
    image: "/placeholder.svg",
    dosage: "500mg",
    category: "pain-relief"
  },
  {
    id: "m2",
    name: "Ibuprofen",
    description: "Non-steroidal anti-inflammatory drug used to treat pain and inflammation.",
    price: 7.99,
    image: "/placeholder.svg",
    dosage: "200mg",
    category: "pain-relief"
  },
  {
    id: "m3",
    name: "Cetirizine",
    description: "Antihistamine used to relieve allergy symptoms.",
    price: 8.50,
    image: "/placeholder.svg",
    dosage: "10mg",
    category: "allergy"
  },
  {
    id: "m4",
    name: "Omeprazole",
    description: "Reduces stomach acid production to treat indigestion and heartburn.",
    price: 12.99,
    image: "/placeholder.svg",
    dosage: "20mg",
    category: "digestive-health"
  },
  {
    id: "m5",
    name: "Azithromycin",
    description: "Antibiotic used to treat a variety of bacterial infections.",
    price: 15.99,
    image: "/placeholder.svg",
    dosage: "250mg",
    category: "antibiotics"
  },
  {
    id: "m6",
    name: "Loratadine",
    description: "Non-drowsy antihistamine for allergy relief.",
    price: 9.99,
    image: "/placeholder.svg",
    dosage: "10mg",
    category: "allergy"
  },
  {
    id: "m7",
    name: "Amoxicillin",
    description: "Antibiotic used to treat bacterial infections.",
    price: 13.99,
    image: "/placeholder.svg",
    dosage: "500mg",
    category: "antibiotics"
  },
  {
    id: "m8",
    name: "Loperamide",
    description: "Anti-diarrheal medication.",
    price: 6.99,
    image: "/placeholder.svg",
    dosage: "2mg",
    category: "digestive-health"
  }
];

// Mock symptoms database
export const symptoms: Symptom[] = [
  {
    id: "s1",
    name: "Headache",
    description: "Pain in any region of the head.",
    relatedMedicines: ["m1", "m2"]
  },
  {
    id: "s2",
    name: "Fever",
    description: "A temporary increase in body temperature, often due to illness.",
    relatedMedicines: ["m1", "m2"]
  },
  {
    id: "s3",
    name: "Allergic Rhinitis",
    description: "Inflammation of the inside of the nose caused by an allergen.",
    relatedMedicines: ["m3", "m6"]
  },
  {
    id: "s4",
    name: "Heartburn",
    description: "A burning pain in the chest, just behind the breastbone.",
    relatedMedicines: ["m4"]
  },
  {
    id: "s5",
    name: "Sore Throat",
    description: "Pain, scratchiness or irritation of the throat.",
    relatedMedicines: ["m5", "m7"]
  },
  {
    id: "s6",
    name: "Diarrhea",
    description: "Loose, watery bowel movements.",
    relatedMedicines: ["m8"]
  },
  {
    id: "s7",
    name: "Muscle Pain",
    description: "Pain affecting the muscles of the body.",
    relatedMedicines: ["m1", "m2"]
  },
  {
    id: "s8",
    name: "Common Cold",
    description: "A mild viral infection of the nose and throat.",
    relatedMedicines: ["m1", "m3", "m6"]
  }
];

// Mock users database
export const users: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    orders: [
      {
        id: "o1",
        items: [
          { medicineId: "m1", quantity: 2 },
          { medicineId: "m3", quantity: 1 }
        ],
        totalAmount: 20.48,
        date: "2025-03-30",
        status: "delivered",
        address: "123 Main St, City, Country"
      }
    ],
    medicalHistory: ["Allergy to peanuts", "Asthma"]
  }
];

// Helper functions

export const getMedicineById = (id: string): Medicine | undefined => {
  return medicines.find(medicine => medicine.id === id);
};

export const getSymptomById = (id: string): Symptom | undefined => {
  return symptoms.find(symptom => symptom.id === id);
};

export const getMedicinesBySymptomId = (symptomId: string): Medicine[] => {
  const symptom = getSymptomById(symptomId);
  if (!symptom) return [];
  return symptom.relatedMedicines.map(id => getMedicineById(id)).filter(Boolean) as Medicine[];
};

export const getAllSymptoms = (): Symptom[] => {
  return symptoms;
};

export const getAllMedicines = (): Medicine[] => {
  return medicines;
};

export const getMedicinesByCategory = (category: string): Medicine[] => {
  return medicines.filter(medicine => medicine.category === category);
};

export const getCategories = (): string[] => {
  const categoriesSet = new Set(medicines.map(medicine => medicine.category));
  return Array.from(categoriesSet);
};

// Chatbot responses
export const getChatbotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("headache") || lowerMessage.includes("head pain")) {
    return "For headaches, I would recommend paracetamol or ibuprofen. Make sure to stay hydrated and rest. If your headache is severe or persistent, please consult a doctor.";
  }
  
  if (lowerMessage.includes("fever")) {
    return "For fever, paracetamol can help reduce your temperature. Stay hydrated and rest. If your fever is high (above 39°C/102°F) or lasts more than 3 days, please see a doctor.";
  }
  
  if (lowerMessage.includes("allergy") || lowerMessage.includes("allergic")) {
    return "For allergies, antihistamines like cetirizine or loratadine can help. Avoid known allergens and keep your living space clean. If you experience severe symptoms like difficulty breathing, seek emergency care.";
  }
  
  if (lowerMessage.includes("heartburn") || lowerMessage.includes("acid reflux")) {
    return "For heartburn, omeprazole can help reduce stomach acid. Avoid spicy foods, large meals, and eating before bedtime. If symptoms persist, please consult a doctor.";
  }
  
  if (lowerMessage.includes("sore throat")) {
    return "For a sore throat, warm salt water gargles can help. Paracetamol can relieve the pain. If it's severe or lasts more than a week, you might need antibiotics - please consult a doctor.";
  }
  
  if (lowerMessage.includes("diarrhea")) {
    return "For diarrhea, loperamide can provide relief. Stay hydrated and consider electrolyte solutions. If it lasts more than 2 days or is accompanied by fever or severe pain, please see a doctor.";
  }
  
  if (lowerMessage.includes("cold") || lowerMessage.includes("cough")) {
    return "For cold symptoms, rest and hydration are key. Paracetamol can help with discomfort, and antihistamines may help with a runny nose. If symptoms worsen or last more than a week, please consult a doctor.";
  }
  
  // Default responses
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm Dr. Bot, your virtual health assistant. How can I help you today?";
  }
  
  if (lowerMessage.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  
  return "I'm not sure I understand. Could you please provide more details about your symptoms? For medical emergencies, please call emergency services immediately.";
};
