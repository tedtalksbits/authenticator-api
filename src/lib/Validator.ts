interface Validator {
    error: boolean;
    message: string;
}

export const validateUsername = (username: string): Validator => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    // what this regex does:
    // ^ - start of string
    // [a-zA-Z0-9] - any alphanumeric character
    // + - one or more times
    // $ - end of string

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
    // what this regex does:
    // (?=.*[a-z]) - at least one lowercase letter
    // (?=.*[A-Z]) - at least one uppercase letter
    // (?=.*[0-9]) - at least one number
    // (?=.{8,}) - at least 8 characters long

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
    // whta this regex does:
    // ^ - start of string
    // (([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")) - email address
    //  break down:
    // [^<>()[\]\\.,;:\s@"] - any character except for the ones in the brackets
    // + - one or more times
    // (\.[^<>()[\]\\.,;:\s@"]+) - a period followed by any character except for the ones in the brackets
    // * - zero or more times
    // | - or
    // (".+") - a string surrounded by double quotes

    // @ - @ symbol
    // ((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})) - domain name
    //  break down:
    // [0-9]{1,3} - any number between 0 and 9, 1 to 3 times
    // \. - a period
    // [a-zA-Z\-0-9] - any alphanumeric character or a hyphen
    // + - one or more times
    // \. - a period
    // [a-zA-Z]{2,} - any alphabetic character, 2 or more times

    // $ - end of string

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
