import { formattedValue, rutWithoutSymbols, rutIsValid } from "./utils/formatRut.js";
//!rut: 12.345.678-k
//!rutValue: 12345678k

const $rutField = document.querySelector("#rut");

$rutField.addEventListener("input", (event) => {
  //? For every input event, format the value
  const rut = event.target.value;
  const rutValue = rutWithoutSymbols(rut);
  if (rutValue.length > 9) {
    // Rut is invalid: remove the last character inserted
    event.target.value = rutValue.substring(0, 9);
    return;
  }
  event.target.value = formattedValue(rut);
});

$rutField.addEventListener("focus", (event) => {
  //? Remove dots ('.') and hyphens ('-') when the field is focused
  const rut = event.target.value;
  const rutValue = rutWithoutSymbols(rut);
  event.target.value = rutValue;
});

$rutField.addEventListener("blur", (event) => {
  //? Format the value when the field is blurred (lost focus)
  const rut = event.target.value;
  const rutValue = rutWithoutSymbols(rut);
  console.log(rutValue);
  if (!rutIsValid(rutValue)) {
    console.log("Rut is invalid");
    return;
  }
  event.target.value = formattedValue(rut);
});
