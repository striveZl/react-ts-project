import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Reccommend:FC<IPorps> = (props)=>{
    return (
        <>
           Reccommend
        </>
    )
}
export default memo(Reccommend)