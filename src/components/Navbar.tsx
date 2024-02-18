import { Link } from "react-router-dom"
import { useContext } from 'react';
import { context } from "../ContextP"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const value=useContext(context);
  const navigate=useNavigate();
  const handleL=async(event:React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    try{
    const res=await axios.get(`http://localhost:3006/logout`,{withCredentials:true});
    if(res.data.message=="done"){
      navigate("/login");
    }}
    catch(err){
      toast("something went wrong try agian");
    }
  }
  return (
    <div className="rounded-lg mt-2 mx-5 h-[50px] bg-violet-300 flex justify-between items-center px-2">
        <Link to="/" className="underline text-xl font-semibold">Chaat</Link>
        {value&&value.user.number.length?<div className="flex gap-3">
          <button className="px-4 py-2" onClick={handleL}>Logout</button>
        </div>:
        <div className="flex gap-3">
          <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>}
    </div>
  )
}

export default Navbar