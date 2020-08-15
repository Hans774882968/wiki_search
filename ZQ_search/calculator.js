"use strict";

//生成计算器的按钮
(() => {
    let btns = document.getElementById("buttons");
    let chars = "()%C789/456*123-0.=+";
    for(let ch of chars){
        let btn = document.createElement("div");
        btn.className = "0123456789.".indexOf(ch) != -1 ? "digit-button" : "other-button";
        btn.innerText = ch;
        btn.dataset.value = ch;
        btns.appendChild(btn);
    }
})();

//使用$(".out > .op").text()来判定是否已经按下运算符键。记得在初始化时清空。
//isNaN(num1)判定是否已经是算出结果状态。为了简便，规定算出结果状态下必须清空计算器。
//箭头函数中this是指向外层函数作用域。改成function(){}即可用$(this)获取当前元素
$(".digit-button").click(function(){
    let num1 = $(".num1").text(),num2 = $(".num2").text(),digit = $(this).data("value");
    if(isNaN(num1) || isNaN(num2)){
        initCalculator();
    }
    if($(".out > .op").text().length == 0){
        let num1 = $(".num1").text();
        if(num1 === "0" && digit != ".") num1 = "";
        $(".inp > .num1").text(num1 + digit);
    }
    else{
        let num2 = $(".num2").text();
        if(num2 === "0" && digit != ".") num2 = "";
        $(".num2").text(num2 + $(this).data("value"));
    }
});

let calc = (num1,num2,op) => {
    let val1,val2;
    if(num1.indexOf(".")) val1 = parseFloat(num1);
    else val1 = parseInt(num1);
    if(num2.indexOf(".")) val2 = parseFloat(num2);
    else val2 = parseInt(num2);
    if(op == "+") return val1 + val2;
    if(op == "-") return val1 - val2;
    if(op == "*") return val1 * val2;
    if(op == "/") return val1 / val2;
    return "NaN";
};

//按下"="，如无运算符则无反应。这一规定是为了防止细节处理出错。
let calculation = () => {
    let num1 = $(".num1").text();
    let num2 = $(".num2").text();
    let op = $(".out > .op").text();
    if(op.length === 0) return;
    $(".num1").text(num1 + op + num2);
    $(".num2").text(calc(num1,num2,op));
    $(".out > .op").text("");
};

let initCalculator = () => {
    $(".num1").text("0");
    $(".num2").text("0");
    $(".out > .op").text("");
};

let setOperator = (op) => {
    $(".out > .op").text(op);
};

//isNaN(num1)判定是否已经是算出结果状态。为了简便，规定算出结果状态下必须清空计算器。
$(".other-button").click(function(){
    let num1 = $(".num1").text(),num2 = $(".num2").text();
    if(isNaN(num1) || isNaN(num2)){
        initCalculator();
        return;
    }
    switch($(this).data("value")){
        case "=":
            calculation();
            break;
        case "C":
            initCalculator();
            break;
        case "(": break;
        case ")": break;
        case "%": break;
        default:
            setOperator($(this).data("value"));
            break;
    }
});