
//JS phần đăng ký và đăng nhập

//Ham validator
function Validator(options){

    //Hàm thực hiện validate
    function validate(inputElement, rule){
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                
        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    //Lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    if(formElement){
        options.rules.forEach(function (rule) {
            var inputElement=formElement.querySelector(rule.selector);
            
            if(inputElement){
                //Xử lý trường hợp blur vào input
                inputElement.onblur=function(){
                    validate(inputElement, rule);
                }

                //Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')  
                }
            }
        });
    }
}

//Dinh nghia cac rule
//Nguyên tắc của các rules:
//1. Khi có lỗi => trả ra thông báo lỗi
//2. Khi không có lỗi => không trả ra thông báo lỗi(undefined)

//Dành cho email
Validator.isEmail = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
}

//Dành cho tài khoản: nhưng form hiện tại form đăng ký đăng nhập này không dùng đến tài khoản
Validator.isRequired = function (selector, message){
    return{
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
}

//Dành cho mật khẩu
Validator.minLength = function(selector, min , message){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : message || `Vui lòng nhập mật khẩu tối thiểu ${min} ký tự`;
        }
    };
}

//Dành cho nhập lại mật khẩu
Validator.isConfirmed = function (selector, getCofirmValue, message){
    return{
        selector: selector,
        test: function (value){
            return value === getCofirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}