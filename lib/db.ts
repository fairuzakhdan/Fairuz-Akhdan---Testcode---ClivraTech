import fs from 'fs';
import path from 'path';

// In-memory database for leads
export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  createdAt: string;
};

const DB_FILE = path.join(process.cwd(), 'data', 'leads.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Read leads from JSON file
const readLeads = (): Lead[] => {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

// Write leads to JSON file
const writeLeads = (leads: Lead[]) => {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(leads, null, 2));
};

export const db = {
  getLeads: () => readLeads(),
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const leads = readLeads();
    
    // Check if email already exists
    const emailExists = leads.some(existingLead => existingLead.email === lead.email);
    if (emailExists) {
      throw new Error('Email already registered');
    }
    
    // Check if phone number already exists
    const phoneExists = leads.some(existingLead => existingLead.phone === lead.phone);
    if (phoneExists) {
      throw new Error('Phone number already registered');
    }
    
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    leads.push(newLead);
    writeLeads(leads);
    return newLead;
  },
  filterByService: (serviceType: string) => 
    readLeads().filter(lead => lead.serviceType === serviceType),
};
