export const dateToString = (date: Date): string => {
    const to2Digits = (number: number) => ('0' + number).slice(-2)
    return `${date.getFullYear()}-${to2Digits((date.getMonth() + 1))}-${to2Digits(date.getDate())}`
}