import axios from "axios";
import  Picker  from "emoji-picker-react";
import { useState , useEffect , useRef } from "react";
import toast from "react-hot-toast";
const TextArea = ({selected,number,socket}:{selected:any,number:string,socket:WebSocket}) => {
    const [show,setSs]=useState(false);
    const [text,setT]=useState("");
    const [typing,setTy]=useState(false);
    const [messages,setM]=useState<{text:string,number:string}[]>([]);
    const ref=useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight+10;
        }
      };
    const getChat=async()=>{
        const res=await axios.get(`http://localhost:3006/chat/:${number}/:${selected.number}`,
        {withCredentials:true});
        console.log(res.data);
        if(res.data[0]){setM(res.data[0].messages);}
    }
    useEffect(()=>{
        scrollToBottom();
    },[messages]);
    useEffect(()=>{toast(`chat with selected ${selected.name} in private`)},[selected])
    useEffect(()=>{
        getChat();
    },[selected])
    useEffect(()=>{
        socket.addEventListener('message',(event:any)=>{
            const response=JSON.parse(event.data);
            if(response.type=="message"){
                console.log(response);
                if(response.from==selected.number){
                setM((prev)=>{
                    return [...prev,{number:selected.number,text:response.message}];
                });}
            }
            else if(response.type=="notification"){
                if(response.from==selected.number){
                setTy(true);
                setTimeout(()=>{setTy(false)},3000);}
            }
        })
    },[])
    const handleE=(emojiObject:any)=>{
        setT((prev)=>{return prev+emojiObject.emoji});
        setSs(false);
    }
    const handleC=(event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        const data=JSON.stringify({
            type:"text",
            message:text,
            from:number,
            to:selected.number
        });
        //message send
        if(socket&&socket?.OPEN){
            const data2=JSON.stringify({
                type:"typing",
                from:number,
                to:selected.number
            });
            socket.send(data2)
        setT("");setM((prev)=>{
            return [...prev,{number:number,text:text}];
        })
        setTimeout(()=>{
            socket.send(data);}
        ,2000);

    }}
    
  return (
    <div className="flex flex-col justify-between items-center bg-gray-200 h-[570px]  md:h-[650px] overflow-auto-y">
        <div className="flex w-full my-3 justify-start items-start">
            <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${selected.avatar_id}.svg`} 
            height="50px" width="50px"
            className="rouned-full" 
            alt="default"/>
            <h1 className="font-semibold text-xl">{selected&&selected.name}</h1>
        </div>
        {typing&&<h1>typing.....</h1>}
        <div ref={ref} className="flex-1 flex flex-col justify-start w-full gap-2 overflow-y-auto overflow-hidden mb-3">
            {messages.map((ele,index)=>{
                console.log(ele);
                return <div key={index} className="flex flex-col w-full items-start
                        border-[2px] border-violet-400 rounded-md px-2 ">
                        <div className="flex text-xl font-semibold">
                            <h1>{ele.text}</h1>
                        </div>
                        {ele.number==number&&<p>you*</p>}
                    </div>
            })}
        </div>
        <div className="w-full mb-2">
            {show&&<div><Picker onEmojiClick={handleE}/></div>}
            <div className="flex flex-col md:flex-row justify-between gap-2">
            <input placeholder="enter message" onChange={(e)=>{setT(e.target.value)}}
            value={text} className="flex-1  bg-gray-500 w-full h[70px] md:h-[40px] border-[2px] border-gray-300 px-3 rounded-md"/>
            <button onClick={(event:React.MouseEvent<HTMLButtonElement>)=>{
                event.preventDefault();
                setSs(!show)
            }}  className="bg-violet-300 px-2 rounded-md">emoji</button>
            </div>
            <button className="px-6 py-2 rounded-md bg-violet-500" 
                onClick={handleC}>Submit</button>
        </div>
    </div>
  )
}

export default TextArea