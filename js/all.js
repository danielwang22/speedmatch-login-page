//desktop and up Dom元素
let productContentList = document.querySelector('.product-content-list');
let userPhotoImage,baseInfo;

//function

//監聽
$(`.login-signal-desk .base-info-form .add-photo`).change(()=>{
    let dom =  $(`.login-signal-desk .base-info-form .add-photo`)[0];
    updateUserPhoto(dom,'desk')
});
$(`.login-signal-mobile .base-info-form .add-photo-mobile`).change(()=>{
    let dom =  $(`.login-signal-mobile .base-info-form .add-photo-mobile`)[0];
    updateUserPhoto(dom,'mobile')
});

//update user photo
const updateUserPhoto = (item,container)=>{
    let files = item.files;
    if (files && files.length >= 1) {
        convertFile(files)
        .then(data => {
            //console.log(data) // 把編碼後的字串輸出到console
            userPhotoImage = data;
            console.log(container)
            $(`.login-signal-${container} .base-info-form .user-photo`)
            .css({
                'background-image': `url(${data})`,
                'background-position': `center center`,
                'background-size':`cover`,
                'height': `90px`,
                'width': `90px`,
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
//progeam 的輪播
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
const createInfoFormOptions = (container)=>{
    const baseInfoFormOptions = {
            rules: { 
                userPhoto: { required: true },
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
                const baseInfo = {
                    name: $(`.login-signal-${container} .base-info-form #name`).val(),
                    Nickname: $(`.login-signal-${container} .base-info-form #Nickname`).val(),
                    sex:$(`.login-signal-${container} .base-info-form input[name="radioSex"]:checked`).val(),
                    birthday: $(`.login-signal-${container} .base-info-form #birthday`).val(),
                    email: $(`.login-signal-${container} .base-info-form #email`).val(),
                    city: $(`.login-signal-${container} .base-info-form .input-city`).val(),
                    userPhoto: userPhotoImage,
                }
                localStorage.setItem('signInData', JSON.stringify(baseInfo));
                window.open("./setAccount.html","_self");
                //location.href = "./setAccount.html"
            }
    }
    return baseInfoFormOptions;
}

const validatorBaseInfoDesktop = $(".login-signal-desk .base-info-form").validate(createInfoFormOptions('desk'));
const validatorBaseInfoMobile = $(".login-signal-mobile .base-info-form").validate(createInfoFormOptions('mobile'));

//電話帳號&驗證碼
//傳送驗證碼 desk
let verificationCode;
$(`.login-signal-desk .set-account-form .getVerifyBtn`).click(()=>{

    let telAccount = $(`.login-signal-desk .set-account-form #telAccount`).val();
    let object = JSON.parse(localStorage.getItem('signInData'))

    $.ajax({
        url: 'https://shun.inspire-dt.com/everyBodySample.php', // Apache 開的 網域
        type: 'get',//可改 get 或 post
        data: {
            account: telAccount, //前台客戶端輸入的手機號碼
            name : object.name
        },
        error: function(xhr) {
        console.log('request 發生錯誤',xhr);
        },
        success: function(response) {
            console.log('成功')
            let res = JSON.parse(response)
            console.log(res.verificationCode)
            verificationCode = res.verificationCode
            countDownResend()
        }
    });
})
//傳送驗證碼 mobile
$(`.login-signal-mobile .set-account-form .getVerifyBtn`).click(()=>{

    let telAccount = $(`.login-signal-mobile .set-account-form #telAccount`).val();
    let object = JSON.parse(localStorage.getItem('signInData'))

    $.ajax({
        url: 'https://shun.inspire-dt.com/everyBodySample.php', // Apache 開的 網域
        type: 'get',//可改 get 或 post
        data: {
            account: telAccount, //前台客戶端輸入的手機號碼
            name : object.name
        },
        error: function(xhr) {
        console.log('request 發生錯誤',xhr);
        },
        success: function(response) {
            console.log('成功')
            let res = JSON.parse(response)
            console.log(res.verificationCode)
            verificationCode = res.verificationCode
            countDownResend()
        }
    });
})
let Interval = null;
const countDownResend = ()=>{
        Interval = setInterval(()=>{
        verificationCode = null;

        $('.login-signal-desk .set-account-form .countDown-text')
        .text('時間已到重新傳送代碼.....')
        .css('color','red')

        $('.login-signal-mobile .set-account-form .countDown-text')
        .text('時間已到重新傳送代碼.....')
        .css('color','red')

        setTimeout(()=>{

            $('.login-signal-desk .set-account-form .countDown-text')
            .text('3分鐘後將會重新傳送代碼')
            .css('color','rgb(116,116,116)')

            $('.login-signal-mobile .set-account-form .countDown-text')
            .text('3分鐘後將會重新傳送代碼')
            .css('color','rgb(116,116,116)')

        },20000)
    },180000)
}
//電話號碼驗證
jQuery.validator.addMethod('phone',function(value,element){
    var tel = /^09|9\d{8}$/;
    return this.optional(element) || (tel.test(value));
},"電話號碼格式錯誤!")
//驗證碼驗證
jQuery.validator.addMethod("EqualTverificationCode", function(value, element, param) {
    return this.optional(element) || value == verificationCode;
  }, "請確認你的驗證碼是否正確");
const createAccountOptions = function(container){
    const setAccountOptions = {
        rules:{
            telAccount: { required:true, phone:true , minlength:10 },
            verifyCode: { required:true , EqualTverificationCode:true, minlength:6}
        },
        messages:{
            telAccount:"請輸入正確的電話號碼"
        },
        submitHandler:function(html){
            clearInterval(Interval);
            let telAccount = $(`.login-signal-${container} .set-account-form #telAccount`).val();

            let object = JSON.parse(localStorage.getItem('signInData'))

            object.account = telAccount;

            localStorage.setItem('signInData', JSON.stringify(object));
            window.open("./setPassword.html","_self");
            location.href = "./setPassword.html"
        }
    }

    return setAccountOptions;
}
const validateSetAccountDesktop = $('.login-signal-desk .set-account-form').validate(createAccountOptions('desk'))
const validateSetAccountMobile = $('.login-signal-mobile .set-account-form').validate(createAccountOptions('mobile'))
//設定密碼
const createSetPasswordOptions = (container)=>{
    const setPasswordOptions ={
            rules: { 
                password: { required: true , minlength: 3},
                comfirmPassword: { required: true , equalTo:`#password-${container}` , minlength: 3}
            },
            messages: {
                password: "請輸入密碼",
                comfirmPassword: "與密碼不同",
          },
            submitHandler:function(html){
                let password = $(`.login-signal-${container} .set-password-form input[type=password]`).val();

                let object = JSON.parse(localStorage.getItem('signInData'))

                object.password = password;

                localStorage.setItem('signInData', JSON.stringify(object));
                location.href = "./signInSuccess.html"
                $.ajax({
                    url: 'https://shun.inspire-dt.com/signInData.php', // Apache 開的 網域
                    type: 'post',//可改 get 或 post
                    data: {
                        signInData: object,
                    },
                    error: function(xhr) {
                        console.log('request 發生錯誤',xhr);
                    },
                    success: function(response) {
                    console.log('寫入成功',response)
                    }
                });
        }
    }
    return setPasswordOptions;
}

const validateSetPasswordDesktop = $('.login-signal-desk .set-password-form').validate(createSetPasswordOptions('desk'))
const validateSetPasswordMobile = $('.login-signal-mobile .set-password-form').validate(createSetPasswordOptions('mobile'))
//註冊成功
if(window.location.pathname == '/speedmatch-login-page/signInSuccess.html'){
    let object = JSON.parse(localStorage.getItem('signInData'))
    $(`.login-signal-desk .signIn-success-form .user-photo`).css({
        'background-image': `url(${object.userPhoto})`,
        'background-position': `center center`,
        'background-size':`cover`,
        'height': `90px`,
        'width': `90px`,
    })
    $(`.login-signal-desk .signIn-success-form .userAccount`).text(object.account)

    $(`.login-signal-mobile .signIn-success-form .user-photo`).css({
        'background-image': `url(${object.userPhoto})`,
        'background-position': `center center`,
        'background-size':`cover`,
        'height': `90px`,
        'width': `90px`,
    })
    $(`.login-signal-mobile .signIn-success-form .userAccount`).text(object.account)
}

//忘記密碼
//傳送驗證碼 mobile
$(`.login-signal-desk .forget-password-form .getVerifyBtn`).click(()=>{

    let telAccount = $(`.login-signal-desk .forget-password-form #telAccount`).val();
    let object = JSON.parse(localStorage.getItem('signInData'))

    $.ajax({
        url: 'https://127.0.0.4/everyBodySample.php', // Apache 開的 網域
        type: 'get',//可改 get 或 post
        data: {
            account: telAccount, //前台客戶端輸入的手機號碼
            name : object.name
        },
        error: function(xhr) {
        console.log('request 發生錯誤',xhr);
        },
        success: function(response) {
            console.log('成功')
            let res = JSON.parse(response)
            console.log(res.verificationCode)
            verificationCode = res.verificationCode
            countDownResend()
        }
    });
})
//傳送驗證碼 mobile
$(`.login-signal-mobile .forget-password-form .getVerifyBtn`).click(()=>{

    let telAccount = $(`.login-signal-mobile .forget-password-form #telAccount`).val();
    let object = JSON.parse(localStorage.getItem('signInData'))

    $.ajax({
        url: 'https://127.0.0.4/everyBodySample.php', // Apache 開的 網域
        type: 'get',//可改 get 或 post
        data: {
            account: telAccount, //前台客戶端輸入的手機號碼
            name : object.name
        },
        error: function(xhr) {
        console.log('request 發生錯誤',xhr);
        },
        success: function(response) {
            console.log('成功')
            let res = JSON.parse(response)
            console.log(res.verificationCode)
            verificationCode = res.verificationCode
            countDownResend()
        }
    });
})
//忘記密碼 - 驗證帳號(電話號碼)
const createForgetPasswordOptions = function(container){
    const ForgetPasswordOptions = {
        rules:{
            telAccount: { required:true, phone:true , minlength:10 },
            verifyCode: { required:true , EqualTverificationCode:true, minlength:6}
        },
        messages:{
            telAccount:"請輸入正確的電話號碼"
        },
        submitHandler:function(html){
            clearInterval(Interval);
            location.href = './setNewPassword.html'
        }
    }

    return ForgetPasswordOptions;
}
const validateforgetPasswordDesktop = $('.login-signal-desk .forget-password-form').validate(createForgetPasswordOptions('desk'))
const validateforgetPasswordMobile = $('.login-signal-mobile .forget-password-form').validate(createForgetPasswordOptions('mobile'))
//忘記密碼 - 設定新密碼
const createSetNewPasswordOptions = (container)=>{
    const setNewPasswordOptions ={
            rules: { 
                password: { required: true , minlength: 3},
                comfirmPassword: { required: true , equalTo:"#password" , minlength: 3}
            },
            messages: {
                password: "請輸入密碼",
                comfirmPassword: "與密碼不同",
          },
        submitHandler:function(html){
            location.href = "./logIn.html"
        }
    }
    return setNewPasswordOptions;
}
const validateSetNewPasswordDesktop = $('.login-signal-desk .set-new-password-form').validate(createSetNewPasswordOptions('desk'))
const validateSetNewPasswordMobile = $('.login-signal-mobile .set-new-password-form').validate(createSetNewPasswordOptions('mobile'))




























