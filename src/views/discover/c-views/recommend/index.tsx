import React ,{memo, useEffect, useState}from "react"
import {FC,ReactNode} from "react"
import hyRequest from '@/service'
interface IPorps{
    children?:ReactNode
}

interface BannerRoot {
    imageUrl: string
    targetId: number
    adid: any
    targetType: number
    titleColor: string
    typeTitle: string
    url: any
    exclusive: boolean
    encodeId: string
    scm: string
    bannerBizType: string
  }
  

//泛型约束
const Reccommend:FC<IPorps> = (props)=>{
    const [bannerLists,setBannerLists] = useState<any[]>([])
    useEffect(()=>{
        const banner =async()=>{
            const bannerList = await hyRequest.get({url:'/banner'})
            console.log(bannerList)
            if(bannerList.code ==200){
                setBannerLists(bannerList.banners)
                console.log(bannerList.banners)
            }
       
        }
        banner()
    },[])
   
    
    return (
        <>
           Reccommend
           {bannerLists&&<div>
            {bannerLists.map((item,index)=>{
                return <p key={index}>{item.typeTitle}<br/></p>
            })}
            </div>}
        </>
    )
}
export default memo(Reccommend)