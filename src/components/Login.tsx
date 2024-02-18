import * as z from 'zod';
import { useContext, useState } from 'react';
import { context } from '../ContextP';
import { useForm , SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import { loginSchema } from '../schemas';
type user=z.infer<typeof loginSchema>;
const Login = () => {
    const [disabel,setD]=useState(false);
    const navigate=useNavigate();
    const value=useContext(context);
    const {register,handleSubmit,formState:{errors}}=useForm<user>(
        {resolver:zodResolver(loginSchema)}
    )
    const submit:SubmitHandler<user>=async(data:user)=>{
        console.log(data);
        const dd:user={
            number:data.number,
            password:data.password,
        };
        setD(true);
        try{
        const res=await axios.post('https://chat-backend-wvub.onrender.com/login',dd,{withCredentials:true});
        console.log(res.data);toast("created user");setD(false);
        if(value){
        value.setU({
            name:res.data.name,email:res.data.email,number:res.data.number,
        })}
        navigate("/");}
        catch(err){setD(false);toast("something went wrong");console.log(err);}
      }
  return (
    <div className='flex justify-center items-center mt-[20%]'>
        <div className='flex flex-col justify-center items-center bg-violet-300 px-5 py-2 rounded-2xl md:w-[500px]'>
        <h1 className='text-2xl text-semibold'>Login...</h1>
        <form onSubmit={handleSubmit(submit)} >
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
            <button type="submit" disabled={disabel} className='bg-violet-500 px-4 py-2 rounded-md'>
                {disabel?"Loading":"Login"}
            </button>
            </div>
            <div className='text-center'>
                <h1>
                    Not Registered than <Link className='font-semibold underline text-violet-700' to="/register">Register</Link>
                </h1>
            </div>
        </form></div>
    </div>
  )
}

export default Login