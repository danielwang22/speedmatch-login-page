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