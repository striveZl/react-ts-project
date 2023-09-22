import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Djradio:FC<IPorps> = (props)=>{
    return (
        <>
           Djradio
        </>
    )
}
export default memo(Djradio)