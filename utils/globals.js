const REWS_PD4 = {};

REWS_PD4.globals = {};

REWS_PD4.globals.storageKey = "REWS_PD4";

REWS_PD4.HTML = {};

REWS_PD4.HTML.mainPanel = {};
REWS_PD4.HTML.addons = {};


REWS_PD4.functions = {};
REWS_PD4.functions.removeAllChildren = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

REWS_PD4.functions.removeAllChildrenWithSelf = element => {
    REWS_PD4.functions.removeAllChildren(element);
    element.parentNode.removeChild(element);
}


REWS_PD4.functions.templates = {};

REWS_PD4.functions.templates.makeDraggable = (parent, element, identifier, onClick) => {
    const clickDeadzone = 1;

    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const storedX = localStorage.getItem(identifier + "-x");
    const storedY = localStorage.getItem(identifier + "-y");

    if (storedX && storedY) {
        parent.style.left = storedX + "px";
        parent.style.top = storedY + "px";
    } else {
        parent.style.left = "50px";
        parent.style.top = "50px";

        localStorage.setItem(identifier + "-x", parent.style.left);
        localStorage.setItem(identifier + "-y", parent.style.top);
    }

    element.setAttribute("draggable", "false");
    element.addEventListener("pointerdown", (event) => {
        event.preventDefault();

        isDragging = true;

        startX = event.clientX;
        startY = event.clientY;

        offsetX = event.clientX - parent.offsetLeft;
        offsetY = event.clientY - parent.offsetTop;

        element.setPointerCapture(event.pointerId);

        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
    });

    function onMove(event) {
        if (!isDragging) return;

        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        const maxX = window.offsetWidth - parent.offsetWidth;
        const maxY = window.offsetHeight - parent.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        parent.style.left = newX + "px";
        parent.style.top = newY + "px";
    }

    function onUp(event) {
        if (!isDragging) return;

        isDragging = false;

        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);

        element.releasePointerCapture(event.pointerId);

        const movedX = Math.abs(event.clientX - startX);
        const movedY = Math.abs(event.clientY - startY);

        const isClick = movedX < clickDeadzone && movedY < clickDeadzone;

        if (isClick && typeof onClick === "function") {
            onClick(event);
        }

        localStorage.setItem(identifier + "-x", parent.style.left);
        localStorage.setItem(identifier + "-y", parent.style.top);
    }

    window.addEventListener("resize", () => {
        const bounds = parent.getBoundingClientRect();

        const isOutOfBounds =
            bounds.left < 0 ||
            bounds.top < 0 ||
            bounds.right > window.innerWidth ||
            bounds.bottom > window.innerHeight;

        if (isOutOfBounds) {
            parent.style.left = "50px";
            parent.style.top = "50px";

            localStorage.setItem(identifier + "-x", parent.style.left);
            localStorage.setItem(identifier + "-y", parent.style.top);
        }
    });
}


REWS_PD4.functions.templates.createTop = (parent, identifier, contentToHide, closeable) => {
    const top = document.createElement("div");
    top.classList.add(identifier + "-top");
    parent.append(top);


    REWS_PD4.functions.templates.makeDraggable(parent, top, identifier, () => {
        const expanded = localStorage.getItem(identifier + "-expanded");

        if (expanded === "false") {
            contentToHide.style.display = "flex";

            localStorage.setItem(identifier + "-expanded", "true");
        } else {
            contentToHide.style.display = "none";

            localStorage.setItem(identifier + "-expanded", "false");
        }
    });

    if (closeable) {
        const close = document.createElement("label");
        close.classList.add(identifier + "-close");
        close.textContent = "X";
        top.append(close);
    }
}

REWS_PD4.functions.templates.createContent = (parent, identifier) => {
    const content = document.createElement("div");
    content.classList.add(identifier + "-content");
    parent.append(content);

    const expanded = localStorage.getItem(identifier + "-expanded");

    if (expanded === "false") {
        content.style.display = "none";
    } else {
        content.style.display = "flex";

        localStorage.setItem(identifier + "-expanded", "true");
    }

    return content;
}

REWS_PD4.functions.templates.createBody = (parent, identifier, closeable) => {
    const body = document.createElement("div");
    body.classList.add(identifier + "-body");
    parent.append(body);

    const content = REWS_PD4.functions.templates.createContent(parent, identifier);

    REWS_PD4.functions.templates.createTop(body, identifier, content, closeable);
}