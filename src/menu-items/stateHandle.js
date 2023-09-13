import { useSelector } from "react-redux";

export const useUser=()=>{
    const role = useSelector((state) => state.role);
    const user = role === 'user'
    return user
}