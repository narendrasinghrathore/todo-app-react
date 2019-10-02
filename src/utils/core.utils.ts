export enum IDay {
    morning = 0,
    noon = 1,
    evening = 2

}
export function greetUser() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return IDay.morning;
    }
    else if (hour < 16) {
        return IDay.noon;
    }
    else {
        return IDay.evening;
    }

}