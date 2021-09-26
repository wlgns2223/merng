import {IValidError} from "../types/util/validate";

export const validateRegisterInput = (username: string, email: string, password: string, confirmpassword: string) => {
    const errors:IValidError = {};

    if(username.trim() === '' ) errors.username = 'Username Must Not Be Empty';
    if(username.trim() === '') errors.email = 'Email Must Not Be Empty';
    else {
        const emailRegEx = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/;
        if(!email.match(emailRegEx)) errors.email = 'Email Must Be a Valid Email Address';
    }

    if(password === '') errors.password = 'Password Must Not be Empty';
    else if(password !== confirmpassword) errors.confirmPassword = 'Password Must Match';

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}

export const validateLoginInput = (username: string ,password: string) => {
    const errors:IValidError = {};
    if(username.trim() === '') errors.username = 'Username Must Not Be Empty';
    if(password.trim() === '') errors.password = 'Password Must Not be Empty';

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}