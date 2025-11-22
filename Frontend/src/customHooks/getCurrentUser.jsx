import axios from "axios"
import { useEffect } from "react"
import { dbUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"

const useGetCurrentUser=()=>{
    const dispatch=useDispatch()
    // let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser= async ()=>{
          try {
            const result=await axios.get(`${dbUrl}/api/current`,{
                withCredentials:true
            })
            dispatch(setUserData(result.data))
          } catch (error) {
            console.log(error);
            
          }
        };
        fetchUser()
    },[])
}
export default  useGetCurrentUser;