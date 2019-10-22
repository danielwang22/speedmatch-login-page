class signIn{
    constructor(){

    }
}
//Dom元素
let baseInfoForm = document.querySelector('.base-info-form');
let baseInfoFormName = document.querySelector('.base-info-form #name');
let baseInfoFormSexAndBirthday = document.querySelector('.base-info-form #sexAndBirthday');
let baseInfoFormEmail = document.querySelector('.base-info-form #email');
let baseInfoFormcity = document.querySelector('.base-info-form #city');
let addPhoto = document.querySelectorAll('.add-photo');
let userPhoto = document.querySelectorAll('.user-photo');
let productContentList = document.querySelector('.product-content-list');
let buyerBtn = document.querySelectorAll('.buyer-btn');
let sellerBtn = document.querySelectorAll('.seller-btn');
let buyer = document.querySelectorAll('.buyer');
let seller = document.querySelectorAll('.seller');

//function
//update user photo
const updateUserPhoto = (item)=>{
    let files = item.files;
    if (files && files.length >= 1) {
        convertFile(files)
        .then(data => {
            console.log(data) // 把編碼後的字串輸出到console
            userPhoto.forEach(item=>{
                item.setAttribute('style',`
                background-image: url(${data});
                background-position: center center;
                background-size:cover;
                height: 90px;
                width: 90px;
                `)
            })
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
//product-content 的輪播
let offsetX = productContentList.style.left;
setInterval(()=>{
    if(window.outerWidth <= 768){
        offsetX += window.outerWidth;
        if(offsetX >= (window.outerWidth * 3)) offsetX = 0;
        productContentList.setAttribute('style',`left:-${offsetX}px !important`)
    }
},5000)

//form vaildate function
const validateBaseInfo = ()=>{
    let validate = false;
    //真實姓名
    let name = document.forms["base-info-desktop"]["name"];
    if(name.value == ''){

        let last_errorlist = document.getElementById('error-name');
        if(last_errorlist){
            baseInfoFormName.removeChild(last_errorlist)
        }

        let errorList = document.createElement('ui');
        let error = document.createElement('li');

        errorList.setAttribute('id','error-name')

        error.textContent = '請輸入您的真實姓名'
        error.setAttribute('style','color:red;')

        errorList.appendChild(error);
        baseInfoFormName.appendChild(errorList);

        validate = false;
    }else{
        let errorList = document.getElementById('error-name')
        if(errorList){
            baseInfoFormName.removeChild(errorList)
        }
        validate = true;
    }
    //暱稱
    let Nickname = document.forms["base-info-desktop"]["Nickname"];
    if(Nickname.value == ''){
        let last_errorlist = document.getElementById('error-Nickname');
        if(last_errorlist){
            baseInfoFormName.removeChild(last_errorlist)
        }

        let errorList = document.createElement('ui');
        let error = document.createElement('li');

        errorList.setAttribute('id','error-Nickname')

        error.textContent = '請輸入您的暱稱'
        error.setAttribute('style','color:red;')

        errorList.appendChild(error);
        baseInfoFormName.appendChild(errorList);

        validate = false
    }else{
        let errorList = document.getElementById('error-Nickname')
        if(errorList){
            baseInfoFormName.removeChild(errorList)
        }
        validate = true;
    }
    //性別
    let sex_chosen = "";
    let sex = document.forms['base-info-desktop']['radio-sex'];
    for(let i=0;i<sex.length;i++){
        if(sex[i].checked == true){
            sex_chosen = sex[i].id;
        }
    }

    if(sex_chosen == ""){
        let last_errorlist = document.getElementById('error-sex');
        if(last_errorlist){
            baseInfoFormName.removeChild(last_errorlist)
        }

        let errorList = document.createElement('ui');
        let error = document.createElement('li');

        errorList.setAttribute('id','error-sex')

        error.textContent = '請選擇性別'
        error.setAttribute('style','color:red;')

        errorList.appendChild(error);
        baseInfoFormName.appendChild(errorList);

        validate = false
    }
    //出生年月日
    let birthday = document.forms['base-info-desktop']['birthday'];
    if(birthday.value == ''){
        let last_errorlist = document.getElementById('error-birthday');
        if(last_errorlist){
            baseInfoFormName.removeChild(last_errorlist)
        }

        let errorList = document.createElement('ui');
        let error = document.createElement('li');

        errorList.setAttribute('id','error-birthday')

        error.textContent = '請輸入您的出生年月日'
        error.setAttribute('style','color:red;')

        errorList.appendChild(error);
        baseInfoFormSexAndBirthday.appendChild(errorList);

        validate = false
    }else{
        let errorList = document.getElementById('error-birthday')
        if(errorList){
            baseInfoFormSexAndBirthday.removeChild(errorList)
        }
        validate = true;
    }

    //email
    let email = document.forms['base-info-desktop']['email'];
    if(email.value == ''){
        let last_errorlist = document.getElementById('error-email');
        if(last_errorlist){
            baseInfoFormName.removeChild(last_errorlist)
        }

        let errorList = document.createElement('ui');
        let error = document.createElement('li');

        errorList.setAttribute('id','error-email')

        error.textContent = '請輸入您的email'
        error.setAttribute('style','color:red;')

        errorList.appendChild(error);
        baseInfoFormEmail.appendChild(errorList);

        validate = false
    }else{
        let errorList = document.getElementById('error-email')
        if(errorList){
            baseInfoFormEmail.removeChild(errorList)
        }
        validate = true;
    }

    //居住地
    let city = document.forms['base-info-desktop']['city'];
    if(city.value == ''){
        let last_errorlist = document.getElementById('error-city');
        if(last_errorlist){
            baseInfoFormcity.removeChild(last_errorlist)
        }

        let errorList = document.createElement('ui');
        let error = document.createElement('li');

        errorList.setAttribute('id','error-city')

        error.textContent = '請選擇您的居住地'
        error.setAttribute('style','color:red;')

        errorList.appendChild(error);
        baseInfoFormcity.appendChild(errorList);

        validate = false
    }else{
        let errorList = document.getElementById('error-city')
        if(errorList){
            baseInfoFormcity.removeChild(errorList)
        }
        validate = true;
    }

    if(validate){
        window.location.href = "./setAccount.html"
    }
    return validate;
}

//監聽
addPhoto.forEach(item=>{
    item.addEventListener('change',()=>{
        updateUserPhoto(item)
    },false);
})

buyerBtn.forEach(item=>{
    item.addEventListener('click',()=>{
        item.style.backgroundColor = '#000';
        item.style.color = '#fff';
        sellerBtn.forEach(el=>{
            el.style.backgroundColor = 'transparent';
            el.style.color = '#000';
        })

        buyer.forEach(el=>{
            el.style.display = 'block'
            el.classList.add('fadIn')
        })
        seller.forEach(el=>{
            el.style.display = 'none'
        })
    },false)
})

sellerBtn.forEach(item=>{
    item.addEventListener('click',()=>{
        item.style.backgroundColor = '#000';
        item.style.color = '#fff';
        buyerBtn.forEach(el=>{
            el.style.backgroundColor = 'transparent';
            el.style.color = '#000';
        })

        buyer.forEach(el=>{
            el.style.display = 'none'
        })
        seller.forEach(el=>{
            el.style.display = 'block'
            el.classList.add('fadIn')
        })
    },false)

})


