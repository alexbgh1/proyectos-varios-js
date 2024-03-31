import { formattedValue, rutWithoutSymbols } from "./utils/formatRut.js";
const $rutField = document.querySelector("#rut");

$rutField.addEventListener("input", (event) => {
  //? For every input event, format the value
  const rutValue = event.target.value;
  const rutValueOnlyNumbers = rutWithoutSymbols(rutValue);
  if (rutValueOnlyNumbers.length > 9) {
    // Rut is invalid
    event.target.value = rutValueOnlyNumbers.substring(0, 9);
    return;
  }

  event.target.value = formattedValue(rutValue);
});

$rutField.addEventListener("focus", (event) => {
  //? Remove dots ('.') and hyphens ('-') when the field is focused
  const rutValue = event.target.value;
  const rutValueOnlyNumbers = rutWithoutSymbols(rutValue);
  event.target.value = rutValueOnlyNumbers;
});

$rutField.addEventListener("blur", (event) => {
  //? Format the value when the field is blurred (lost focus)
  const value = event.target.value;
  event.target.value = formattedValue(value);
});
