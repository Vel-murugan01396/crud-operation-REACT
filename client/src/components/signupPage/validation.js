import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email()
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,),
  password: z.string().min(4)
  .regex(
    /^(?=.*[!@#$%^&*])/,
    "Password should contain at least one special character"
  ),
});
export {schema};