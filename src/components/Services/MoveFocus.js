/*
    @param keydownEvent - event object
    @param options - {
        current: id of the current element
        left: ID of the element on the left
        right: ID of the element on the right
        enter: selector of the tabpanel
        tab: selector of the element to focus
        activateOnFocus: default false - if on focus the element should be triggered ( for tabcontrol porpuses )
    }
*/
export function moveFocus(keydownEvent, options) {
    const keyCode = keydownEvent.keyCode || keydownEvent.which;
    let element = null;
    let currentElement;
    if (options.current) {
        currentElement = document.getElementById(options.current);
    }

    switch (keyCode) {
        case 37:
            keydownEvent.preventDefault();
            if (options.left)
                element = document.getElementById(options.left);
            break;
        case 39:
            keydownEvent.preventDefault();
            if (options.right)
                element = document.getElementById(options.right);
            break;
        case 13:
            keydownEvent.preventDefault();
            if (options.enter) {
                currentElement && currentElement.click();
                element = document.querySelector(options.enter);
            }
            break;
        case 9:
            if (options.tab)
                element = document.querySelector(options.tab);
            break;
    }

    element && element.focus();
    element && options.activateOnFocus && element.click();
}