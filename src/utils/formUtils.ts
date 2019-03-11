import validation from "validate.js";

export default function validate(fields: any, constraints: any) {
  const errors = validation(fields, constraints);
  console.log(errors);
  if (errors) {
    return false;
  }
  return true;
}
