import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Mine:FC<IPorps> = (props)=>{
    return (
        <>
           我的页面
        </>
    )
}
export default memo(Mine)