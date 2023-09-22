import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Album:FC<IPorps> = (props)=>{
    return (
        <>
           Album
        </>
    )
}
export default memo(Album)