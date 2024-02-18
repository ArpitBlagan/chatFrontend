import * as z from 'zod';

export const loginSchema=z.object({
    number:z.string().min(10,'please provide valid number').max(10,'invalid number'),
    password:z.string().min(8,'enter atleast 8 characters')
})

export const registerSchema=z.object({
    name:z.string(),
    email:z.string().email('please put valid email only'),
    number:z.string().min(10,'please provide valid number').max(10,'invalid number'),
    password:z.string().min(8,'enter atleast 8 characters')
})