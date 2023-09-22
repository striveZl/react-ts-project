import React ,{Suspense, memo}from "react"
import {FC,ReactNode} from "react"
import { Link, Outlet } from "react-router-dom"
import {Box, Tab, TabList, Tabs} from "@chakra-ui/react";
interface IPorps{
    children?:ReactNode
}

//泛型约束
const Discover:FC<IPorps> = (props)=>{
    return (
        <>
           <Box mt="2">
                <Tabs isManual variant='enclosed'>
                    <TabList >
                        <Link to="/discover/recommend"><Tab fontSize="12px">推荐</Tab></Link>
                        <Link to="/discover/ranking"><Tab fontSize="12px">排行榜</Tab></Link>
                        <Link to="/discover/songs"><Tab fontSize="12px">歌单</Tab></Link>
                        <Link to="/discover/djradio"><Tab fontSize="12px">主播电台</Tab></Link>
                        <Link to="/discover/artist"><Tab fontSize="12px">歌手</Tab></Link>
                        <Link to="/discover/album"><Tab fontSize="12px">新碟上架</Tab></Link>
                    </TabList>
                </Tabs>
            </Box>
            
           <Suspense fallback="loading...">
                <Outlet/>
           </Suspense>
           
        </>
    )
}
export default memo(Discover)