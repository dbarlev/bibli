/*
    @param keydownEvent - event object
    @param options - {
        left: ID of the element on the left,
        right: ID of the element on the right
        activateOnFocus: default false - if on focus the element should be triggered ( for tabcontrol porpuses )
    }
*/
export function moveFocus(keydownEvent, options) {
    const keyCode = keydownEvent.keyCode || keydownEvent.which;
    let element = null;

    switch (keyCode) {
        case 37:
            if (options.left)
                element = document.getElementById(options.left);
            break;
        case 39:
            if (options.right)
                element = document.getElementById(options.right);
            break;
    }

    element && element.focus();
    element && options.activateOnFocus && element.click();
}