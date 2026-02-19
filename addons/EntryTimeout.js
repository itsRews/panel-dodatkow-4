(() => {
    const ADDON_NAME = "EntryTimeout";
    const ADDON_SHORTCUT = "ET";

    const IDENTIFIER = REWS_PD4.globals.identifier + `-${ADDON_NAME}`;
    let SETTINGS_BODY = null;


    REWS_PD4.addons["EntryTimeout"] = {
        clickedOnMainPanel() {
            const title = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_title");
            const content = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_content");
            REWS_PD4.functions.removeAllChildren(content);

            title.textContent = "EasyGroup";

            const newContent = document.createElement("div");
            newContent.classList.add(REWS_PD4.globals.identifier + "-main" + "-page_layout");

            const descriptionTitle = "Opis"
            const descriptionText = "Dodatek do zapisywania czasu do wejścia na kopalnie."
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

            content.append(newContent);
        }
    };

    (function loadSettings() {
        const defaultKeybinds = {};

        const defaultSettings = {
            "enabled": false,
            "300": true,
            "114": true,
            "83": true,
            "64": true,
            "43": true

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
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Kopalnia 300:", IDENTIFIER, ADDON_NAME, "300");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Kopalnia 114:", IDENTIFIER, ADDON_NAME, "114");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Kopalnia 83:", IDENTIFIER, ADDON_NAME, "83");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Kopalnia 64:", IDENTIFIER, ADDON_NAME, "64");
        REWS_PD4.functions.templates.createAddonSettingsTitleCheckbox(firstLeftSide, firstRightSide, "Kopalnia 43:", IDENTIFIER, ADDON_NAME, "43");
    }

    function closeSettingsBody() {
        if (SETTINGS_BODY === null) return;

        SETTINGS_BODY.remove();
        SETTINGS_BODY = null;
    }


    (function initialize() {
        if (localStorage.getItem(IDENTIFIER + "-settings" + "-isCreated") === "true") createSettingsBody();
    })();



    //addon
    let lastMap = "";
    let serverMessage = Engine.communication.onMessageWebSocket;
    Engine.communication.onMessageWebSocket = function(event) {
        serverMessage.apply(this, arguments);
        const eventData = JSON.parse(event.data);

        if (eventData.town) {
            if (!lastMap.includes(" - pułapka")) {
                switch (eventData.town.name) {
                    case "Kopalnia Krwawej Pychy":
                        Engine.addonsPanel.getList().addon_17.add(Engine.hero.d.nick + ' - Kopalnia (300)', 600);
                        break;

                    case "Kopalnia Krwawej Arogancji":
                        Engine.addonsPanel.getList().addon_17.add(Engine.hero.d.nick + ' - Kopalnia (114)', 600);
                        break;

                    case "Kopalnia Krwawego Opętania":
                        Engine.addonsPanel.getList().addon_17.add(Engine.hero.d.nick + ' - Kopalnia (83)', 600);
                        break;

                    case "Kopalnia Krwawego Szaleństwa":
                        Engine.addonsPanel.getList().addon_17.add(Engine.hero.d.nick + ' - Kopalnia (64)', 600);
                        break;

                    case "Kopalnia Krwawej Zemsty":
                        Engine.addonsPanel.getList().addon_17.add(Engine.hero.d.nick + ' - Kopalnia (43)', 600);
                        break;
                }
            }

            lastMap = eventData.town.name;
        }
    }
})();