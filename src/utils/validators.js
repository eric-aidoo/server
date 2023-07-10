const phoneNumberValidator = (country) => {
  const phoneNumberValidator = {
    US: /^\+1([2-9][0-9]{2})([2-9][0-9]{6})$/,
    // GH: /^\+233([2-9]\d{8})$/,
  };
  const countries = Object.keys(phoneNumberValidator);
  if (!countries.includes(country)) {
    throw new ValidationError(`Invalid or unsupported country code for the specified phone number`);
  }
  return phoneNumberValidator[country];
};

const validator = {
  phoneNumberValidator,
};

export default validator;
