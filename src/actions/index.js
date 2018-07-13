export const CHOOSE_SUBSCRIPTION = "CHOOSE_SUBSCRIPTION";

export function chooseSubscription(value, name){
    return {
        type: CHOOSE_SUBSCRIPTION,
        value,
        name
    }
}
