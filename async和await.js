/**
 * 试验async和await以及Promise.all的用法
 * @return {[type]} [description]
 */
async function fa(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(1)
        },2000)
    })
}

async function fb(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(2)
        },2000)
    })
}


async function add(){
    //请求异步执行，执行完的结果则同步执行
    const a = fa()
    const b = fb()
    await a.then((res)=>console.log(res))
    await b.then((res)=>console.log(res))
}

async function add3(){
    //请求异步执行，执行完的结果则同步执行，使用Promise.all 执行
    //本质上 async 和 await 是 Promise的语法糖
    const a = fa()
    const b = fb()
    Promise.all([a,b]).then(res=>{
        let [res1,res2] = res
        console.log(res1,res2)
    })
}

async function add2(){
     //请求同步执行，执行完的结果也同步执行
    await fa().then((res)=>console.log(res))
    await fb().then((res)=>console.log(res))
}


add()
add3()
add2()