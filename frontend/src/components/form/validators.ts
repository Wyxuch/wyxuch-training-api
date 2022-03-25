import { type } from 'os';

export const validateDate = (value: string) => {
    if (!value.length) {
        return 'Field cannot be empty'
    }
    if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
        return 'Date needs to match format yyyy-MM-dd e.g. "2020-02-03"'
    }
    if (isNaN((new Date(value)).getTime())) {
        return 'Invalid date'
    }
    return;
}

export const validateCurrency = (value: string) => {
    if (!value.length) {
        return 'Field cannot be empty'
    }
    return;
}

export const validateId = (value: string) => {
    if (!value.length) {
        return 'Field cannot be empty'
    }
    return;
}

export const validateNumber = (value: string | number) => {
    if (typeof value === 'string' && !value.length) {
        return 'Field cannot be empty'
    }
    if (!value) {
        return 'Field cannot be empty or contain non-numeric characters'
    }
    if (isNaN(Number(value))) {
        return 'Value must be an number e. g. "2" or "21.37"'
    }
    return;
}