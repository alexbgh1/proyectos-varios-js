import { STATE, colorType } from "../constants/state.js";

const handleErrorField = (message = "", type = STATE.DEFAULT, $field, $errorField = null) => {
  if ($errorField) $errorField.textContent = message;

  // Remove others 'border-bg-color'
  // This implementation can be avoided by using tailwind-merge plugin
  $field.classList.value.split(" ").forEach((className) => {
    if (className.includes("border-")) {
      $field.classList.remove(className);
    }
  });

  const color = colorType[type];
  $field.classList.add(color);
};

export default handleErrorField;
