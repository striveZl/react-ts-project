import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Download:FC<IPorps> = (props)=>{
    return (
        <>
            Download
        </>
    )
}
export default memo(Download)