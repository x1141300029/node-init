let test=  (flag)=>{
    return new Promise((resolve, reject) => {
        if(flag){
            resolve({code:1});
        }else{
            reject({code:-1})
        }
    })
}
async function t(){
    try {
        let s= await test(false);
        if(s){
            console.log(1)
            console.log(s)
        }
    }catch (e) {
        console.log('失败',e)
    }

}
t();
