import { formattedValue, rutWithoutSymbols, rutIsValid } from "./utils/rut.js";
import { getPasswordRequirements } from "./utils/password.js";
import handleErrorField from "./utils/handleErrorField.js";
import { STATE } from "./constants/state.js";
import { RUT_MAX_LENGTH, RUT_MIN_LENGTH } from "./constants/rut.js";
//!rut: 12.345.678-k
//!rutValue: 12345678k

const $rutField = document.getElementById("rut");
const $rutFieldError = document.getElementById("rut-error");

const $passwordField = document.getElementById("password");
const $passwordFieldRequeriments = document.getElementById("password-requeriments");
const $togglePasswordButton = document.getElementById("toggle-password");

// ----- Event listeners rutField -----
$rutField.addEventListener("input", (event) => {
  //? For every input event, format the value
  const rut = event.target.value;
  const rutValue = rutWithoutSymbols(rut);
  if (rutValue.length > RUT_MAX_LENGTH) {
    // Rut is invalid: remove the last character inserted
    event.target.value = rutValue.substring(0, RUT_MAX_LENGTH);
    return;
  }

  event.target.value = formattedValue(rut);
  // 8 because the rut must have at least 8 characters: 1345678k -> 8 characters
  if (rutValue.length < RUT_MIN_LENGTH || !rutIsValid(rutValue)) {
    handleErrorField("Es posible que el rut proporcionado sea inválido.", STATE.ERROR, $rutField, $rutFieldError);
    return;
  }
  handleErrorField("", STATE.SUCCESS, $rutField, $rutFieldError);
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
  if (rutValue.length < RUT_MIN_LENGTH || !rutIsValid(rutValue)) {
    handleErrorField("Es posible que el rut proporcionado sea inválido.", STATE.ERROR, $rutField, $rutFieldError);
    return;
  }
  handleErrorField("", STATE.SUCCESS, $rutField, $rutFieldError);
  event.target.value = formattedValue(rut);
});

// ----- Event listeners passwordField -----
$togglePasswordButton.addEventListener("click", (event) => {
  const type = $passwordField.type === "password" ? "text" : "password";
  $passwordField.type = type;

  // Get the image element inside the button
  const $eye = $togglePasswordButton.querySelector("img");
  $eye.src = type === "password" ? "/public/eye-slash.svg" : "/public/eye.svg";
  $eye.alt = type === "password" ? "Mostrar contraseña" : "Ocultar contraseña";
});

$passwordField.addEventListener("input", (event) => {
  const password = event.target.value;
  // Input char should be valid
  $passwordFieldRequeriments.classList.remove("max-h-0");
  $passwordFieldRequeriments.classList.add("max-h-40");

  const requirements = getPasswordRequirements(password);

  // Get only 'data-requeriment' elements
  const requeriementsElements = $passwordFieldRequeriments.querySelectorAll("[data-requeriment]");

  // Iterate over 'requeriementsElements' and update the class
  requeriementsElements.forEach((element) => {
    const dataRequeriment = element.dataset.requeriment;
    const span = element.querySelector("span");
    if (!span || !requirements[dataRequeriment]) return;

    span.classList.toggle("strike", requirements[dataRequeriment].value);
  });

  const allRequirementsMet = Object.values(requirements).every((requirement) => requirement.value);
  if (!allRequirementsMet) {
    handleErrorField(null, STATE.ERROR, $passwordField, null);
    return;
  }

  // Clean the border color & clean requirements
  $passwordFieldRequeriments.classList.remove("max-h-40");
  $passwordFieldRequeriments.classList.add("max-h-0");
  handleErrorField(null, STATE.SUCCESS, $passwordField, null);
});
