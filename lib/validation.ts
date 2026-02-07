import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .min(10, 'Phone must be at least 10 digits')
    .max(15, 'Phone must not exceed 15 digits')
    .regex(/^[0-9+\-\s()]*$/, 'Phone can only contain numbers and +, -, (), spaces'),
  serviceType: z.string().min(1, 'Please select a service type'),
});

export type LeadInput = z.infer<typeof leadSchema>;
