window.onload = function () {
    createCode(5); //初始化验证码
    var oInput = document.getElementById('pwd');
    oInput.value = ''; //获取密码
    var submitBtn = document.getElementById("register");
    //以下实现必须接受协议才能提交的功能
    submitBtn.onclick = function () {
        if (!document.getElementById("checkbox").checked) {
            alert("请先接受协议哦");
            return false;
        }
    };
    var spans = document.getElementsByTagName('span');
    //密码强度的对比
    oInput.onkeyup = function () {
        //强度状态设为默认
        spans[0].className = spans[1].className = spans[2].className = "default";
        var pwd = this.value;
        var result = 0;
        for (var i = 0, len = pwd.length; i < len; ++i) {
            result |= charType(pwd.charCodeAt(i));
        }
        var level = 0;
        //对result进行四次循环，计算其level
        for (var i = 0; i <= 4; i++) {
            if (result & 1) {
                level++;
            }
            //右移一位
            result = result >>> 1;
        }

        if (pwd.length >= 6) {
            switch (level) {
                case 1:
                    spans[0].className = "weak";
                    break;
                case 2:
                    spans[0].className = "medium";
                    spans[1].className = "medium";
                    break;
                case 3:
                case 4:
                    spans[0].className = "strong";
                    spans[1].className = "strong";
                    spans[2].className = "strong";
                    break;
            }
        }
    }
}
/*
定义一个函数，对给定的数分为四类(判断密码类型)，返回十进制1，2，4，8
数字 0001 -->1  48~57
小写字母 0010 -->2  97~122
大写字母 0100 -->4  65~90
特殊 1000 --> 8 其它
*/

//生成验证码的方法
function createCode(length) {
    var code = "";
    var codeLength = parseInt(length); //验证码的长度
    var checkCode = document.getElementById("checkCode");
    //所有候选组成验证码的字符，当然也可以用中文的
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环组成验证码的字符串
    for (var i = 0; i < codeLength; i++) {
        //获取随机验证码下标
        var charNum = Math.floor(Math.random() * 62);
        //组合成指定字符验证码
        code += codeChars[charNum];
    }
    if (checkCode) {
        //为验证码区域添加样式名
        checkCode.className = "code";
        //将生成验证码赋值到显示区
        checkCode.innerHTML = code;
    }
}

//检查验证码是否正确
function validateCode() {
    //获取显示区生成的验证码
    var checkCode = document.getElementById("checkCode").innerHTML;
    //获取输入的验证码
    var inputCode = document.getElementById("inputCode").value;
    console.log(checkCode);
    console.log(inputCode);
    if (inputCode.length <= 0) {
        alert("请输入验证码！");
    } else if (inputCode.toUpperCase() != checkCode.toUpperCase()) {
        alert("验证码错误！");
        createCode(5);
    } else
        return true;
}

function charType(num) {
    if (num >= 48 && num <= 57) {
        return 1;
    }
    if (num >= 97 && num <= 122) {
        return 2;
    }
    if (num >= 65 && num <= 90) {
        return 4;
    }
    return 8;
}

//注册成功提示
// function success() {
//     alert('注册成功！');
// }

//此处是一个验证函数，必须满足密码大于六位且验证码不为空或者错误的条件，才能注册成功
function check_code() {
    var answer = document.getElementById("pwd").value;
    if (answer.length < 6) {
        alert("密码不能少于六位~");
        return false;
    } else if (!validateCode()) {
        return false;
    } else {
        // success();
        alert('注册成功！');

    }
}


