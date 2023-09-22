interface IFnCall<Iroot>{
    <Twhy>(fn:(num:Iroot)=>Twhy,age:number):Twhy
}

const foo:IFnCall<number> = function(fn,age){
    return fn(111)
}  

//不传入明确是的调用是的泛型，类型推荐
foo<string>(()=>{
    return '123'
},18)