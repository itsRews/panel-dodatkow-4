(() => {
    const ADDON_NAME = "SafeAttack";
    const ADDON_SHORTCUT = "SA";

    const IDENTIFIER = REWS_PD4.globals.identifier + `-${ADDON_NAME}`;
    let SETTINGS_BODY = null;
    let ADDON_WINDOW_BODY = null;


    REWS_PD4.addons["SafeAttack"] = {
        clickedOnMainPanel() {
            const title = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_title");
            const content = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_content");
            REWS_PD4.functions.removeAllChildren(content);

            title.textContent = "SafeAttack";

            const newContent = document.createElement("div");
            newContent.classList.add(REWS_PD4.globals.identifier + "-main" + "-page_layout");

            const descriptionTitle = "Opis"
            const descriptionText = "Dodatek który atakuje przeciwników obok ciebie, bez atakowania sojuszników."
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
            "attack": {
                "action": "Przycisk do atakowania.",
                "shift": false,
                "ctrl": false,
                "alt": false,
                "code": "KeyX"
            }
        };

        const defaultSettings = {
            "enabled": false,
            "showMessages": false
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
    }

    function createAddonWindowBody() {
        ADDON_WINDOW_BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER + "-addon_window", `[REWS] ${ADDON_NAME}`, `[R] ${ADDON_SHORTCUT}`, true);

        const content = document.getElementById(IDENTIFIER + "-addon_window" + "-content");

        REWS_PD4.functions.templates.createSingleAddonWindowButton(content, "> Atakuj", () => {
            attack();
        });
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

        if (Engine.hotKeys.hotKeys["X"] !== undefined) {
            mAlert(`WAŻNE! NIE POMIJAJ TEGO! <br><br>
            Dodatek [REWS] SafeAttack domyślnie używa przycisku "x" do atakowania wrogów. <br><br>
            Dodatek automatycznie odbinduje wbudowanie w Konfiguracji Margonem atakowanie.
            
            `, [{
                txt: "Ok",
                callback: function() {
                    Engine.hotKeys.changeKey("hotAttackNearPlayer", undefined, () => {});
                    return 1;
                }
            }, {
                txt: "Wyjaśnienie",
                callback: function() {
                    mAlert(`WAŻNE! NIE POMIJAJ TEGO! <br><br>
                    [REWS] SafeAttack używa osobnego systemu atakowania od tego wbudowanego Margonem. <br><br>
                    Z tego powodu, w przypadku posiadania dwóch bindów do atakowania (bind z dodatku ORAZ z konfiguracji) dodatek zaatakuje tylko wrogów, ale wbudowane atakowanie z konfiguracji zaatakuje KAŻDEGO gracza obok ciebie.
                    `, [{
                        txt: "Ok - Odbinduj atakowanie w Konfiguracji",
                        callback: function() {
                            Engine.hotKeys.changeKey("hotAttackNearPlayer", undefined, () => {
                                return 1;
                            });
                            return 1;
                        }
                    }]);
                    return 1;
                }
            }]);
        }
    })();



    //addon
    document.addEventListener("keyup", event => {
        if (["INPUT", "TEXTAREA", "MAGIC_INPUT"].includes(event.target.tagName)) return;
        if (!REWS_PD4.addons[ADDON_NAME].settings.enabled) return;

        if (
            event.code === REWS_PD4.addons[ADDON_NAME].keybinds["attack"].code &&
            event.shiftKey === REWS_PD4.addons[ADDON_NAME].keybinds["attack"].shift &&
            event.ctrlKey === REWS_PD4.addons[ADDON_NAME].keybinds["attack"].ctrl &&
            event.altKey === REWS_PD4.addons[ADDON_NAME].keybinds["attack"].alt
        ) attack();
    });


    function attack() {
        if (REWS_PD4.addons[ADDON_NAME].settings.showMessages) message("[R] SA: Atakowanie wrogów.");

        Object.values(Engine.others.check()).forEach(player => {
            if (!(Math.abs(Engine.hero.d.x - player.d.x) <= 2 && Math.abs(Engine.hero.d.y - player.d.y) <= 2)) return;

            if (player.d.relation === 1 || player.d.relation === 3 || player.d.relation === 6 || player.d.relation === 8) {
                let cancelAttacking = false;

                if (player.getEmoLength() > 0) {
                    Object.values(player.getOnSelfEmoList()).forEach(emotion => {
                        if (emotion.type === "battle" || emotion.type === "pvpprotected") cancelAttacking = true;
                    });
                    if (cancelAttacking) return;
                }

                _g(`fight&a=attack&id=${player.d.id}`);
            }
        });
    }
})();