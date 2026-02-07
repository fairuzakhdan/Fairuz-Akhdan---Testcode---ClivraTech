// In-memory database for leads (Vercel-compatible)
export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  createdAt: string;
};

// Use in-memory storage for serverless deployment
let leads: Lead[] = [];

export const db = {
  getLeads: () => leads,
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => {
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
    return newLead;
  },
  filterByService: (serviceType: string) => 
    leads.filter(lead => lead.serviceType === serviceType),
};
