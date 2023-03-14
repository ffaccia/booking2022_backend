import passwordValidator from "password-validator";

// Create a schema
var schemaPass = new passwordValidator();

// Add properties to it
schemaPass
  .is()
  .min(8, "minimum 8 length, please") // Minimum length 8
  .is()
  .max(12, "maximum 12 length, please") // Maximum length 10
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

//export default passwordValidator

export const schemas = {
  passSchema: schemaPass,
};
