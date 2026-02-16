(async() => {
    let IDENTIFIER;

    (async function initialize() {
        const host = document.createElement("div");

        await fetch(`https://itsrews.github.io/panel-dodatkow-4/utils/globals.js?v=${new Date().getTime()}`)
            .then(response => response.text())
            .then(responseText => {
                const script = document.createElement('script');
                script.textContent = responseText;
                host.append(script);
            });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = `${REWS_PD4.globals.url}/main/panel-dodatkow.css?v=${REWS_PD4.globals.date}`;
        host.append(css);

        IDENTIFIER = REWS_PD4.globals.identifier + "-main";
        REWS_PD4.HTML.host = host;
        host.classList.add(REWS_PD4.globals.identifier + "-host");
        document.body.append(REWS_PD4.HTML.host);
    })();

    (function setupMainPanel() {
        REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER, "[REWS] Panel Dodatków 4", "[R] PD4", false);

        const mainPanelContent = document.getElementById(IDENTIFIER + "-content");

        (function setupLeftSide() {
            const leftSide = document.createElement("div");
            leftSide.classList.add(IDENTIFIER + "-left_side");
            mainPanelContent.append(leftSide);

            const search = document.createElement("input");
            search.classList.add(IDENTIFIER + "-search");
            search.placeholder = "Wyszukaj...";
            search.type = "text";
            leftSide.append(search);


            const buttonColumn = document.createElement("div");
            buttonColumn.classList.add(IDENTIFIER + "-button_column");
            leftSide.append(buttonColumn);

            const generalTitle = document.createElement("span");
            generalTitle.textContent = "Ogólne:";
            buttonColumn.append(generalTitle);

            REWS_PD4.functions.templates.createButton(buttonColumn, "> Aktualności", false, rightSideContents("Aktualności"));

            REWS_PD4.functions.templates.createButton(buttonColumn, "> Informacje", false, rightSideContents("Informacje"));

            REWS_PD4.functions.templates.createButton(buttonColumn, "> Keybindy", false, rightSideContents("Keybindy"));


            const addonsTitle = document.createElement("span");
            addonsTitle.textContent = "Dodatki:";
            addonsTitle.classList.add(IDENTIFIER + "-addons_title");
            buttonColumn.append(addonsTitle);

            //
            //
            function fillerButtons() {
                for (let i = 0; i < 10; i++) {
                    const keybinds_button = document.createElement("div");
                    keybinds_button.classList.add(REWS_PD4.globals.identifier + "-button");
                    buttonColumn.append(keybinds_button);

                    const keybinds_label = document.createElement("label");
                    keybinds_label.textContent = `> Addon${i}`;
                    keybinds_button.append(keybinds_label);
                }

            }
            fillerButtons();
            //
        })();

        (function setupRightSide() {
            const rightSide = document.createElement("div");
            rightSide.classList.add(IDENTIFIER + "-right_side");
            mainPanelContent.append(rightSide);

            const contentTitle = document.createElement("span");
            contentTitle.classList.add(IDENTIFIER + "-content_title");
            contentTitle.textContent = "TitleUnloaded";
            rightSide.append(contentTitle);

            let pageContent =  document.createElement("div");
            pageContent.classList.add(IDENTIFIER + "-page_content");
            pageContent.textContent = "ContentUnloaded";
            rightSide.append(pageContent);
        })();

        function rightSideContents(page) {

            switch (page) {
                case "Aktualności": setupNews(); break;

                case "Informacje": setupInfo(); break;

                case "Keybindy": setupKeybinds(); break;
            }
        }
        rightSideContents("Aktualności");

    })();

    function setupNews() {
        /*
                REWS_PD4.HTML.mainPanel.rightContentTitle.textContent = "Aktualności";

                const actual_content = document.createElement("div");
                actual_content.classList.add(PRIVATE_IDENTIFIER + "-right_content");

                const p = document.createElement("p");
                p.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
                actual_content.append(p);


                REWS_PD4.HTML.mainPanel.rightContent = actual_content;
                */
    }

    function setupInfo() {
        /*
                  REWS_PD4.HTML.mainPanel.rightContentTitle.textContent = "Informacje";

                const actual_content = document.createElement("div");
                actual_content.classList.add(PRIVATE_IDENTIFIER + "-right_content");

                const p = document.createElement("p");
                p.textContent = "2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
                actual_content.append(p);


                REWS_PD4.HTML.mainPanel.rightContent = actual_content;*/
    }

    function setupKeybinds() {
        /*
                REWS_PD4.HTML.mainPanel.rightContentTitle.textContent = "Keybindy";

                const actual_content = document.createElement("div");
                actual_content.classList.add(PRIVATE_IDENTIFIER + "-right_content");

                const p = document.createElement("p");
                p.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
                actual_content.append(p);


                REWS_PD4.HTML.mainPanel.rightContent = actual_content;
                */
    }

})();