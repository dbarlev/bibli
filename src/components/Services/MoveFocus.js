export function moveFocus(keydownEvent, directions) {
    const keyCode = keydownEvent.keyCode || keydownEvent.which;
    let element = null;

    switch (keyCode) {
        case 37:
            if (directions.left)
                element = document.getElementById(directions.left);
            break;
        case 39:
            if (directions.right)
                element = document.getElementById(directions.right);
            break;
    }

    element && element.focus();
}