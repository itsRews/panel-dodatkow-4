(() => {
    const ADDON_NAME = "EasyGroup";
    const ADDON_SHORTCUT = "EG";

    const IDENTIFIER = REWS_PD4.globals.identifier + `-${ADDON_NAME}`;
    let SETTINGS_BODY = null;
    let ADDON_WINDOW_BODY = null;
    let PROFESSION_WINDOW_INTERVAL = null;


    REWS_PD4.addons["EasyGroup"] = {
        clickedOnMainPanel() {
            const title = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_title");
            const content = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_content");
            REWS_PD4.functions.removeAllChildren(content);

            title.textContent = "EasyGroup";

            const newContent = document.createElement("div");
            newContent.classList.add(REWS_PD4.globals.identifier + "-main" + "-page_layout");

            const descriptionTitle = "Opis"
            const descriptionText = "Dodatek który ułatwia tworzenie grupy z wszystkich osób na mapie."
            REWS_PD4.functions.templates.createPageSection(newContent, descriptionTitle, descriptionText);

            const windowTitle = "Okienko"
            const windowText = "W okienku są dwa przyciski do zapraszania, docelowo używane do zapraszania graczy gdy jesteś na telefonie. Dodatkowo, okienko opcje pokazywania graczy zależnie od ich profesji, a po kliknięciu zaprasza danego gracza."
            REWS_PD4.functions.templates.createPageSection(newContent, windowTitle, windowText);

            const buttonBundle = document.createElement("div");
            buttonBundle.classList.add(REWS_PD4.globals.identifier + "-addons" + "-button_bundle");
            content.append(buttonBundle);

            REWS_PD4.functions.templates.createAddonButton(buttonBundle, "> Ustawienia dodatku", () => {
                const settingsIsCreated = localStorage.getItem(IDENTIFIER + "-settings" + "-isCreated");
                if (settingsIsCreated === "true") {
                    localStorage.setItem(IDENTIFIER + "-settings" + "-isCreated", "false");

                    closeSettingsBody();
                } else {
                    localStorage.setItem(IDENTIFIER + "-settings" + "-isCreated", "true");

                    createSettingsBody();
                }
            });

            REWS_PD4.functions.templates.createAddonButton(buttonBundle, "> Okno dodatku", () => {
                const addonWindowIsCreated = localStorage.getItem(IDENTIFIER + "-addon_window" + "-isCreated");
                if (addonWindowIsCreated === "true") {
                    localStorage.setItem(IDENTIFIER + "-addon_window" + "-isCreated", "false");

                    closeAddonWindowBody();
                } else {
                    localStorage.setItem(IDENTIFIER + "-addon_window" + "-isCreated", "true");

                    createAddonWindowBody();
                }
            });

            content.append(newContent);
        }
    };

    (function setupKeybinds() {
        const defaultKeybinds = {
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
        };

        const keybindsJson = localStorage.getItem(IDENTIFIER + "-keybinds");
        if (keybindsJson === null) {
            REWS_PD4.addons[ADDON_NAME].keybinds = defaultKeybinds
            localStorage.setItem(IDENTIFIER + "-keybinds", JSON.stringify(REWS_PD4.addons[ADDON_NAME].keybinds));
        } else {
            REWS_PD4.addons[ADDON_NAME].keybinds = JSON.parse(keybindsJson);

            for (let key in defaultKeybinds) {
                if (REWS_PD4.addons[ADDON_NAME].keybinds[key] === undefined) REWS_PD4.addons[ADDON_NAME].keybinds[key] = defaultKeybinds[key];

                localStorage.setItem(IDENTIFIER + "-keybinds", JSON.stringify(REWS_PD4.addons[ADDON_NAME].keybinds));
            }
        }
    })();

    (function setupSettings() {
        const defaultSettings = {
            "enabled": false,
            "inviteUnknown": false,
            "inviteClanEnemies": false,
            "showMessages": false,
            "showInviteButtons": true,
            "showProfessionButtons": true,
            "showEnemies": false
        };

        const settingsJson = localStorage.getItem(IDENTIFIER + "-settings");
        if (settingsJson === null) {
            REWS_PD4.addons[ADDON_NAME].settings = defaultSettings;
            localStorage.setItem(IDENTIFIER + "-settings", JSON.stringify(REWS_PD4.addons[ADDON_NAME].settings));
        } else {
            REWS_PD4.addons[ADDON_NAME].settings = JSON.parse(settingsJson);

            for (let key in defaultSettings) {
                if (REWS_PD4.addons[ADDON_NAME].settings[key] === undefined) REWS_PD4.addons[ADDON_NAME].settings[key] = defaultSettings[key];

                localStorage.setItem(IDENTIFIER + "-settings", JSON.stringify(REWS_PD4.addons[ADDON_NAME].settings));
            }
        }
    })();

    function createSettingsBody() {
        SETTINGS_BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER + "-settings", `[REWS] ${ADDON_NAME} - Ustawienia`, `[R] ${ADDON_SHORTCUT}-U`, true);

        const content = document.getElementById(IDENTIFIER + "-settings" + "-content");

        const generalSettingsTitle = document.createElement("span");
        generalSettingsTitle.textContent = "- Ogólne -";
        content.append(generalSettingsTitle);

        const combinedContent = document.createElement("div");
        combinedContent.classList.add(REWS_PD4.globals.identifier + "-addons" + "-combined_content");
        content.append(combinedContent);

        const firstLeftSide = document.createElement("div");
        firstLeftSide.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_left_side");
        combinedContent.append(firstLeftSide);

        const firstRightSide = document.createElement("div");
        firstRightSide.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_right_side");
        combinedContent.append(firstRightSide);

        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Włącz:", IDENTIFIER, ADDON_NAME, "enabled");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Zapraszaj obcych:", IDENTIFIER, ADDON_NAME, "inviteUnknown");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Dodawaj wrogów klanu:", IDENTIFIER, ADDON_NAME, "inviteClanEnemies");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Pokazuj komunikaty:", IDENTIFIER, ADDON_NAME, "showMessages");

        const windowSettingsTitle = document.createElement("span");
        windowSettingsTitle.textContent = "- Ustawienia okienka -";
        windowSettingsTitle.style.marginTop = "13px";
        content.append(windowSettingsTitle);

        const secondCombinedContent = document.createElement("div");
        secondCombinedContent.classList.add(REWS_PD4.globals.identifier + "-addons" + "-combined_content");
        content.append(secondCombinedContent);

        const secondLeftSide = document.createElement("div");
        secondLeftSide.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_left_side");
        secondCombinedContent.append(secondLeftSide);

        const secondRightSide = document.createElement("div");
        secondRightSide.classList.add(REWS_PD4.globals.identifier + "-addons" + "-settings_right_side");
        secondCombinedContent.append(secondRightSide);

        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(secondLeftSide, secondRightSide, "Pokazuj przyciski dodawania:", IDENTIFIER, ADDON_NAME, "showInviteButtons");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(secondLeftSide, secondRightSide, "Pokazuj przyciski profesji:", IDENTIFIER, ADDON_NAME, "showProfessionButtons");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(secondLeftSide, secondRightSide, "Pokazuj wrogów:", IDENTIFIER, ADDON_NAME, "showEnemies");

    }

    function createAddonWindowBody() {
        ADDON_WINDOW_BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER + "-addon_window", `[REWS] ${ADDON_NAME}`, `[R] ${ADDON_SHORTCUT}`, true);

        const content = document.getElementById(IDENTIFIER + "-addon_window" + "-content");

        if (REWS_PD4.addons[ADDON_NAME].settings.showInviteButtons) {
            const twoButtons = document.createElement("div");
            twoButtons.classList.add(IDENTIFIER + "-buttons_row");
            content.append(twoButtons);

            REWS_PD4.functions.templates.createEasyGroupButton(twoButtons, "> Zaproś wszystkich", false, () => {
                invitePlayers("map");
            });

            REWS_PD4.functions.templates.createEasyGroupButton(twoButtons, "> Zaproś graczy obok", false, () => {
                invitePlayers("nearby");
            });
        }

        if (REWS_PD4.addons[ADDON_NAME].settings.showProfessionButtons) {
            const buttonsRow = document.createElement("div");
            buttonsRow.classList.add(IDENTIFIER + "-buttons_row");
            content.append(buttonsRow);

            const playerList = document.createElement("div");
            playerList.classList.add(IDENTIFIER + "-player_list");
            content.append(playerList);

            const professions = ["w", "p", "b", "m", "h", "t"];
            for (let profession of professions) {
                REWS_PD4.functions.templates.createButton(buttonsRow, `> ${profession}`, false, () => {
                    if (PROFESSION_WINDOW_INTERVAL !== null) clearInterval(PROFESSION_WINDOW_INTERVAL);

                    renderPlayersByProfession(playerList, profession);

                    PROFESSION_WINDOW_INTERVAL = setInterval(renderPlayersByProfession, 500, playerList, profession);
                });
            }
            renderPlayersByProfession(playerList, "w");
        }
    }

    function closeSettingsBody() {
        if (SETTINGS_BODY === null) return;

        SETTINGS_BODY.remove();
        SETTINGS_BODY = null;
    }

    function closeAddonWindowBody() {
        if (ADDON_WINDOW_BODY === null) return;

        ADDON_WINDOW_BODY.remove();
        ADDON_WINDOW_BODY = null;
    }


    (function initialize() {
        if (localStorage.getItem(IDENTIFIER + "-settings" + "-isCreated") === "true") createSettingsBody();
        if (localStorage.getItem(IDENTIFIER + "-addon_window" + "-isCreated") === "true") createAddonWindowBody();
    })();

    //profession buttons
    function renderPlayersByProfession(parent, profession) {
        REWS_PD4.functions.removeAllChildren(parent);

        Object.values(Engine.others.check()).forEach(player => {
            if (player.d.prof !== profession) return;
            if (player.d.relation === 3) return;
            if (player.d.stasis === 1) return;

            if (!REWS_PD4.addons[ADDON_NAME].settings.showEnemies) {
                if (player.d.relation === 1 || player.d.relation === 7 || player.d.relation === 6) return;
            }

            REWS_PD4.functions.templates.createButton(parent, `> ${player.d.nick} ${player.d.lvl}${player.d.prof}`, false, () => {
                _g(`party&a=inv&id=${player.d.id}`);
            });
        });
    }

    //addon
    document.addEventListener("keyup", event => {
        if (["INPUT", "TEXTAREA", "MAGIC_INPUT"].includes(event.target.tagName)) return;
        if (!REWS_PD4.addons[ADDON_NAME].settings.enabled) return;

        if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["mapInvite"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["mapInvite"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["mapInvite"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["mapInvite"].alt
        ) checkPermissions("map");
        else if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["nearbyInvite"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["nearbyInvite"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["nearbyInvite"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["nearbyInvite"].alt
        ) checkPermissions("nearby");
    });

    function checkPermissions(inviteType) {
        const groupExists = Engine.party !== undefined && Engine.party.isParty();

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

                if (REWS_PD4.addons[ADDON_NAME].settings.inviteUnknown && (player.d.relation === 1 || player.d.relation === 7)) _g(`party&a=inv&id=${player.d.id}`);
                if (REWS_PD4.addons[ADDON_NAME].settings.inviteClanEnemies && player.d.relation === 6) _g(`party&a=inv&id=${player.d.id}`);
            }
        });
    }
})();