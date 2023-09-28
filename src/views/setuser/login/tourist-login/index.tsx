import { Button } from "@chakra-ui/react"
import React ,{memo}from "react"
import {FC,ReactNode} from "react"
import { touristLoginOne } from "../../service"
import { useAppDispatch } from "@/store"
import { fetchTouristLoginAction } from "../../store"
interface IPorps{
    children?:ReactNode
}
//泛型约束
const TouristLogin:FC<IPorps> = (props)=>{
    const dispatch = useAppDispatch()
    const tourisLogin = async()=>{
        dispatch(fetchTouristLoginAction())
    }
    return (
        <>
        <Button onClick={tourisLogin}>一键游客登陆</Button>
        </>
    )
}
export default memo(TouristLogin)