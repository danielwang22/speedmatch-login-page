$(`.login-signal .base-info-form .add-photo`).change(()=>{
    let dom =  $(`.login-signal .base-info-form .add-photo`)[0];
    updateUserPhoto(dom)
});

//update user photo
let userPhotoImage;
const updateUserPhoto = (item)=>{
    let files = item.files;
    if (files && files.length >= 1) {
        convertFile(files)
        .then(data => {
            userPhotoImage = data;
            $(`.login-signal .base-info-form .user-photo`)
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
let productContentList = document.querySelector('.product-content-mobile-list');
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

//progeam 的淡入與淡出
$(`.login-signal .buyer-btn`).click(function(){

    $(`.login-signal .buyer-btn`).css({
        'background-color':'#000',
        'color':"#fff"
    });
    $(`.login-signal .buyer`)
    .show()
    .addClass('fadIn');

    $(`.login-signal .seller-btn`).css({
        'background-color':'transparent',
        'color':"#000"
    });
    $(`.login-signal .seller`)
    .hide();
})
    
$(`.login-signal .seller-btn`).click(function(){
    $(`.login-signal .seller-btn`).css({
        'background-color':'#000',
        'color':"#fff"
    });
    $(`.login-signal .seller`)
    .show()
    .addClass('fadIn');
    
    $(`.login-signal .buyer-btn`).css({
        'background-color':'transparent',
        'color':"#000"
    });
    $(`.login-signal .buyer`)
    .hide();
})


//表單驗證

//基本資料
let newWindow = window.open("","_self");
const createInfoFormOptions = ()=>{
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
                    name: $(`.login-signal .base-info-form #name`).val(),
                    Nickname: $(`.login-signal .base-info-form #Nickname`).val(),
                    sex:$(`.login-signal .base-info-form input[name="radioSex"]:checked`).val(),
                    birthday: $(`.login-signal .base-info-form #birthday`).val(),
                    email: $(`.login-signal .base-info-form #email`).val(),
                    city: $(`.login-signal .base-info-form .input-city`).val(),
                    userPhoto: userPhotoImage,
                }

                localStorage.setItem('signInData', JSON.stringify(baseInfo));

                $.ajax({
                    url: 'https://shun.inspire-dt.com/baseInfo.php',
                    type: 'post',//可改 get 或 post
                    data:{
                        data: baseInfo
                    },
                    xhrFields:{
                        withCredentials:true
                    },
                    error: function(xhr) {
                        console.log('request 發生錯誤',xhr);
                    },
                    success: function(response) {
                        console.log('寫入成功');
                        console.log(response);
                        if(response == 'false'){
                            alert('表單錯誤')
                        }else{
                            setTimeout(
                                function(){
                                    window.location.href = "./setAccount.html";
                            }, 1000);
                        }
                    }
                });

            }
    }
    return baseInfoFormOptions;
}

const validatorBaseInfo = $(".login-signal .base-info-form").validate(createInfoFormOptions());




//電話帳號&驗證碼
//傳送驗證碼 desk
let verificationCode;
$(`.login-signal .set-account-form .getVerifyBtn`).click(()=>{

    let telAccount = $(`.login-signal .set-account-form #telAccount`).val();
    let object = JSON.parse(localStorage.getItem('signInData'))

    $.ajax({
        url: 'https://shun.inspire-dt.com/everyBodySample.php',
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

            $('.login-signal .set-account-form .countDown-text')
            .text('3分鐘後將會重新傳送代碼')
            .css('color','rgb(116,116,116)')
            
            countDownResend('set-account')
        }
    });
});
//倒數計時文字
let Interval = null;
const countDownResend = (container)=>{
        Interval = setInterval(()=>{
        verificationCode = null;

        $(`.login-signal .${container}-form .countDown-text`)
        .text('時間已到重新傳送代碼.....')
        .css('color','red')

        setTimeout(()=>{

            $(`.login-signal .${container}-form .countDown-text`)
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

const createAccountOptions = () => {
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

            let telAccount = $(`.login-signal .set-account-form #telAccount`).val();

            let object = JSON.parse(localStorage.getItem('signInData'))
            object.account = telAccount;
            localStorage.setItem('signInData', JSON.stringify(object));

            $.ajax({
                url: 'https://shun.inspire-dt.com/setAccount.php',
                type: 'post',//可改 get 或 post
                data:{
                    data: telAccount
                },
                xhrFields:{
                    withCredentials:true
                },
                error: function(xhr) {
                    console.log('發生錯誤');
                    console.log(xhr);
                },
                success: function(response) {
                    console.log('寫入成功');
                    console.log(response);
                    newWindow.location.href = "./setPassword.html"
                }
            });
        }
    }

    return setAccountOptions;
}
const validateSetAccount = $('.login-signal .set-account-form').validate(createAccountOptions())



//設定密碼
const createSetPasswordOptions = ()=>{
    const setPasswordOptions ={
            rules: { 
                password: { required: true , minlength: 3},
                comfirmPassword: { required: true , equalTo:`#password` , minlength: 3}
            },
            messages: {
                password: "請輸入密碼",
                comfirmPassword: "與密碼不同",
          },
            submitHandler:function(html){
                let password = $(`.login-signal .set-password-form input[type=password]`).val();

                let object = JSON.parse(localStorage.getItem('signInData'))

                object.password = password;

                localStorage.setItem('signInData', JSON.stringify(object));
                
                $.ajax({
                    url: 'https://shun.inspire-dt.com/MixAllResults.php',
                    type: 'post',//可改 get 或 post
                    data: {
                        data: password,
                    },
                    xhrFields:{
                        withCredentials:true
                    },
                    error: function(xhr) {
                        console.log('發生錯誤');
                        console.log(xhr)
                    },
                    success: function(response) {
                    console.log('寫入成功')
                    console.log(response)
                    
                    newWindow.location.href = "./signInSuccess.html"
                    }
                });
        }
    }
    return setPasswordOptions;
}
const validateSetPassword = $('.login-signal .set-password-form').validate(createSetPasswordOptions())


//註冊成功
if(window.location.pathname == '/speedmatch-login-page/signInSuccess.html'){

    $.ajax({
        url: 'https://shun.inspire-dt.com/signInSuccess.php',
        type: 'get',//可改 get 或 post
        error: function(xhr) {
        console.log('發生錯誤');
        console.log(xhr);
        },
        success: function(response) {
            console.log('成功')
            let res = JSON.parse(response)
            console.log(res)

            $(`.login-signal .signIn-success-form .user-photo`).css({
                'background-image': `url(${res.userPhoto})`,
                'background-position': `center center`,
                'background-size':`cover`,
                'height': `90px`,
                'width': `90px`,
            })
            $(`.login-signal .signIn-success-form .userAccount`).text(res.account)
        }
    });
}

//忘記密碼
//取得驗證碼
$(`.login-signal .forget-password-form .getVerifyBtn`).click(()=>{

    let telAccount = $(`.login-signal .forget-password-form #telAccount`).val();
    let object = JSON.parse(localStorage.getItem('signInData'))

    $.ajax({
        url: 'https://shun.inspire-dt.com/everyBodySample.php',
        type: 'get',//可改 get 或 post
        data: {
            account: telAccount, //前台客戶端輸入的手機號碼
            name : object.name
        },
        error: function(xhr) {
        console.log('發生錯誤');
        console.log(xhr);
        },
        success: function(response) {
            console.log('成功')
            let res = JSON.parse(response)
            console.log(res.verificationCode)
            verificationCode = res.verificationCode

            $('.login-signal .forget-password-form .countDown-text')
            .text('3分鐘後將會重新傳送代碼')
            .css('color','rgb(116,116,116)')
            
            countDownResend('forget-password')
        }
    });
})
//忘記密碼 - 驗證帳號(電話號碼)
const createForgetPasswordOptions = () => {
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
            newWindow.location.href = './setNewPassword.html'
        }
    }

    return ForgetPasswordOptions;
}
const validateforgetPassword = $('.login-signal .forget-password-form').validate(createForgetPasswordOptions())


//忘記密碼 - 設定新密碼
const createSetNewPasswordOptions = ()=>{
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
            newWindow.location.href = "./logIn.html"
        }
    }
    return setNewPasswordOptions;
}
const validateSetNewPassword = $('.login-signal .set-new-password-form').validate(createSetNewPasswordOptions())




























