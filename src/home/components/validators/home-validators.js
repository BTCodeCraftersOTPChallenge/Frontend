//Password:
const passwordValidator = value => {
    const re = /^[A-Z]{12}$/;
    return re.test(String(value));
};

//Is required:
const isRequiredValidator = value => {
    return value.trim() !== '';
};


//Values:
const validate = (value, rules) =>
{
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'passwordValidator': isValid = isValid && passwordValidator(value);
                                      break;
            case 'isRequiredValidator': isValid = isValid && isRequiredValidator(value);
                                        break;
            default: isValid = true;
        }
    }

    return isValid;
};


export default validate;