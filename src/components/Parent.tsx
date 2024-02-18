import { useState , useEffect } from 'react';
import Users from './Users';
import TextArea from './TextArea';
interface sele{
    name:string,number:string,email:string,avatar_id:string
  }
const Parent = ({user}:{user:sele}) => {
    const [selected,setS]=useState<sele|null>(null);
    const [socket,setSocket]=useState<WebSocket|null>(null);
    useEffect(()=>{
        const sock=new WebSocket(`ws://localhost:3006?number=${user.number}`);
        sock.onopen=()=>{
          const ff:{message:string}={
            message:"connected"
          }
        const body=JSON.stringify(ff);
          sock.send(body);
        };
        sock.addEventListener('message',(event:any)=>{
          console.log("message coming");
          const response=JSON.parse(event.data);
          console.log(response);
          if(response.type="notification"){

          }
          else if(response.type="message"){
            
          }
        });setSocket(sock);
    },[])
  return (
    <div className='md:flex gap-2'>
        <div className=''>
        {socket?<Users selected={selected} setS={setS} socket={socket}/>:<h1>Loadingg..</h1>}
        </div>
        <div className={`flex-1`}>
        {/* {<div className='w-full bg-gray-300'><button onClick={(e)=>{
            e.preventDefault();
            setS(null);
          }}>back</button></div>} */}
        {selected?
        socket?.OPEN?<TextArea  socket={socket} number={user.number} selected={selected}/>:
        <div className='h-[650px] flex justify-center items-center bg-gray-200'>Trying to connect to websocket server Please refersh....</div>
        :<div className='h-[650px] flex justify-center items-center bg-gray-200'>
            <h1 className='text-2xl font-semibold text-violet-300'>Send message to other using chaat</h1>    
        </div>}</div>
    </div>
  )
}

export default Parent