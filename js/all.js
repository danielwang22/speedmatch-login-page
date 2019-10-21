class signIn{
    constructor(){

    }
}
//Dom元素
let addPhoto = document.querySelector('.add-photo');
let userPhoto = document.querySelector('.user-photo');
let productContentList = document.querySelector('.product-content-list');

//function
//update user photo
const updateUserPhoto = ()=>{
    let files = addPhoto.files;
    if (files && files.length >= 1) {
        convertFile(files)
        .then(data => {
            console.log(data) // 把編碼後的字串輸出到console
            userPhoto.setAttribute('style',`
            background-image: url(${data});
            background-position: center center;
            background-size:cover;
            height: 90px;
            width: 90px;
            `)
        })
        .catch(err => console.log(err))
    }   
}
//image to base64
const convertFile = (files)=> {
    return new Promise((resolve,reject)=>{
        // 建立FileReader物件
        let reader = new FileReader()
        // 註冊onload事件，取得result則resolve (會是一個Base64字串)
        reader.onloadend = () => { resolve(reader.result) }
        // 註冊onerror事件，若發生error則reject
        reader.onerror = () => { reject(reader.error) }
        // 讀取檔案
        reader.readAsDataURL(files[0])
    })
}

let offsetX = productContentList.style.left;
setInterval(()=>{
    if(window.outerWidth <= 768){
        offsetX += window.outerWidth;
        if(offsetX >= (window.outerWidth * 3)) offsetX = 0;
        productContentList.setAttribute('style',`left:-${offsetX}px !important`)
    }
},5000)

//監聽
addPhoto.addEventListener('change',updateUserPhoto,false);

