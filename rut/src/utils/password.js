const passwordRegEx = (password) => {
  //? Función para validar la contraseña con expresiones regulares
  const regexLength = new RegExp(`.{8,}`);
  const regexUpperCase = new RegExp("[A-Z]");
  const regexLowerCase = new RegExp("[a-z]");
  const regexNumber = new RegExp("[0-9]");
  const regexSpecialCharacter = new RegExp("[!@#$%^&*.,]");

  /* Show all requeriments, if the password complies, then the color will be green for that requirement */
  const length = regexLength.test(password);
  const upperCase = regexUpperCase.test(password);
  const lowerCase = regexLowerCase.test(password);
  const number = regexNumber.test(password);
  const specialCharacter = regexSpecialCharacter.test(password);

  return { length, upperCase, lowerCase, number, specialCharacter };
};

function getPasswordRequirements(password) {
  //? Función para obtener los requisitos de la contraseña
  const { length, upperCase, lowerCase, number, specialCharacter } = passwordRegEx(password);
  return {
    length: { requirementMsg: "Mínimo 8 caracteres", value: length },
    upperCase: { requirementMsg: "Al menos una mayúscula", value: upperCase },
    lowerCase: { requirementMsg: "Al menos una minúscula", value: lowerCase },
    number: { requirementMsg: "Al menos un número", value: number },
    specialCharacter: { requirementMsg: "Al menos un caracter especial", value: specialCharacter },
  };
}

export { passwordRegEx, getPasswordRequirements };
