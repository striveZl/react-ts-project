import React ,{Suspense, memo}from "react"
import {FC,ReactNode} from "react"
import { Link, Outlet } from "react-router-dom"
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Discover:FC<IPorps> = (props)=>{
    return (
        <>
           <div>
            <Link to="/discover/recommend">推荐</Link>&nbsp;&nbsp;
            <Link to="/discover/ranking">排行榜</Link>&nbsp;&nbsp;
            <Link to="/discover/songs">歌单</Link>&nbsp;&nbsp;
            <Link to="/discover/djradio">主播电台</Link>&nbsp;&nbsp;
            <Link to="/discover/artist">歌手</Link>&nbsp;&nbsp;
            <Link to="/discover/album">新碟上架</Link>&nbsp;&nbsp;
           </div>
           <Suspense fallback="loading...">
                <Outlet/>
           </Suspense>
           
        </>
    )
}
export default memo(Discover)