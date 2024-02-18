import React, {createContext , useState , useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
interface User{
    name:string;
    email:string;
    number:string;
    id:number
}
export const context=createContext<{
    user: User;
    setU: (user: User) => void;
  }|null>(null);

const ContextP:React.FC<any>=({children})=>{
    const [user,setU]=useState({
        name:"",
        email:"",
        number:"",
        id:0
    }); 
    const check=async()=>{
        try{
            const res=await axios.get('http://localhost:3006/loggedIn',
                {withCredentials:true}
            );console.log(res.data);
            const id=Math.floor(Math.random()*100)+1;
            const val={
                email:res.data.email,name:res.data.name,number:res.data.number,id
            }
            setU(val);
            toast("welcome...")
        }
        catch(err){
            console.log(err);
            toast("Something went wrong. You need to login/register");
        }
    }
    useEffect(()=>{
        check();
    },[])
    return <context.Provider value={{user,setU}}>
            {children}
    </context.Provider>
}
export default ContextP;