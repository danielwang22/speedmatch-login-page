//desktop and up Dom元素
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
        console.log(`${-window.outerWidth*3}px`)
        if(productContentList.style.left == `0px`){
            $(".step1 div").css('background-color',"black")
            $(".step2 div").css('background-color',"#f8f8f9")
            $(".step3 div").css('background-color',"#f8f8f9")
        }
        else if(productContentList.style.left == `${-window.outerWidth}px`){
            $(".step1 div").css('background-color',"#f8f8f9")
            $(".step2 div").css('background-color',"black")
            $(".step3 div").css('background-color',"#f8f8f9")
        }
        else if(productContentList.style.left == `${-window.outerWidth*2}px`){
            $(".step1 div").css('background-color',"#f8f8f9")
            $(".step2 div").css('background-color',"#f8f8f9")
            $(".step3 div").css('background-color',"black")
        }
    }
},5000)

//監聽
addPhoto.forEach(item=>{
    item.addEventListener('change',()=>{
        updateUserPhoto(item)
    },false);
})

const progeamAnimation = (container) =>{
    $(`.login-signal-${container} .buyer-btn`).click(function(){
        console.log('QQQQ')
        $(`.login-signal-${container} .buyer-btn`).css({
            'background-color':'#000',
            'color':"#fff"
        });
        $(`.login-signal-${container} .seller-btn`).css({
            'background-color':'transparent',
            'color':"#000"
        });
        $(`.login-signal-${container} .buyer`)
        .show()
        .addClass('fadIn');
        $(`.login-signal-${container} .seller`)
        .hide();
    })
    
    $(`.login-signal-${container} .seller-btn`).click(function(){
        $(`.login-signal-${container} .seller-btn`).css({
            'background-color':'#000',
            'color':"#fff"
        });
        $(`.login-signal-${container} .buyer-btn`).css({
            'background-color':'transparent',
            'color':"#000"
        });
        $(`.login-signal-${container} .seller`)
        .show()
        .addClass('fadIn');
        $(`.login-signal-${container} .buyer`)
        .hide();
    })
}

progeamAnimation('desk')
progeamAnimation('mobile')

//表單驗證
//基本資料
const baseInfoFormOptions ={
        rules: { 
            userPhoto: { required: true ,extension : "png|jpe?g|gif"},
            name: { required: true },
            Nickname: { required: true },
            radioSex: { required:true },
            birthday: { required: true },
            email: { required: true , email: true},
            city: { required: true },
        },
        messages: {
            userPhoto: "請上傳您的大頭貼",
            name: "請輸入您的真實姓名",
            Nickname: "請輸入您的暱稱",
            radioSex : "請選擇性別",
            birthday: "請輸入您的出生年月日",
            email: "請輸入正確的email",
            city: "請選擇您的居住地"
      },
        submitHandler:function(form){
            
            window.location = "./setAccount.html"
        }
}
const validatorBaseInfoDesktop = $(".login-signal-desk .base-info-form").validate(baseInfoFormOptions);
const validatorBaseInfoMobile = $(".login-signal-mobile .base-info-form").validate(baseInfoFormOptions);

//電話帳號&驗證碼
jQuery.validator.addMethod('phone',function(value,element){
    var tel = /^09|9\d{8}$/;
    return this.optional(element) || (tel.test(value));
},"電話號碼格式錯誤!")
const setAccountOptions = {
    rules:{
        telAccount: { required:true, phone:true , maxlength:10 , minlength:9}
    },
    messages:{
        telAccount:"請輸入正確的電話號碼"
    },
    submitHandler:function(html){
        //處理電話號碼為 +8869 ~~~~~~
        let telAccount = $('.login-signal-desk .set-account-form #telAccount').val();
        let theTelWillBeSent;
        if(telAccount.length == 10){
            theTelWillBeSent = '+886' + telAccount.substring(1);
        }else{
            theTelWillBeSent = '+886' + telAccount;
        }

        $.ajax({
            url: 'http://127.0.0.4/index.php', // Apache 開的 網域
            type: 'POST',//可改 get 或 post
            data: {
                account: theTelWillBeSent, //前台客戶端輸入的手機號碼
            },
            error: function(xhr) {
            console.log('request 發生錯誤',xhr);
            },
            success: function(response) {
                console.log('成功',response)
            }
        });
    }
}
const validateSetAccountDesktop = $('.login-signal-desk .set-account-form').validate(setAccountOptions)
const validateSetAccountMobile = $('.login-signal-mobile .set-account-form').validate(setAccountOptions)
//忘記密碼 - 驗證帳號(電話號碼)
const forgetPasswordOptions = {
    rules:{
        telAccount: { required:true, phone:true , maxlength:10 , minlength:9}
    },
    messages:{
        telAccount:"請輸入正確的電話號碼"
    }
}
const validateforgetPasswordDesktop = $('.login-signal-desk .forget-password-form').validate(forgetPasswordOptions)
const validateforgetPasswordMobile = $('.login-signal-mobile .forget-password-form').validate(forgetPasswordOptions)
//取得驗證碼

//設定密碼
const setPasswordOptions ={
        rules: { 
            password: { required: true , minlength: 3},
            comfirmPassword: { required: true , equalTo:"#password" , minlength: 3}
        },
        messages: {
            password: "請輸入密碼",
            comfirmPassword: "與密碼不同",
      },
    submitHandler:function(html){
        window.location = "./signInSuccess.html"
    }
}
const validateSetPasswordDesktop = $('.login-signal-desk .set-password-form').validate(setPasswordOptions)
const validateSetPasswordMobile = $('.login-signal-mobile .set-password-form').validate(setPasswordOptions)
//忘記密碼 - 設定新密碼
const setNewPasswordOptions ={
        rules: { 
            password: { required: true },
            comfirmPassword: { required: true }
        },
        messages: {
            password: "請輸入密碼",
            comfirmPassword: "請輸入密碼",
      },
        submitHandler:function(form){
            window.location = "./logIn.html"
        }
}
const validateSetNewPasswordDesktop = $('.login-signal-desk .set-new-password-form').validate(setNewPasswordOptions)
const validateSetNewPasswordMobile = $('.login-signal-mobile .set-new-password-form').validate(setNewPasswordOptions)


























