(() => {
    const ADDON_NAME = "EasyGroup";
    const ADDON_SHORTCUT = "EG";

    const IDENTIFIER = REWS_PD4.globals.identifier + `-${ADDON_NAME}`;
    let SETTINGS_BODY = null;
    let ADDON_WINDOW_BODY = null;


    REWS_PD4.addons["EasyGroup"] = {
        clickedOnMainPanel() {
            //sets up the right-side content page.
            const title = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_title");
            const content = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_content");
            REWS_PD4.functions.removeAllChildren(content);

            title.textContent = "EasyGroup";

            const newContent = document.createElement("div");
            newContent.classList.add(REWS_PD4.globals.identifier + "-main" + "-page_layout");

            const descriptionTitle = "Opis"
            const descriptionText = "Dodatek który ułatwia tworzenie grupy z wszystkich osób na mapie."
            REWS_PD4.functions.templates.createPageSection(newContent, descriptionTitle, descriptionText);

            const buttonBundle = document.createElement("div");
            buttonBundle.classList.add(REWS_PD4.globals.identifier + "-addons" + "-button_bundle");
            content.append(buttonBundle);

            REWS_PD4.functions.templates.createAddonButton(buttonBundle, "> Ustawienia dodatku", () => {
                const settingsIsCreated = localStorage.getItem(IDENTIFIER + "-settings" + "-isCreated");
                if (settingsIsCreated === "true") {
                    localStorage.setItem(IDENTIFIER + "-settings" + "-isCreated", "false");

                    closeBody(SETTINGS_BODY);
                } else {
                    localStorage.setItem(IDENTIFIER + "-settings" + "-isCreated", "true");

                    createSettingsBody();
                }
            });

            REWS_PD4.functions.templates.createAddonButton(buttonBundle, "> Okno dodatku", () => {
                const addonWindowIsCreated = localStorage.getItem(IDENTIFIER + "-addon_window" + "-isCreated");
                if (addonWindowIsCreated === "true") {
                    localStorage.setItem(IDENTIFIER + "-addon_window" + "-isCreated", "false");

                    closeBody(ADDON_WINDOW_BODY);
                } else {
                    localStorage.setItem(IDENTIFIER + "-addon_window" + "-isCreated", "true");

                    createAddonWindowBody();
                }
            });

            content.append(newContent);
        }
    };

    (function setupKeybinds() {
        const keybindsJson = localStorage.getItem(IDENTIFIER + "-keybinds");
        if (keybindsJson === null) {
            REWS_PD4.addons[ADDON_NAME].keybinds = {
                "mapInvite": {
                    "action": "Zaprasza do grupy sojuszników na całej mapie.",
                    "shift": false,
                    "ctrl": false,
                    "alt": false,
                    "code": "KeyV"
                },
                "nearbyInvite": {
                    "action": "Zaprasza do grupy sojuszników obok twojej postaci.",
                    "shift": true,
                    "ctrl": false,
                    "alt": false,
                    "code": "KeyV"
                }
            }
            localStorage.setItem(IDENTIFIER + "-keybinds", JSON.stringify(REWS_PD4.addons[ADDON_NAME].keybinds));
        } else {
            REWS_PD4.addons[ADDON_NAME].keybinds = JSON.parse(keybindsJson);
        }
    })();

    (function setupSettings() {
        const settingsJson = localStorage.getItem(IDENTIFIER + "-settings");
        if (settingsJson === null) {
            REWS_PD4.addons[ADDON_NAME].settings = {
                "enabled": false,
                "inviteUnknown": false,
                "inviteClanEnemies": false,
                "showMessages": false
            }
            localStorage.setItem(IDENTIFIER + "-settings", JSON.stringify(REWS_PD4.addons[ADDON_NAME].settings));
        } else {
            REWS_PD4.addons[ADDON_NAME].settings = JSON.parse(settingsJson);
        }
    })();

    function createSettingsBody() {
        SETTINGS_BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER + "-settings", `[REWS] ${ADDON_NAME} - Ustawienia`, `[R] ${ADDON_SHORTCUT}-U`, true);

        const content = document.getElementById(IDENTIFIER + "-settings" + "-content");

        const leftSide = document.createElement("div");
        leftSide.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_left_side");
        content.append(leftSide);

        const rightSide = document.createElement("div");
        rightSide.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_right_side");
        content.append(rightSide);


        const enabledTitle = document.createElement("span");
        enabledTitle.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_title");
        enabledTitle.textContent = "Włącz:";
        leftSide.append(enabledTitle);

        const enabledCheckbox = document.createElement("input");
        enabledCheckbox.classList.add(IDENTIFIER + "-settings_checkbox");
        enabledCheckbox.type = "checkbox";
        enabledCheckbox.checked = REWS_PD4.addons[ADDON_NAME].settings.enabled;
        enabledCheckbox.addEventListener("change", () => {
            REWS_PD4.addons[ADDON_NAME].settings.enabled = enabledCheckbox.checked;
            localStorage.setItem(IDENTIFIER + "-settings", JSON.stringify(REWS_PD4.addons[ADDON_NAME].settings));
        });
        rightSide.append(enabledCheckbox);


        const inviteUnknownTitle = document.createElement("span");
        inviteUnknownTitle.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_title");
        inviteUnknownTitle.textContent = "Zapraszaj obcych:";
        leftSide.append(inviteUnknownTitle);

        const inviteUnknownCheckbox = document.createElement("input");
        inviteUnknownCheckbox.classList.add(IDENTIFIER + "-settings_checkbox");
        inviteUnknownCheckbox.type = "checkbox";
        inviteUnknownCheckbox.checked = REWS_PD4.addons[ADDON_NAME].settings.inviteUnknown;
        inviteUnknownCheckbox.addEventListener("change", () => {
            REWS_PD4.addons[ADDON_NAME].settings.inviteUnknown = inviteUnknownCheckbox.checked;
            localStorage.setItem(IDENTIFIER + "-settings", JSON.stringify(REWS_PD4.addons[ADDON_NAME].settings));
        });
        rightSide.append(inviteUnknownCheckbox);


        const inviteClanEnemiesTitle = document.createElement("span");
        inviteClanEnemiesTitle.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_title");
        inviteClanEnemiesTitle.textContent = "Dodawaj wrogów klanu";
        leftSide.append(inviteClanEnemiesTitle);

        const inviteClanEnemiesCheckbox = document.createElement("input");
        inviteClanEnemiesCheckbox.classList.add(IDENTIFIER + "-settings_checkbox");
        inviteClanEnemiesCheckbox.type = "checkbox";
        inviteClanEnemiesCheckbox.checked = REWS_PD4.addons[ADDON_NAME].settings.inviteClanEnemies;
        inviteClanEnemiesCheckbox.addEventListener("change", () => {
            REWS_PD4.addons[ADDON_NAME].settings.inviteClanEnemies = inviteClanEnemiesCheckbox.checked;
            localStorage.setItem(IDENTIFIER + "-settings", JSON.stringify(REWS_PD4.addons[ADDON_NAME].settings));
        });
        rightSide.append(inviteClanEnemiesCheckbox);

        const showMessagesTitle = document.createElement("span");
        showMessagesTitle.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_title");
        showMessagesTitle.textContent = "Pokazuj komunikaty:";
        leftSide.append(showMessagesTitle);

        const showMessagesCheckbox = document.createElement("input");
        showMessagesCheckbox.classList.add(IDENTIFIER + "-settings_checkbox");
        showMessagesCheckbox.type = "checkbox";
        showMessagesCheckbox.checked = REWS_PD4.addons[ADDON_NAME].settings.showMessages;
        showMessagesCheckbox.addEventListener("change", () => {
            REWS_PD4.addons[ADDON_NAME].settings.showMessages = showMessagesCheckbox.checked;
            localStorage.setItem(IDENTIFIER + "-settings", JSON.stringify(REWS_PD4.addons[ADDON_NAME].settings));
        });
        rightSide.append(showMessagesCheckbox);

    }

    function createAddonWindowBody() {
        ADDON_WINDOW_BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER + "-addon_window", `[REWS] ${ADDON_NAME}`, `[R] ${ADDON_SHORTCUT}`, true);

        const content = document.getElementById(IDENTIFIER + "-addon_window" + "-content");
    }

    function closeBody(bodyType) {
        if (bodyType === null) return;

        bodyType.remove();
        bodyType = null;
    }







    (function initialize() {
        if (localStorage.getItem(IDENTIFIER + "-settings" + "-isCreated") === "true") createSettingsBody();
        if (localStorage.getItem(IDENTIFIER + "-addon_window" + "isCreated") === "true") createAddonWindowBody();
    })();




    (function addon() {


        document.addEventListener("keyup", event => {
            if (["INPUT", "TEXTAREA", "MAGIC_INPUT"].includes(event.target.tagName)) return;
            if (!REWS_PD4.addons[ADDON_NAME].settings.enabled) return;

            if (
                event.key === REWS_PD4.addons[ADDON_NAME].keybinds["mapInvite"].code &&
                event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["mapInvite"].shift &&
                event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["mapInvite"].ctrl &&
                event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["mapInvite"].alt
            ) checkPermissions("map");
            else if (
                event.key === REWS_PD4.addons[ADDON_NAME].keybinds["nearbyInvite"].code &&
                event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["nearbyInvite"].shift &&
                event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["nearbyInvite"].ctrl &&
                event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["nearbyInvite"].alt
            ) checkPermissions("nearby");
        });

        function checkPermissions(inviteType) {
            const groupExists = Engine.party !== undefined || Engine.party.isParty();

            if (groupExists) {
                let isLeader = false;
                let playerCount = 0;

                Engine.party.getMembers().forEach(member => {
                    if (member.isHero && member.leader) isLeader = true;
                    playerCount++;
                });

                if (!isLeader) {
                    if (REWS_PD4.addons[ADDON_NAME].settings.showMessages) message("[R] EG: Nie jesteś dowódcą grupy.");
                    return;
                }

                if (playerCount === 10) {
                    if (REWS_PD4.addons[ADDON_NAME].settings.showMessages) message("[R] EG: Grupa jest pełna.");
                    return;
                }
            }

            invitePlayers(inviteType);
        }

        function invitePlayers(inviteType) {
            if (REWS_PD4.addons[ADDON_NAME].settings.showMessages) message("[R] EG: Rozpoczęto zapraszanie graczy...");
            Object.values(Engine.others.check()).forEach(player => {
                let cancelInviting = false;

                if (player.getKind() === "group") return;

                if (player.getEmoLength() > 0) {
                    Object.values(player.getOnSelfEmoList()).forEach(emotion => {
                        if (emotion.name === 'battle' || emotion.name === "stasis") cancelInviting = true;
                    });
                    if (cancelInviting) return;
                }

                let playerDistance = Math.abs(Engine.hero.d.x - player.d.x) + Math.abs(Engine.hero.d.y - player.d.y);

                if (player.d.relation === 2 || player.d.relation === 4 || player.d.relation === 5) {
                    if (inviteType === "nearby" && playerDistance > 1) return;
                    _g(`party&a=inv&id=${player.d.id}`);
                } else {
                    if (playerDistance > 1) return;

                    if (REWS_PD4.addons[ADDON_NAME].settings.inviteUnknown && (player.d.relation === 1 || player.d.relation === 7)) _g(`party&a=inv&id=${playerData.id}`);
                    if (REWS_PD4.addons[ADDON_NAME].settings.inviteClanEnemies && player.d.relation === 6) _g(`party&a=inv&id=${playerData.id}`);
                }
            });
        }
    })();
})();