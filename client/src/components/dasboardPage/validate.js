import { z } from 'zod';

const Addproductschema = z.object({
    productName: z.string().min(2).max(50),
    productDescription: z.string().min(2).max(50),
    grams: z.string().min(2).max(50),
    productPrice: z.string().min(2).max(50),
    quantity: z.string().min(2).max(50),
 
});
export {Addproductschema};