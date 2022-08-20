
const numbers = "0123456789"
const lowerLetters = "abcdefghijlkmnñoprqstuvwxyz"
const upperLetters = "ABCDEFGHIJLKMNÑOPRQSTUVWXYZ"
const symbols = "|@#~€¬!$%&/()=+-ºª*"

/* GET ID */
const inputPass = document.getElementById("gen-pass");
const tooltip = document.getElementById("copyclip");
const length_num = document.getElementById('length-num');
const num = document.getElementById('cb-num');
const ll = document.getElementById('cb-ll');
const ul = document.getElementById('cb-ul');
const s = document.getElementById('cb-s');

var checkboxes = document.querySelectorAll('.cb')
/* Copy Clip feature */
function copyPass(){
    inputPass.select();
    inputPass.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputPass.value);
    tooltip.innerHTML = "Copied!";
}
function outMsgCopyclip(){
    tooltip.innerHTML = "Copy to clipboard";
}

/* stepper */
function stepper(btn){
    let id = btn.getAttribute('id');
    let min = length_num.getAttribute('min');
    let max = length_num.getAttribute('max');
    let val = length_num.getAttribute('value');

    let calcStep = (id == "increment") ? 1 : -1;
    let newValue = parseInt(val) + calcStep;

    if (newValue >= min && newValue <= max){
        length_num.setAttribute('value', newValue);
    }
}

/* Pass generator */
function getInfo(){
    checkboxes
    var posibleChar = ""
    if (checkboxes[0].checked){posibleChar+=numbers}
    if (checkboxes[1].checked){posibleChar+=lowerLetters}
    if (checkboxes[2].checked){posibleChar+=upperLetters}
    if (checkboxes[3].checked){posibleChar+=symbols}
    var ans = ""
    if (posibleChar === ""){
        ans="Please check some values";
    }else{
        for(let l = 0; l<length_num.value; l++){
            ans += posibleChar[(Math.floor(Math.random() * posibleChar.length))];
        };
    }
    inputPass.value = ans;
}