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

    (function loadSettings() {
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
            },
            "thirteenAwayInvite": {
                "action": "Zaprasza do grupy sojuszników 13 kratek od ciebie.",
                "shift": false,
                "ctrl": true,
                "alt": false,
                "code": "KeyV"
            },
            "disbandGroup": {
                "action": "Rozwiązuje grupe której jesteś dowódcą.",
                "shift": true,
                "ctrl": false,
                "alt": false,
                "code": "KeyB"
            },
            "leaveGroup": {
                "action": "Wychodzi z grupy w której jesteś członkiem.",
                "shift": true,
                "ctrl": false,
                "alt": false,
                "code": "KeyB"
            }
        };

        const defaultSettings = {
            "enabled": false,
            "inviteUnknown": false,
            "inviteClanEnemies": false,
            "showInviteButtons": true,
            "showProfessionButtons": true,
            "showGroupMembers": false,
            "showEnemies": false
        };

        REWS_PD4.functions.loadSettings(defaultKeybinds, defaultSettings, IDENTIFIER, ADDON_NAME);
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
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(secondLeftSide, secondRightSide, "Pokazuj członków grupy:", IDENTIFIER, ADDON_NAME, "showGroupMembers");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(secondLeftSide, secondRightSide, "Pokazuj wrogów:", IDENTIFIER, ADDON_NAME, "showEnemies");

    }

    function createAddonWindowBody() {
        ADDON_WINDOW_BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER + "-addon_window", `[REWS] ${ADDON_NAME}`, `[R] ${ADDON_SHORTCUT}`, true);

        const content = document.getElementById(IDENTIFIER + "-addon_window" + "-content");

        if (REWS_PD4.addons[ADDON_NAME].settings.showInviteButtons) {
            const twoButtons = document.createElement("div");
            twoButtons.classList.add(REWS_PD4.globals.identifier + "-addons" + "-buttons_row");
            content.append(twoButtons);

            REWS_PD4.functions.templates.createAddonWindowButton(twoButtons, "> Zaproś wszystkich", () => {
                invitePlayers("map");
            });

            REWS_PD4.functions.templates.createAddonWindowButton(twoButtons, "> Zaproś graczy obok", () => {
                invitePlayers("nearby");
            });
        }

        if (REWS_PD4.addons[ADDON_NAME].settings.showProfessionButtons) {
            const buttonsRow = document.createElement("div");
            buttonsRow.classList.add(REWS_PD4.globals.identifier + "-addons" + "-buttons_row");
            content.append(buttonsRow);

            const playerListTitle = document.createElement("span");
            playerListTitle.textContent = "- Lista graczy z daną profesją -";
            playerListTitle.style.marginTop = "10px";
            content.append(playerListTitle);

            const playerList = document.createElement("div");
            playerList.classList.add(REWS_PD4.globals.identifier + "-addons" + "-player_list_scrollable");
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

            let playerPrefix = "[";

            if (player.getKind() === "group") {
                if (!REWS_PD4.addons[ADDON_NAME].settings.showGroupMembers) return;
                playerPrefix += "G";
            }

            playerPrefix += "]";

            if (playerPrefix === "[]") playerPrefix = "";

            if (!REWS_PD4.addons[ADDON_NAME].settings.showEnemies) {
                if (player.d.relation === 1 || player.d.relation === 7 || player.d.relation === 6) return;
            }

            REWS_PD4.functions.templates.createButton(parent, `> ${playerPrefix} ${player.d.nick} ${player.d.lvl}${player.d.prof}`, false, () => {
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
        else if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["thirteenAwayInvite"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["thirteenAwayInvite"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["thirteenAwayInvite"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["thirteenAwayInvite"].alt
        ) checkPermissions("thirteenAway");
        else if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["disbandGroup"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["disbandGroup"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["disbandGroup"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["disbandGroup"].alt
        ) disbandOrLeave("disband");
        else if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["leaveGroup"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["leaveGroup"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["leaveGroup"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["leaveGroup"].alt
        ) disbandOrLeave("leave");
    });

    let HERO_IS_LEADER = false;
    let HERO_HAS_PARTY = false;
    let PLAYER_COUNT = 0;
    function checkGroupState() {
        (e => {
            Engine.communication.dispatcher.on_party = function(...args){
                HERO_HAS_PARTY = !!args[0].members;

                if (args[0].members) {
                    PLAYER_COUNT = Object.keys(args[0].members).length;

                    Object.values(args[0].members).forEach(member => {
                        if (member.account !== Engine.hero.d.account) return;
                        HERO_IS_LEADER = member.hasOwnProperty("commander") && member.commander === 1;
                    });
                }
                e.apply(this,args);
            }
        })(Engine.communication.dispatcher.on_party)
    }
    checkGroupState();


    function disbandOrLeave(action) {

        if (!HERO_HAS_PARTY) return;

        if (action === "disband") {

            if (!HERO_IS_LEADER) return;

            _g('party&a=disband');

        } else if (action === "leave") {

            if (HERO_IS_LEADER) {

                let newLeaderId;
                Engine.party.getMembers().values().some(player => {
                    if (player.isHero === true) return false;

                    newLeaderId = player.accountId;
                    return true;
                });

                _g(`party&a=give&id=${newLeaderId}`);
                return;
            }

            _g(`party&a=rm&id=${Engine.hero.d.id}`);
        }
    }

    function checkPermissions(inviteType) {
        if (HERO_HAS_PARTY) {
            if (!HERO_IS_LEADER) {
                return;
            }

            if (PLAYER_COUNT === 10) {
                return;
            }
        }

        invitePlayers(inviteType);
    }

    function invitePlayers(inviteType) {
        Object.values(Engine.others.check()).forEach(player => {
            let cancelInviting = false;

            if (player.getKind() === "group") return;

            if (player.getEmoLength() > 0) {
                Object.values(player.getOnSelfEmoList()).forEach(emotion => {
                    if (emotion.name === 'battle' || emotion.name === "stasis") cancelInviting = true;
                });
                if (cancelInviting) return;
            }

            let playerWithinDistance = (Math.abs(Engine.hero.d.x - player.d.x) <= 1 && Math.abs(Engine.hero.d.y - player.d.y) <= 1);
            let thirteenAwayDistance = (Math.abs(Engine.hero.d.x - player.d.x) <= 13 && Math.abs(Engine.hero.d.y - player.d.y) <= 13);

            if (player.d.relation === 2 || player.d.relation === 4 || player.d.relation === 5) {
                if (inviteType === "nearby" && !playerWithinDistance) return;
                if (inviteType === "thirteenAway" && !thirteenAwayDistance) return;
                _g(`party&a=inv&id=${player.d.id}`);
            } else {
                if (playerWithinDistance) return;

                if (REWS_PD4.addons[ADDON_NAME].settings.inviteUnknown && (player.d.relation === 1 || player.d.relation === 7)) _g(`party&a=inv&id=${player.d.id}`);
                if (REWS_PD4.addons[ADDON_NAME].settings.inviteClanEnemies && player.d.relation === 6) _g(`party&a=inv&id=${player.d.id}`);
            }
        });
    }
})();
