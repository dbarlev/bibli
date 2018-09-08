export const CHOOSE_SUBSCRIPTION = "CHOOSE_SUBSCRIPTION";
export const CREATE_APA_BOOKS_STANDARD = "CREATE_APA_BOOKS_STANDARD";
export const CREATE_APA_PAPER_STANDARD = "CREATE_APA_PAPER_STANDARD";
export const CREATE_APA_ARTICLE_STANDARD = "CREATE_APA_ARTICLE_STANDARD";
export const CREATE_APA_WEBSITE_STANDARD = "CREATE_APA_WEBSITE_STANDARD";


export function chooseSubscription(value, name){
    return {
        type: CHOOSE_SUBSCRIPTION,
        value,
        name
    }
}

export function CreateBookApaStandart(obj){
    return {
        type: CREATE_APA_BOOKS_STANDARD,
        value : obj
    }
}

export function CreatePaperApaStandart(obj){
    return {
        type: CREATE_APA_PAPER_STANDARD,
        value : obj
    }
}

export function CreateArticleApaStandart(obj){
    return {
        type: CREATE_APA_ARTICLE_STANDARD,
        value : obj
    }
}

export function CreateWebsiteApaStandart(obj){
    return {
        type: CREATE_APA_WEBSITE_STANDARD,
        value : obj
    }
}








