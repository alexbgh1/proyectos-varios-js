const numbers = "0123456789"
const lowerLetters = "abcdefghijlkmnñoprqstuvwxyz"
const upperLetters = "ABCDEFGHIJLKMNÑOPRQSTUVWXYZ"
const symbols = "|@#~€¬!$%&/()=+-ºª*"

var inputPass = document.getElementById("gen-pass");
var tooltip = document.getElementById("copyclip");

function copyPass(){
    inputPass.select();
    inputPass.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputPass.value);
    tooltip.innerHTML = "Copied!";
}
function outMsgCopyclip(){
    tooltip.innerHTML = "Copy to clipboard";
}