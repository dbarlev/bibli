export const CHOOSE_SUBSCRIPTION = "CHOOSE_SUBSCRIPTION";
export const CREATE_APA_STANDARD = "CREATE_APA_STANDARD";


export function chooseSubscription(value, name){
    return {
        type: CHOOSE_SUBSCRIPTION,
        value,
        name
    }
}

export function CreateBookApaStandart(obj){
    return {
        type: CREATE_APA_STANDARD,
        value : obj
    }
}





