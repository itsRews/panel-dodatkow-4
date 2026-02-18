(() => {
    const ADDON_NAME = "GroupClan";
    const ADDON_SHORTCUT = "GC";

    const IDENTIFIER = REWS_PD4.globals.identifier + `-${ADDON_NAME}`;
    let SETTINGS_BODY = null;
    let ADDON_WINDOW_BODY = null;
    let PRIORITY_LIST = [];


    REWS_PD4.addons["GroupClan"] = {
        clickedOnMainPanel() {
            const title = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_title");
            const content = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_content");
            REWS_PD4.functions.removeAllChildren(content);

            title.textContent = "GroupClan";

            const newContent = document.createElement("div");
            newContent.classList.add(REWS_PD4.globals.identifier + "-main" + "-page_layout");

            const descriptionTitle = "Opis"
            const descriptionText = "Dodatek dodaje do grupy wszystkich graczy w klanie którzy są online."
            REWS_PD4.functions.templates.createPageSection(newContent, descriptionTitle, descriptionText);

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
            "clanInvite": {
                "action": "Zaprasza do grupy klanowiczy online.",
                "shift": false,
                "ctrl": false,
                "alt": false,
                "code": "KeyN"
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
            "mapPriority": true,
            "playerPriority": false,
            "removeAlerts": true,
            "showMessages": false
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
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Priorytet osób na mapie:", IDENTIFIER, ADDON_NAME, "mapPriority");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Priorytet dla wyznaczonych osób:", IDENTIFIER, ADDON_NAME, "playerPriority");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Usuwaj komunikaty:", IDENTIFIER, ADDON_NAME, "removeAlerts");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Pokazuj komunikaty:", IDENTIFIER, ADDON_NAME, "showMessages");
    }

    function createAddonWindowBody() {
        ADDON_WINDOW_BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER + "-addon_window", `[REWS] ${ADDON_NAME}`, `[R] ${ADDON_SHORTCUT}`, true);

        const content = document.getElementById(IDENTIFIER + "-addon_window" + "-content");

        REWS_PD4.functions.templates.createSingleAddonWindowButton(content, "> Zaproś klanowiczy", () => {
            checkPermissions();
        });

        if (REWS_PD4.addons[ADDON_NAME].settings.playerPriority) {
            const buttonsRow = document.createElement("div");
            buttonsRow.classList.add(IDENTIFIER + "-buttons_row");
            content.append(buttonsRow);

            const playerListTitle = document.createElement("span");
            playerListTitle.textContent = "- -";
            playerListTitle.style.marginTop = "10px";
            content.append(playerListTitle);

            const playerList = document.createElement("div");
            playerList.classList.add(IDENTIFIER + "-player_list_scrollable");
            content.append(playerList);

            const options = ["addPriority", "clearPriority", "removePriority"];
            for (let option of options) {
                REWS_PD4.functions.templates.createButton(buttonsRow, `> ${option}`, false, () => {
                    renderPlayersByOption(playerList, option);
                });
            }
            renderPlayersByOption(playerList, "listPriority");
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

        (function initializeClan() {
            let clan = Engine.clan ? { ...Engine.clan } : Engine.clan;
            if (!clan) {
                Engine.clan = {
                    updateMembers(){}
                };
            }
        })();
    })();

    function renderPlayersByOption(parent, option) {
        REWS_PD4.functions.removeAllChildren(parent);

        switch (option) {
            case "addPriority":
                _g(`clan&a=members`, callback => {
                    let members = callback.members;

                    let priorityMembers = [];
                    let clanMembers = [];
                    let currentMember = [];

                    for (let i = 0; i < members.length; i++) {
                        currentMember.push(members[i]);

                        if (currentMember.length === 11) {
                            if (PRIORITY_LIST.includes(currentMember[0])) priorityMembers.push(currentMember);
                            else clanMembers.push(currentMember);
                            currentMember = [];
                        }
                    }

                    for (let j = 0; j < clanMembers.length; j++) {
                        REWS_PD4.functions.templates.createButton(parent, `> ${clanMembers[j][1]} ${clanMembers[j][2]}${clanMembers[j][4]}`, false, () => {
                            PRIORITY_LIST.push(clanMembers[j][0]);
                        });
                    }
                });
                break;

            case "clearPriority":
                PRIORITY_LIST = [];
                break;

            case "removePriority":
                _g(`clan&a=members`, callback => {
                    let members = callback.members;

                    let priorityMembers = [];
                    let clanMembers = [];
                    let currentMember = [];

                    for (let i = 0; i < members.length; i++) {
                        currentMember.push(members[i]);

                        if (currentMember.length === 11) {
                            if (PRIORITY_LIST.includes(currentMember[0])) priorityMembers.push(currentMember);
                            else clanMembers.push(currentMember);
                            currentMember = [];
                        }
                    }

                    for (let j = 0; j < priorityMembers.length; j++) {
                        REWS_PD4.functions.templates.createButton(parent, `> ${clanMembers[j][1]} ${clanMembers[j][2]}${clanMembers[j][4]}`, false, () => {
                            PRIORITY_LIST[PRIORITY_LIST.indexOf(priorityMembers[j][0])] = undefined;
                        });
                    }
                });
                break;
        }
    }



    //addon
    document.addEventListener("keyup", event => {
        if (["INPUT", "TEXTAREA", "MAGIC_INPUT"].includes(event.target.tagName)) return;
        if (!REWS_PD4.addons[ADDON_NAME].settings.enabled) return;

        if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["clanInvite"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["clanInvite"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["clanInvite"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["clanInvite"].alt
        ) checkPermissions();
    });

    function checkPermissions() {
        const groupExists = Engine.party !== undefined && Engine.party.isParty();

        if (groupExists) {
            let isLeader = false;
            let playerCount = 0;

            Engine.party.getMembers().forEach(member => {
                if (member.isHero && member.leader) isLeader = true;
                playerCount++;
            });

            if (!isLeader) {
                if (REWS_PD4.addons[ADDON_NAME].settings.showMessages) message("[R] GC: Nie jesteś dowódcą grupy.");
                return;
            }

            if (playerCount === 10) {
                if (REWS_PD4.addons[ADDON_NAME].settings.showMessages) message("[R] GC: Grupa jest pełna.");
                return;
            }
        }

        invitePlayers();
    }

    let inviteCooldown = false;
    function invitePlayers() {
        if (inviteCooldown) return;
        inviteCooldown = true;

        if (REWS_PD4.addons[ADDON_NAME].settings.showMessages) message("[R] GC: Rozpoczęto zapraszanie graczy...");

        if (REWS_PD4.addons[ADDON_NAME].settings.mapPriority) inviteOnMap();

        _g(`clan&a=members`, callback => {
            let members = callback.members;

            let priorityMembers = [];
            let clanMembers = [];
            let currentMember = [];

            for (let i = 0; i < members.length; i++) {
                currentMember.push(members[i]);

                if (currentMember.length === 11) {
                    if (PRIORITY_LIST.includes(currentMember[0])) priorityMembers.push(currentMember);
                    else clanMembers.push(currentMember);
                    currentMember = [];
                }
            }

            for (let i = 0; i < clanMembers.length; i++) {
                if (priorityMembers[i][9] === 0) _g(`party&a=inv&id=${clanMembers[i][0]}`);
            }

            for (let j = 0; j < clanMembers.length; j++) {
                if (clanMembers[j][9] === 0) _g(`party&a=inv&id=${clanMembers[j][0]}`);
            }

            setTimeout(() => {inviteCooldown = false;}, 1000);
        });
    }

    function inviteOnMap() {
        Object.values(Engine.others.check()).forEach(player => {
            let cancelInviting = false;

            if (player.getKind() === "group") return;

            if (player.getEmoLength() > 0) {
                Object.values(player.getOnSelfEmoList()).forEach(emotion => {
                    if (emotion.name === 'battle' || emotion.name === "stasis") cancelInviting = true;
                });
                if (cancelInviting) return;
            }

            if (player.d.relation === 2 || player.d.relation === 4 || player.d.relation === 5) {
                _g(`party&a=inv&id=${player.d.id}`);
            }
        });
    }
})();