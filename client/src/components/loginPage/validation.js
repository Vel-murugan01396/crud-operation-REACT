import { z } from 'zod';

const loginschema = z.object({
  
  email: z.string().email()
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,),
  password: z.string().min(4)
  .regex(
    /^(?=.*[!@#$%^&*])/,
    "Password should contain at least one special character"
  ),
});
export {loginschema};