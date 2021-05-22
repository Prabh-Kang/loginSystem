
const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const registerValidator = ( username, email, password, confirmPassword ) => {
    
    const errors = {errors:{}};

    if(username.trim() === '') {
        errors.errors.username = "Username must not be empty"
    } 

    if (email.trim() === '') {
        errors.errors.email = "Email must not be empty"
    }

    else {
        
        if(!email.match(regEx)) {
            errors.errors.email = "Email must be valid"
        }
    }
    if (password.trim() === '') {
        errors.errors.password = 'Password must be not empty'
    }
    if (confirmPassword.trim() === '') {
        errors.errors.confirmPassword = 'Password must be not empty'
    }
    if (password.trim() !== '' && confirmPassword.trim() !== '' && password !== confirmPassword) {
        errors.errors.matchPassword = 'Passwords must match'
    }

    const valid = Object.keys(errors.errors).length < 1;
    return {
        valid,
        errors
    } 
}

const loginValidator = (email, password) => {
    const errors = { errors: {} };

    if(email.trim() === '') {
        errors.errors.email = 'Email field must not be empty';
    } else {
        
        if(!email.match(regEx)) {
            errors.errors.email = "Email must be valid"
        }
    }

    if(password.trim() === '') {
        errors.errors.password = 'Password field must not be empty';
    }

    const valid = Object.keys(errors.errors).length < 1;
    return {
        valid,
        errors
    }
} 


module.exports = {
    registerValidator,
    loginValidator,
    regEx,
}
