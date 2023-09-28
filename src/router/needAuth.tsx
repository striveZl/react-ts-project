import { useAppSelector } from "@/store"
import React ,{memo}from "react"
import {FC,ReactNode} from "react"
import {Navigate, useLocation} from "react-router-dom";
interface IPorps{
    children?:ReactNode
}

//泛型约束
const NeedAuth:FC<IPorps> = (props)=>{
    const {touristToken} = useAppSelector((state)=>({
        touristToken:state.setuser.touristToken
    }))
    return (
        <>
           {touristToken?<Navigate to="/discover/recommend"/>:props.children}
        </>
    )
}
export default memo(NeedAuth)