import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Template:FC<IPorps> = (props)=>{
    return (
        <>
           Template
        </>
    )
}
export default memo(Template)