import axios from "../../../utils/request"
export const registeAC  = (data)=>{
    console.log("发起请求了！")
    return dispatch=>{
        return axios.post("http://localhost:3000/api/register",data)
    }
}
