import { useContext } from "react";
import { context } from "../ContextP";
import { Link } from "react-router-dom";
import Parent from "./Parent";
const Home = () => {
  const value=useContext(context);
  
  return (
    <div className="mt-3 mx-5">
        {value&&value.user.number!=""?
        <Parent user={value.user}/>
        :
          <div className="text-center mt-[250px] md:mt-[30%]">
              <h1 className="font-semibold">
                Welcome to app please <Link to="/login" className="text-violet-700 underline font-bold">login/register</Link> first ..</h1>
              <h1 className="font-bold text-violet-700">ADiOS......</h1>
          </div>
        }
    </div>
  )
}

export default Home