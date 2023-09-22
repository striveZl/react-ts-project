import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Artist:FC<IPorps> = (props)=>{
    return (
        <>
           Artist
        </>
    )
}
export default memo(Artist)