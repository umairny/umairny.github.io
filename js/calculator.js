//Display screen
const calc = (n) => {
    let ma = document.getElementById("result").value+=n
    //limt the len of numbers entered.
    if(ma.length > 21){
        ma = ma.substring(0, ma.length-1)
        document.getElementById("result").value = ma
        //console.log(ma)
    }
}
//solve calculator
const solve = () => {
    let x = document.getElementById("result").value
    //console.log(x.length)
    //console.log(x.replace('÷', '/'));
    //console.log(x)

    //if value is undefine
    if(x.length === 0){
        x = "0"
    }
    //Conver oprator to js equ oprators
    if(x.includes('÷')){
        x = x.replace('÷', '/')
        //console.log(x)
    }
    if(x.includes('×')){
        x = x.replace('×', '*')
        //console.log(x)
    }
    //percentage of a value
    if(x.includes('%')){
        a = x.substring(x.indexOf('%') + 1)
        b = x.substring(0, x.indexOf('%'))
        x = (a*b)/100
        //console.log(a)
        //console.log(b)
    }
    let y = eval(x)
    document.getElementById("result").value = y
}

//suare root 
const sq = () => {
    let x = document.getElementById("result").value
    let y = Math.sqrt(x);
    document.getElementById("result").value = y
}
//clear screen
const clr = () => 
{
    document.getElementById("result").value = ""
}
//Go back one chrachter
const back = () => {
    let x = document.getElementById("result").value
    x = x.substring(0, x.length-1)
    document.getElementById("result").value = x
}