import React ,{memo}from "react"
import {FC,ReactNode} from "react"
interface IPorps{
    name:string,
    age:number,
    height?:number,
    children?:ReactNode
}

//泛型约束
const Download:FC<IPorps> = (props)=>{
    return (
        <>
            {props.children}
            <div>name:{props.name}</div>
            <div>age:{props.age}</div>
            <div>height:{props.height}</div>
        </>
    )
}

// Download.defaultProps = {
//     name:'strive',
    
// }
//直接对props进行类型约束
// const Download = (props:IPorps)=>{
//     return (
//         <>
//             <div>name:{props.name}</div>
//             <div>age:{props.age}</div>
//             <div>height:{props.height}</div>
//         </>
//     )
// }
export default memo(Download)