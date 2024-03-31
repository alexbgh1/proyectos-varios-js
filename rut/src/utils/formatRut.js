//! When referencing 'rut' i mean the whole string, including dots and hyphens: 12.345.678-9
//! When referencing 'rutValue' i mean the string without dots and hyphens: 12345678k

const formattedValue = (rutValue) => {
  //? Format rutValue instantly (ej: 123 -> 12-3, 1234 -> 123-4, 12345 -> 1.234-5)
  //? Only accept numbers and 'k' or 'K'
  // /g: global, match all ocurrences
  const rut = rutValue.replace(/[^0-9kK]/g, "");
  const rutLength = rut.length;

  // No need to format '-'
  if (rutLength <= 1) return rut;

  let rutDigits = rut.substring(0, rutLength - 1);
  rutDigits = replaceDigitsTo3Digits(rutDigits);
  const rutVerifyingDigit = rut.substring(rutLength - 1);

  return `${rutDigits}-${rutVerifyingDigit}`;
};

const replaceDigitsTo3Digits = (rutValue) => {
  //? Add dots every 3 digits
  // Ex: 1234567 -> 1.234.567

  //| \d: digit, 0-9 ; {3}: 3 ocurrences
  //| \B: not a word boundary (start or end of word), with this we avoid adding a dot at the start of the string: 123 -> .123
  //| (?=(\d{3})+: positive lookahead, followed by 3 digits one or more times: 123, 456, 789, without plus symbol: 123456.789-0
  //| (?!\d): negative lookahead, not followed by a digit:
  //| example expected: 123.456.789-0 ; without (?!\d): 1.2.3.4.5.6.789-0
  return rutValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const rutIsValid = (rutValue) => {
  //? Check if the rut is valid
  const rutDV = rutDVCalculation(rutValue.substring(0, rutValue.length - 1)); // Exclude verifying digit
  if (rutValue.charAt(rutValue.length - 1).toLowerCase() === rutDV) return true;

  return false;
};
//?

const rutWithoutSymbols = (rut) => {
  //? Remove dots ('.') and hyphens ('-')
  return rut.replace(/[.-]/g, "");
};

const rutDVCalculation = (T) => {
  let M = 0,
    S = 1;
  for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  return S ? (S - 1).toString() : "k";
};

export { formattedValue, replaceDigitsTo3Digits, rutWithoutSymbols, rutIsValid };
