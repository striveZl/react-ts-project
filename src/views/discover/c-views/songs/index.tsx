import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Songs:FC<IPorps> = (props)=>{
    return (
        <>
           Songs
        </>
    )
}
export default memo(Songs)