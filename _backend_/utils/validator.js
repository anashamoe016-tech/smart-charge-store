export const isEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

};

export const isEmpty = (value) => {

    return value === undefined ||

           value === null ||

           value === "";

};

export const isPositiveNumber = (value) => {

    return !isNaN(value) && Number(value) > 0;

};