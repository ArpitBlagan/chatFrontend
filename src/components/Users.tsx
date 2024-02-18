import axios from "axios"
import { useEffect , useState , useContext } from "react";
import { context } from "../ContextP";
interface props{
  selected:any
  setS:React.Dispatch<React.SetStateAction<any | null>>,
  socket:WebSocket
}
const Users = ({selected,setS,socket}:props) => {
    const [data,setD]=useState([]);
    const [newText,setNt]=useState<{from:string,seen:boolean}[]>([]);
    const value=useContext(context);
    if(value){
    console.log(value?.user.email);}
    const getData=async()=>{
        const res=await axios.get("https://chat-backend-wvub.onrender.com/users",
          {withCredentials:true});
        setD(res.data);
      }
      useEffect(()=>{
        getData();
      },[]);
      useEffect(()=>{
          socket.addEventListener('message',(event:any)=>{
            const response=JSON.parse(event.data);
            if(response.type=="message"&&(!selected||response.from!=selected.number)){
              const newA=newText;
              const present=newA.find((ele)=>{
                return (ele.from==response.from)
              });console.log(present);
              if(present){
                const val=newA.map((ele)=>{
                  if(ele.from==response.from){
                    ele.seen=false;
                  }
                  return ele;
                });
                setNt(val);
              }
              else{
                setNt((prev)=>{return [...prev,{from:response.from,seen:false}]});
              }
            }
          })
      },[]);
      useEffect(()=>{
        const val=newText;
        const nn=val.map((elee)=>{
          if(elee.from==selected.number){elee.seen=false;}
          return elee;
        });setNt(nn);
      },[selected]);
      const handleC=(event:React.MouseEvent<HTMLDivElement>,ele:any)=>{
        event.preventDefault();
        setS(ele);
      }
  return (
    <div>
        {data.length&&data.map((ele:{name:string,number:string,email:string,avatar_id:string},index)=>{
          var newMessage=false;
          newText.forEach((element) => {
              if(element.from==ele.number&&element.seen==false){newMessage=true}
              return;
          });
          return <div key={index} className={`flex flex-col w-full gap-2 py-2 px-5 border-[2px]
           border-violet-300 rounded cursor-pointer hover:px-7 bg-violet-${selected?.email==ele.email&&"500"}`}
            onClick={(e)=>{handleC(e,ele)}}
           >
            <div className="flex justify-between">
            <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${ele.avatar_id}.svg`} 
            height="50px" width="50px" 
            alt="default"/>
              <h1 className="text-xl font-semibold">{ele.name}</h1>
            </div>
            <div className="flex gap-2">
            <p>{ele.number}</p>
              {ele.email==value?.user?.email&&<p className="underline font-light">YOU</p>}
            </div>
            {newMessage&&<p className="text-md font-semib">*newText...*</p>}
          </div>
        })}
    </div>
  )
}

export default Users