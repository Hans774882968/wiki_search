var caculator = document.querySelector("#caculator");
var n1 = document.querySelector("#num1");
var n2 = document.querySelector("#num2");

var sign = document.querySelector('#sign');
var output = document.querySelector('#output');

var num1;
var num2;
var finallyArr;


function isNum(num){
    if(!num || num.length < 1 ) return false;
    let s = num.replace(/[0-9]*/g, "" );
    if( s == "" ) return true;
    else return false;
}

function add(){
    sign.innerHTML = '+';
    if ( isNum( n1.value ) == false || isNum( n2.value ) == false){
        alert("请输入两个正整数");
        return;
    }
    let s1 = n1.value; s1 = s1.split(""); 
    let s2 = n2.value; s2 = s2.split(""); 
    let flag = 0; let ans = [];
    let i=s1.length,j=s2.length;
    while(true){
        if(flag == 0 && i <= 0 && j <= 0 ) break;
        num1 = i > 0 ? parseInt(s1.pop()) : 0;
        num2 = j > 0 ? parseInt(s2.pop()) : 0;
        i--;j--;
        //console.log(num1);console.log(num2);console.log(flag);
        let sum = num1 + num2 + flag ;
        flag = 0;
        if( sum > 9 ){
            sum -= 10;
            flag = 1;
        }
        ans.unshift(sum);
        
    }
    let result = ans.join("");
    output.innerHTML = result; 
}
function subtract(){
    sign.innerHTML = '-';
    if ( isNum( n1.value ) == false || isNum( n2.value ) == false){
        alert("请输入两个正整数");
        return;
    }
    let s1 = n1.value;  
    let s2 = n2.value; 
    let f = false; 
    if( s1.length < s2.length ){//位数多的减去位数少的
        let c = s1;
        s1 = s2;
        s2 = c;
        f = true;
    }
    s1 = s1.split("");
    s2 = s2.split("");
    let flag = 0; let ans = [];
    let i=s1.length,j=s2.length;
    while(true){
        if( i <= 0 && j <= 0 ) break;
        num1 = i > 0 ? parseInt(s1.pop()) : 0;
        num2 = j > 0 ? parseInt(s2.pop()) : 0;
        i--;j--;
        //console.log(num1);console.log(num2);console.log(flag);
        let sum = num1 - num2 + flag ;
        flag = 0;
        if( sum < 0 ){
            sum += 10;
            flag = -1;
        }
        ans.unshift(sum);  
    }
    if( flag == -1 ){ //位数相同 小的减了大的
        f = true;
        ans = []; flag = 0;
        let s1 = n2.value;
        let s2 = n1.value;
        s1 = s1.split("");
        s2 = s2.split("");
        i=s1.length,j=s2.length;
        while(true){
            if( i <= 0 && j <= 0 ) break;
            num1 = i > 0 ? parseInt(s1.pop()) : 0;
            num2 = j > 0 ? parseInt(s2.pop()) : 0;
            i--;j--;
            let sum = num1 - num2 + flag ;
            flag = 0;
            if( sum < 0 ){
                sum += 10;
                flag = -1;
            }
            ans.unshift(sum);  
        }

    }
    let result = ans.join("");
    if( f ) result = '-' + result;
    output.innerHTML = result; 
}