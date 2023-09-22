import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Focus:FC<IPorps> = (props)=>{
    return (
        <>
           我的Focus
        </>
    )
}
export default memo(Focus)