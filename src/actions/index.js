import {
     CHOOSE_SUBSCRIPTION,
     SET_RETRIVED_DATE
} from './consts';

export function chooseSubscription(value, name){
    return {
        type: CHOOSE_SUBSCRIPTION,
        value,
        name
    }
}

export function setRetriveDate(date){
    return {
        type: SET_RETRIVED_DATE,
        value : date
    }
}












