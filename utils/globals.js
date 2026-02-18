const REWS_PD4 = {};


REWS_PD4.globals = {};

REWS_PD4.globals.identifier = "REWS_PD4";
REWS_PD4.globals.url = "https://itsrews.github.io/panel-dodatkow-4";
REWS_PD4.globals.date = new Date().getTime();
REWS_PD4.globals.version = "4.0.0";
REWS_PD4.globals.updateData = [];
REWS_PD4.globals.addonList = ["EasyGroup", "SafeAttack", "GroupClan", "Predator"];

REWS_PD4.addons = REWS_PD4.addons || {};

REWS_PD4.HTML = {};
REWS_PD4.HTML.host = {};


REWS_PD4.functions = {};

REWS_PD4.functions.removeAllChildren = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

REWS_PD4.functions.loadSettings = (defaultKeybinds, defaultSettings, identifier, addonName) => {



    (function setupKeybinds() {
        const keybindsJson = localStorage.getItem(identifier + "-keybinds");
        if (keybindsJson === null || keybindsJson === "undefined") {
            REWS_PD4.addons[addonName].keybinds = defaultKeybinds
            localStorage.setItem(identifier + "-keybinds", JSON.stringify(REWS_PD4.addons[addonName].keybinds));
        } else {
            REWS_PD4.addons[addonName].keybinds = JSON.parse(keybindsJson);

            for (let key in defaultKeybinds) {
                if (REWS_PD4.addons[addonName].keybinds[key] === undefined) REWS_PD4.addons[addonName].keybinds[key] = defaultKeybinds[key];
            }

            for (let key in REWS_PD4.addons[addonName].keybinds) {
                if (!defaultKeybinds.hasOwnProperty(key)) delete REWS_PD4.addons[addonName].keybinds[key]
            }

            localStorage.setItem(identifier + "-keybinds", JSON.stringify(REWS_PD4.addons[addonName].keybinds));
        }
    })();

    (function setupSettings() {
        const settingsJson = localStorage.getItem(identifier + "-settings");
        if (settingsJson === null || settingsJson === "undefined") {
            REWS_PD4.addons[addonName].settings = defaultSettings;
            localStorage.setItem(identifier + "-settings", JSON.stringify(REWS_PD4.addons[addonName].settings));
        } else {
            REWS_PD4.addons[addonName].settings = JSON.parse(settingsJson);

            for (let key in defaultSettings) {
                if (REWS_PD4.addons[addonName].settings[key] === undefined) REWS_PD4.addons[addonName].settings[key] = defaultSettings[key];
            }

            for (let key in REWS_PD4.addons[addonName].settings) {
                if (!defaultSettings.hasOwnProperty(key)) delete REWS_PD4.addons[addonName].settings[key]
            }

            localStorage.setItem(identifier + "-settings", JSON.stringify(REWS_PD4.addons[addonName].settings));
        }
    })();
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

    if (identifier === REWS_PD4.globals.identifier + "-main") body.classList.add(identifier + "-body");
    else body.classList.add(REWS_PD4.globals.identifier + "-addons-body");

    parent.append(body);

    REWS_PD4.functions.templates.createContent(body, identifier);

    REWS_PD4.functions.templates.createTop(body, identifier, titleOpen, titleClose, isCloseable);

    return body;
}

REWS_PD4.functions.templates.createContent = (parent, identifier) => {
    const content = document.createElement("div");

    if (identifier === REWS_PD4.globals.identifier + "-main") content.classList.add(identifier + "-content");
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
        if (event.button !== 0) return;

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

        close.addEventListener("pointerdown", () => {
            localStorage.setItem(identifier + "-isCreated", "false");
            parent.remove();
        });
    }
}

REWS_PD4.functions.templates.createButton = (parent, text, checkbox, onClick) => {
    const button = document.createElement("div");
    button.classList.add(REWS_PD4.globals.identifier + "-button");
    parent.append(button);

    const button_label = document.createElement("label");
    button_label.textContent = text;
    button.append(button_label);

    if (checkbox === true) {
        let addonIdentifier = text.replace("> ", "");
        let identifier = REWS_PD4.globals.identifier + "-" + addonIdentifier;
        const enabled = localStorage.getItem(identifier + "-enabled");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = enabled === "true";
        button.append(checkbox);

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                localStorage.setItem(identifier + "-enabled", "true");
            } else {
                localStorage.setItem(identifier + "-enabled", "false");
            }
        });

        if (enabled === "true") {
            const host = document.getElementById(REWS_PD4.globals.identifier + "-host");

            fetch(`${REWS_PD4.globals.url}/addons/${addonIdentifier}.js?v=${REWS_PD4.globals.date}`)
                .then(response => response.text())
                .then(responseText => {
                    const script = document.createElement('script');
                    script.textContent = responseText;
                    host.append(script);
                });
        } else {
            localStorage.setItem(identifier + "-expanded", "false");
        }

        return button;
    }

    button.addEventListener("mousedown", () => {
        if (typeof onClick === "function") {
            onClick();
        }
    });
}

REWS_PD4.functions.templates.createAddonButton = (parent, text, onClick) => {
    const button = document.createElement("div");
    button.classList.add(REWS_PD4.globals.identifier + "-addon_button");
    parent.append(button);

    const button_label = document.createElement("label");
    button_label.textContent = text;
    button.append(button_label);

    button.addEventListener("mousedown", () => {
        if (typeof onClick === "function") {
            onClick();
        }
    });
}

REWS_PD4.functions.templates.createAddonWindowButton = (parent, text, onClick) => {
    const button = document.createElement("div");
    button.classList.add(REWS_PD4.globals.identifier + "-EasyGroup" + "-invite_button");
    parent.append(button);

    const button_label = document.createElement("label");
    button_label.textContent = text;
    button.append(button_label);

    button.addEventListener("mousedown", () => {
        if (typeof onClick === "function") {
            onClick();
        }
    });

    return button;
}

REWS_PD4.functions.templates.createGroupClanButton = (parent, text, onClick) => {
    const button = document.createElement("div");
    button.classList.add(REWS_PD4.globals.identifier + "-GroupClan" + "-button");
    parent.append(button);

    const button_label = document.createElement("label");
    button_label.textContent = text;
    button.append(button_label);

    button.addEventListener("mousedown", () => {
        if (typeof onClick === "function") {
            onClick();
        }
    });
}

REWS_PD4.functions.templates.createSingleAddonWindowButton = (parent, text, onClick) => {
    const button = document.createElement("div");
    button.classList.add(REWS_PD4.globals.identifier + "-addons" + "-single_button");
    parent.append(button);

    const button_label = document.createElement("label");
    button_label.textContent = text;
    button.append(button_label);

    button.addEventListener("mousedown", () => {
        if (typeof onClick === "function") {
            onClick();
        }
    });
}

REWS_PD4.functions.templates.createTable = (parent, headers, data) => {
    const table = document.createElement("table");
    table.classList.add(REWS_PD4.globals.identifier + "-table");

    (function createHeaders() {
        const header = document.createElement("thead");
        header.classList.add(REWS_PD4.globals.identifier + "-table");
        const row = document.createElement("tr");
        row.classList.add(REWS_PD4.globals.identifier + "-row");

        headers.forEach(text => {
            const header = document.createElement("th");
            header.classList.add(REWS_PD4.globals.identifier + "-table");

            header.textContent = text;
            row.appendChild(header);
        });

        header.append(row);
        table.append(header);
    })();

    (function createRows() {
        const body = document.createElement("tbody");
        body.classList.add(REWS_PD4.globals.identifier + "-table");

        data.forEach(item => {
            const row = document.createElement("tr");
            row.classList.add(REWS_PD4.globals.identifier + "-table");

            Object.values(item).forEach(value => {
                const cell = document.createElement("td");
                cell.classList.add(REWS_PD4.globals.identifier + "-table");
                cell.textContent = value;
                row.appendChild(cell);
            });

            body.append(row);
        });

        table.appendChild(body);
    })();

    parent.append(table);
}

REWS_PD4.functions.templates.createKeybindsTable = (parent, headers, data) => {
    const table = document.createElement("table");
    table.classList.add(REWS_PD4.globals.identifier + "-table");

    (function createHeaders() {
        const header = document.createElement("thead");
        header.classList.add(REWS_PD4.globals.identifier + "-table");
        const row = document.createElement("tr");
        row.classList.add(REWS_PD4.globals.identifier + "-row");

        headers.forEach(text => {
            const header = document.createElement("th");
            header.classList.add(REWS_PD4.globals.identifier + "-table");

            header.textContent = text;
            row.appendChild(header);
        });

        header.append(row);
        table.append(header);
    })();

    (function createRows() {
        const body = document.createElement("tbody");
        body.classList.add(REWS_PD4.globals.identifier + "-table");

        for (let addonName in data) {
            const addon = data[addonName];
            const keybinds = addon.keybinds;

            for (let action in keybinds) {
                const config = keybinds[action];

                const row = document.createElement("tr");
                row.classList.add(REWS_PD4.globals.identifier + "-table");

                (function createAddonNameCell() {
                    const cell = document.createElement("td");
                    cell.classList.add(REWS_PD4.globals.identifier + "-table");
                    cell.classList.add(REWS_PD4.globals.identifier + "-keybinds_table-addon_name");
                    cell.textContent = addonName;
                    row.appendChild(cell);
                })();

                (function createActionCell() {
                    const cell = document.createElement("td");
                    cell.classList.add(REWS_PD4.globals.identifier + "-table");
                    cell.textContent = config.action;
                    row.appendChild(cell);
                })();

                (function createShiftCell() {
                    const cell = document.createElement("td");
                    cell.classList.add(REWS_PD4.globals.identifier + "-table");
                    cell.classList.add(REWS_PD4.globals.identifier + "-keybinds_table-checkbox");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = config.shift === true;
                    checkbox.addEventListener("change", () => {
                        config.shift = checkbox.checked;
                        localStorage.setItem(REWS_PD4.globals.identifier + `-${addonName}` + "-keybinds", JSON.stringify(addon));
                    });

                    cell.append(checkbox);
                    row.appendChild(cell);
                })();

                (function createCtrlCell() {
                    const cell = document.createElement("td");
                    cell.classList.add(REWS_PD4.globals.identifier + "-table");
                    cell.classList.add(REWS_PD4.globals.identifier + "-keybinds_table-checkbox");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = config.ctrl === true;
                    checkbox.addEventListener("change", () => {
                        config.ctrl = checkbox.checked;
                        localStorage.setItem(REWS_PD4.globals.identifier + `-${addonName}` + "-keybinds", JSON.stringify(addon));
                    });

                    cell.append(checkbox);
                    row.appendChild(cell);
                })();

                (function createAltCell() {
                    const cell = document.createElement("td");
                    cell.classList.add(REWS_PD4.globals.identifier + "-table");
                    cell.classList.add(REWS_PD4.globals.identifier + "-keybinds_table-checkbox");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = config.alt === true;
                    checkbox.addEventListener("change", () => {
                        config.alt = checkbox.checked;
                        localStorage.setItem(REWS_PD4.globals.identifier + `-${addonName}` + "-keybinds", JSON.stringify(addon));
                    });

                    cell.append(checkbox);
                    row.appendChild(cell);
                })();

                (function createKeyCell() {
                    const cell = document.createElement("td");
                    cell.classList.add(REWS_PD4.globals.identifier + "-table");
                    cell.classList.add(REWS_PD4.globals.identifier + "-keybinds_table-key");

                    const input = document.createElement("input");
                    input.classList.add(REWS_PD4.globals.identifier + "-text_input");
                    input.type = "text";
                    input.readOnly = true;
                    input.value = config.code;

                    input.addEventListener("focus", () => {
                        input.value = "...";
                    });

                    input.addEventListener("keydown", (event) => {

                        config.code = event.code;
                        input.value = event.code;

                        localStorage.setItem(REWS_PD4.globals.identifier + `-${addonName}` + "-keybinds", JSON.stringify(addon));

                        input.blur();
                    });

                    input.addEventListener("blur", () => {
                        input.value = config.code;
                    })

                    cell.append(input);
                    row.appendChild(cell);
                })();

                body.append(row);
            }
        }

        table.appendChild(body);
    })();

    parent.append(table);
}

REWS_PD4.functions.templates.createPageSection = (parent, title, text) => {
    const header = document.createElement("span");
    header.classList.add(REWS_PD4.globals.identifier + "-main" + "-page_header");
    header.textContent = title;
    parent.append(header);

    const description = document.createElement("span");
    description.classList.add(REWS_PD4.globals.identifier + "-main" + "-page_text");
    description.textContent = text;
    parent.append(description);
}

REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox = (leftSide, rightSide, title, identifier, addonName, setting) => {
    const titleText = document.createElement("span");
    titleText.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_title");
    titleText.textContent = title;
    leftSide.append(titleText);

    const checkbox = document.createElement("input");
    checkbox.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = REWS_PD4.addons[addonName].settings[setting];
    checkbox.addEventListener("change", () => {
        REWS_PD4.addons[addonName].settings[setting] = checkbox.checked;
        localStorage.setItem(identifier + "-settings", JSON.stringify(REWS_PD4.addons[addonName].settings));
    });
    rightSide.append(checkbox);
}