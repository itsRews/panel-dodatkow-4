const REWS_PD4 = {};


REWS_PD4.globals = {};

REWS_PD4.globals.identifier = "REWS_PD4";
REWS_PD4.globals.url = "https://itsrews.github.io/panel-dodatkow-4";
REWS_PD4.globals.date = new Date().getTime();
REWS_PD4.globals.version = "4.0.0";
REWS_PD4.globals.updateData = [];

REWS_PD4.HTML = {};
REWS_PD4.HTML.host = {};


REWS_PD4.functions = {};

REWS_PD4.functions.removeAllChildren = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
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
        parent.style.left = storedX;
        parent.style.top = storedY;
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

        const maxX = window.innerWidth - parent.offsetWidth;
        const maxY = window.innerHeight - parent.offsetHeight;

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

REWS_PD4.functions.templates.createBody = (parent, identifier, titleOpen, titleClose, isCloseable) => {
    const body = document.createElement("div");

    if (identifier == REWS_PD4.globals.identifier + "-main") body.classList.add(identifier + "-body");
    else body.classList.add(REWS_PD4.globals.identifier + "-addons-body");

    parent.append(body);

    REWS_PD4.functions.templates.createContent(body, identifier);

    REWS_PD4.functions.templates.createTop(body, identifier, titleOpen, titleClose, isCloseable);
}

REWS_PD4.functions.templates.createContent = (parent, identifier) => {
    const content = document.createElement("div");

    if (identifier == REWS_PD4.globals.identifier + "-main") content.classList.add(identifier + "-content");
    else content.classList.add(REWS_PD4.globals.identifier + "-addons-content");

    content.id = identifier + "-content";
    parent.append(content);

    const expanded = localStorage.getItem(identifier + "-expanded");
    if (expanded === "false") {
        content.style.display = "none";
    } else {
        content.style.display = "flex";

        localStorage.setItem(identifier + "-expanded", "true");
    }
}




REWS_PD4.functions.templates.createTop = (parent, identifier, titleOpen, titleClose, isCloseable) => {
    const top = document.createElement("div");
    top.classList.add(REWS_PD4.globals.identifier + "-top");
    parent.append(top);

    const title = document.createElement("label");
    top.append(title);

    const expanded = localStorage.getItem(identifier + "-expanded");
    if (expanded === "false") {
        title.textContent = titleClose;
    } else {
        title.textContent = titleOpen;

        localStorage.setItem(identifier + "-expanded", "true");
    }

    let contentToHide = document.getElementById(identifier + "-content");
    REWS_PD4.functions.templates.makeDraggable(parent, top, identifier, (event) => {
        console.log(event);
        const expanded = localStorage.getItem(identifier + "-expanded");
        if (expanded === "false") {
            contentToHide.style.display = "flex";
            title.textContent = titleOpen;

            localStorage.setItem(identifier + "-expanded", "true");
        } else {
            contentToHide.style.display = "none";
            title.textContent = titleClose;

            localStorage.setItem(identifier + "-expanded", "false");
        }
    });

    if (isCloseable) {
        const close = document.createElement("label");
        close.classList.add(REWS_PD4.globals.identifier + "-close");
        close.textContent = "X";
        top.append(close);
    }
}

REWS_PD4.functions.templates.createButton = (parent, text, checkbox, onClick) => {
    const button = document.createElement("div");
    button.classList.add(REWS_PD4.globals.identifier + "-button");
    parent.append(button);

    const button_label = document.createElement("label");
    button_label.textContent = text;
    button.append(button_label);

    if (typeof checkbox == "Object") {
        const host = document.getElementById(REWS_PD4.globals.identifier + "-host")
        fetch(`${REWS_PD4.globals.url}/addons/${text}.js?v=${DATE}`)
            .then(response => response.text())
            .then(responseText => {
                const script = document.createElement('script');
                script.textContent = responseText;
                host.append(script);
            });
    }

    button.addEventListener("mousedown", () => {
        if (typeof onClick === "function") {
            onClick();
        }
    });
}