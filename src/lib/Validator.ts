interface Validator {
    error: boolean;
    message: string;
}

export const validateUsername = (username: string): Validator => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        return {
            error: true,
            message: 'Username must be alphanumeric',
        };
    }
    return {
        error: false,
        message: '',
    };
};

export const validatePassword = (password: string): Validator => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
        return {
            error: true,
            message:
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
        };
    }
    return {
        error: false,
        message: '',
    };
};

export const validateEmail = (email: string): Validator => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return {
            error: true,
            message: 'Email is invalid',
        };
    }
    return {
        error: false,
        message: '',
    };
};

export const validateName = (name: string): Validator => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
        return {
            error: true,
            message: 'Name must be alphabetic',
        };
    }
    return {
        error: false,
        message: '',
    };
};
