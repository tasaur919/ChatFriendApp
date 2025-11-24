import axios from "axios"
import { useEffect } from "react"
import { dbUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"

const getOtherUsersData=()=>{
    const dispatch=useDispatch()
    let {otherUsers}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser= async ()=>{
          try {
            const result=await axios.get(`${dbUrl}/api/others`,{
                withCredentials:true
            })
            dispatch(setOtherUsers(result.data))
          } catch (error) {
            console.log(error);
            
          }
        };
        fetchUser()
    },[otherUsers])
}
export default  getOtherUsersData;