export const CHOOSE_SUBSCRIPTION = "CHOOSE_SUBSCRIPTION";

export function chooseSubscription(value){
    return {
        type: CHOOSE_SUBSCRIPTION,
        value
    }
}
