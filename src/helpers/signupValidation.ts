import Schema from '../Schema.json';

export type ValidationError = {
    isValid: boolean;
    errorMessage: string;
}

type RegexValidationSchema = {
    required: boolean;
    regExp: string;
}

type MinMaxValidationSchema = {
    required: boolean;
    minLength: string;
    maxLength: string;
}

export const validateMobile = (value: string): ValidationError => validateRegex(value, Schema.mobilePhone);

export const validateEmail = (value: string): ValidationError => validateRegex(value, Schema.email);

export const validatePassword = (value: string): ValidationError => 
    validateMinMax(value, Schema.password, 'Password');

export const validateConfirmedPassword = (password: string, value: string): ValidationError  => {
    return {
        isValid: password === value,
        errorMessage: password === value ? '' : 'Confirm Password.',
    };
}
export const validateFirstName = (value: string) => validateMinMax(value, Schema.firstName, 'First name');
export const validateLastName = (value: string) => validateMinMax(value, Schema.lastName, 'Last name');

export const validateBirthday = (value: string) => {
    const validationSchema = Schema.birthday;
    let error = {
        isValid: true,
        errorMessage: '',
    } as ValidationError;

    if(validationSchema.required) {
        if(!value) {
            error = {
                isValid: false,
                errorMessage: 'Required.'
            };
        } else {
            const now = new Date(Date.now());
            const date = new Date(value);
            const age = now.getFullYear() - date.getFullYear();

            if(age < Number(validationSchema.minAge) || age > Number(validationSchema.maxAge)) {
                error = {
                    isValid: false,
                    errorMessage: `Age should be between ${validationSchema.minAge} and ${validationSchema.maxAge}`,
                }
            }
        }
    }

    return error;
}

const validateMinMax = (value: string, validationSchema: MinMaxValidationSchema, property: string): ValidationError => {
    let error = {
        isValid: true,
        errorMessage: '',
    } as ValidationError;

    if(validationSchema.required) {
        if(!value) {
            error = {
                isValid: false,
                errorMessage: 'Required.'
            };
        } else {
            if(Number(validationSchema.minLength) > value.length 
                || Number(validationSchema.maxLength) < value.length) {
                    error = {
                        isValid: false,
                        errorMessage: `${property} must be between ${validationSchema.minLength} and ${validationSchema.maxLength} characters.`
                    }
                }
        }
    }

    return error;
}

const validateRegex = (value: string, validationSchema: RegexValidationSchema): ValidationError => {
    let error = {
        isValid: true,
        errorMessage: '',
    } as ValidationError;

    if(validationSchema.required) {
        if(!value) {
            error = {
                isValid: false,
                errorMessage: 'Required.'
            };
        } else {
            const regex = new RegExp(validationSchema.regExp);
            const isValid = regex.test(value);
            error = {
                isValid: isValid,
                errorMessage: isValid ? '' : 'Invalid phone format.'
            }
        }
    }

    return error;
}

export const validate = (values: any): string[] => {
    let errors = [] as string[];

    return errors;
}