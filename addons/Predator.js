(() => {
    const ADDON_NAME = "Predator";
    const ADDON_SHORTCUT = "PR";

    const IDENTIFIER = REWS_PD4.globals.identifier + `-${ADDON_NAME}`;
    let SETTINGS_BODY = null;
    let ADDON_WINDOW_BODY = null;
    const SELECTED_PLAYERS_TITLE = document.createElement("span");
    let SELECTED_PLAYER_ID = null;
    let SELECTED_PLAYER_DATA = null;


    REWS_PD4.addons["Predator"] = {
        clickedOnMainPanel() {
            const title = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_title");
            const content = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_content");
            REWS_PD4.functions.removeAllChildren(content);

            title.textContent = "Predator";

            const newContent = document.createElement("div");
            newContent.classList.add(REWS_PD4.globals.identifier + "-main" + "-page_layout");

            const descriptionTitle = "Opis"
            const descriptionText = "Dobijara, dodatek do łapania pojedyńczego przyciwnika."
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
            "selectNearest": {
                "action": "Przycisk do zaznaczenia dobijania na najbliższą osobe.",
                "shift": true,
                "ctrl": false,
                "alt": false,
                "code": "Space"
            },
            "cancelSelection": {
                "action": "Przycisk do zakończenia dobijania.",
                "shift": false,
                "ctrl": true,
                "alt": false,
                "code": "Space"
            }
        };

        const defaultSettings = {
            "enabled": false,
            "showMessages": false,
            "testDistanceOne": false,
            "testDistanceThree": true,
            "testDelayThreeHundred": false,
            "testDelayNone": true,
            "testCheckingFifty": false,
            "testCheckingWebsocket": true
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
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Pokazuj komunikaty:", IDENTIFIER, ADDON_NAME, "showMessages");

        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "TEST: dystans 1:", IDENTIFIER, ADDON_NAME, "testDistanceOne");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "TEST: dystans 3:", IDENTIFIER, ADDON_NAME, "testDistanceThree");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "TEST: opóźnienie 300:", IDENTIFIER, ADDON_NAME, "testDelayThreeHundred");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "TEST: opóźnienie brak:", IDENTIFIER, ADDON_NAME, "testDelayNone");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "TEST: checker 50:", IDENTIFIER, ADDON_NAME, "testCheckingFifty");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "TEST: checker WS:", IDENTIFIER, ADDON_NAME, "testCheckingWebsocket");



    }

    function createAddonWindowBody() {
        ADDON_WINDOW_BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER + "-addon_window", `[REWS] ${ADDON_NAME}`, `[R] ${ADDON_SHORTCUT}`, true);

        const content = document.getElementById(IDENTIFIER + "-addon_window" + "-content");

        const twoButtons = document.createElement("div");
        twoButtons.classList.add(REWS_PD4.globals.identifier + "-addons" + "-buttons_row");
        content.append(twoButtons);

        REWS_PD4.functions.templates.createAddonWindowButton(twoButtons, "> Dobijaj najbliższego", () => {
            selectNearestPlayer()
        });

        REWS_PD4.functions.templates.createAddonWindowButton(twoButtons, "> Anuluj dobijanie", () => {
            cancelSelection()
        });


        const twoTexts = document.createElement("div");
        twoTexts.classList.add(REWS_PD4.globals.identifier + "-vertical-row");
        content.append(twoTexts);

        const selectedPlayerTitle = document.createElement("span");
        selectedPlayerTitle.textContent = "Obecnie dobijany gracz:"
        twoTexts.append(selectedPlayerTitle);


        SELECTED_PLAYERS_TITLE.textContent = "-";
        twoTexts.append(SELECTED_PLAYERS_TITLE);


        const playerListTitle = document.createElement("span");
        playerListTitle.textContent = "- Gracze do dobijania -";
        playerListTitle.style.marginTop = "10px";
        content.append(playerListTitle);

        const playerList = document.createElement("div");
        playerList.classList.add(REWS_PD4.globals.identifier + "-addons" + "-player_list_scrollable");
        content.append(playerList);

        setInterval(() => {
            renderPlayers(playerList);
        }, 1000);
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




    function renderPlayers(playerList) {
        REWS_PD4.functions.removeAllChildren(playerList);

        Object.values(Engine.others.check()).forEach(player => {
            if (player.d.relation === 2 || player.d.relation === 4 || player.d.relation === 5 || player.d.relation === 7) return;

            let battleIndicator = "";

            if (player.getEmoLength() > 0) {
                Object.values(player.getOnSelfEmoList()).forEach(emotion => {
                    if (emotion.type === "battle" || emotion.type === "pvpprotected") battleIndicator = "[W]";
                });
            }

            REWS_PD4.functions.templates.createButton(playerList, `> ${battleIndicator} ${player.d.nick} ${player.d.lvl}${player.d.prof}`, false, () => {
                selectPlayer(player.d.id, player.d.nick);
            });
        });
    }



    let limited = false;
    let allowDistance = 2;
    let allowMoveDistance = 0;
    let testDelay = 0;
    let cancelAttacking = false;
    let allowAttacking = true;
    let attackTried = 0;

    //addon
    document.addEventListener("keyup", event => {
        if (["INPUT", "TEXTAREA", "MAGIC_INPUT"].includes(event.target.tagName)) return;
        if (!REWS_PD4.addons[ADDON_NAME].settings.enabled) return;

        if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["selectNearest"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["selectNearest"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["selectNearest"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["selectNearest"].alt
        ) selectNearestPlayer();
        else if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["cancelSelection"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["cancelSelection"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["cancelSelection"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["cancelSelection"].alt
        ) cancelSelection();
    });

    function selectNearestPlayer() {
        let nearestPlayerId = null;
        let nearestPlayerDistance = 999999;
        let nearestPlayerName = null;
        let newPlayerCount = 0;

        Object.values(Engine.others.check()).forEach(player => {
            if (player.d.relation === 2 || player.d.relation === 4 || player.d.relation === 5 || player.d.relation === 7) return;
            newPlayerCount++;

            let currentPlayerDistance = (Math.abs(Engine.hero.d.x - player.d.x) + Math.abs(Engine.hero.d.y - player.d.y));

            if (nearestPlayerDistance > currentPlayerDistance) {
                nearestPlayerId = player.d.id;
                nearestPlayerDistance = currentPlayerDistance;
                nearestPlayerName = player.d.nick;
            }
        });

        if (newPlayerCount === 0) return;
        selectPlayer(nearestPlayerId, nearestPlayerName);
    }

    function cancelSelection() {
        SELECTED_PLAYERS_TITLE.textContent = "-";
        SELECTED_PLAYER_DATA = null;
        SELECTED_PLAYER_ID = null;
    }



    function selectPlayer(id, nick) {
        SELECTED_PLAYERS_TITLE.textContent = nick;
        SELECTED_PLAYER_ID = id;
        message(`Rozpoczęto dobijanie gracza ${nick}`);
    }

    function fetchPlayerData() {
        if (REWS_PD4.addons[ADDON_NAME].settings.testDistanceOne) allowMoveDistance = 1;
        else if (REWS_PD4.addons[ADDON_NAME].settings.testDistanceThree) allowMoveDistance = 3;

        if (SELECTED_PLAYER_ID === null) return;

        let fetchedData = Engine.others.getById(SELECTED_PLAYER_ID);
        if (fetchedData === undefined) {
            SELECTED_PLAYER_DATA = null;
            return;
        }
        SELECTED_PLAYER_DATA = fetchedData;
    }

    setInterval(fetchPlayerData, 100);

    function attacking() {
        cancelAttacking = false;
        limited = false;

        if (SELECTED_PLAYER_DATA === null) return;

        if (SELECTED_PLAYER_DATA.inMove === true) allowDistance = allowMoveDistance;
        else allowDistance = 2;

        if (!(Math.abs(Engine.hero.d.x - SELECTED_PLAYER_DATA.d.x) <= allowDistance && Math.abs(Engine.hero.d.y - SELECTED_PLAYER_DATA.d.y) <= allowDistance)) return;

        if (SELECTED_PLAYER_DATA.getOnSelfEmoList().length > 0) {
            Object.values(SELECTED_PLAYER_DATA.getOnSelfEmoList()).forEach(emotion => {
                if (emotion.type === "battle") cancelAttacking = true;
                else if (emotion.type === "pvpprotected") limited = true;
            });
        }

        if (cancelAttacking) return;
        if (!allowAttacking) return;
        if (limited && attackTried >= 1) return;

        attackTried++;

        setTimeout(() => {

            window._g(`fight&a=attack&id=${SELECTED_PLAYER_ID}`);

            if (attackTried >= 2) allowAttacking = false;

            setTimeout(() => {
                attackTried--;

                if (attackTried < 2) allowAttacking = true;
            }, 2000);

        }, testDelay);
    }


    if (REWS_PD4.addons[ADDON_NAME].settings.testDelayThreeHundred) testDelay = 300;
    if (REWS_PD4.addons[ADDON_NAME].settings.testDelayNone) testDelay = 0;

    if (REWS_PD4.addons[ADDON_NAME].settings.testCheckingFifty) setInterval(attacking, 50);
    if (REWS_PD4.addons[ADDON_NAME].settings.testCheckingWebsocket) {
        let existingFunction = Engine.communication.onMessageWebSocket;
        Engine.communication.onMessageWebSocket = function (event) {
            existingFunction.apply(this, arguments);
            attacking();
        }
    }
})();