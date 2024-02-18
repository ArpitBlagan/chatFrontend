import * as z from 'zod';
import { useForm , SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerSchema } from '../schemas';
type user=z.infer<typeof registerSchema>;
const Register = () => {
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm<user>(
        {resolver:zodResolver(registerSchema)}
    )
    const submit:SubmitHandler<user>=async(data:user)=>{
        console.log(data);
        const dd:user={
            name:data.name,
            email:data.email,
            number:data.number,
            password:data.password,
        }
        try{
        const res=await axios.post('http://localhost:3006/register',dd,{withCredentials:true});
        console.log(res.data);toast("created user");navigate("/login");}
        catch(err){console.log(err);}
      }
  return (
    <div className='flex justify-center items-center mt-[15%] '>
        <div className='flex flex-col items-center bg-violet-300 px-5 py-2 rounded-2xl md:w-[500px]'>
        <h1 className='text-2xl text-semibold'>Register...</h1>
        <form onSubmit={handleSubmit(submit)} >
        <div>
            <h1>Name:</h1>
            <input  id="name" className="p-2 h-[40px] rounded-lg w-[300px]"
                    placeholder='name' required {...register("name")} />
            {errors.name && (
                <p className="text-xs italic text-red-500 mt-2"> 
                    {errors.name?.message}
                </p>)
            } 
            </div>
            <div>
            <h1>Email:</h1>
            <input  id="email" className="p-2 h-[40px] rounded-lg w-[300px]"
                    placeholder='email' required {...register("email")} />
            {errors.email && (
                <p className="text-xs italic text-red-500 mt-2"> 
                    {errors.email?.message}
                </p>)
            } 
            </div>
            <div>
            <h1>Number:</h1>
            <input  id="number" className="p-2 h-[40px] rounded-lg w-[300px]"
                    placeholder='number' required {...register("number")} />
            {errors.number && (
                <p className="text-xs italic text-red-500 mt-2"> 
                    {errors.number?.message}
                </p>)
            } 
            </div>
            <div>
            <h1>password:</h1>
            <input  id="password" className="p-2 h-[40px] rounded-lg w-[300px]"
                    placeholder='password' required {...register("password")} />
            {errors.password && (
                <p className="text-xs italic text-red-500 mt-2"> 
                    {errors.password?.message}
                </p>)
            } 
            </div>
            <div className='flex justify-center py-3'>
            <button type="submit" className='bg-violet-500 px-4 py-2 rounded-md'>Register</button>
            </div>
            <div className='text-center'>
                <h1>
                    Already Registered than <Link className='font-semibold underline text-violet-700' to="/login">Login</Link>
                </h1>
            </div>
        </form></div>
    </div>
  )
}

export default Register