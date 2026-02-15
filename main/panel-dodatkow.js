(async () => {
    ///------------\\\
    ///            \\\
    ///------------\\\

    const GLOBAL_IDENTIFIER = "REWS_PD4";
    const PRIVATE_IDENTIFIER = "REWS_PD4_main";
    const DATE = new Date().getTime();

    ///-------------\\\

    const host = document.createElement("div");
    host.classList.add(GLOBAL_IDENTIFIER + "-host");
    document.body.append(host);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://itsrews.github.io/panel-dodatkow-4/main/panel-dodatkow.css?v=" + DATE;
    document.head.append(css);

    await fetch(`https://itsrews.github.io/panel-dodatkow-4/utils/globals.js?v=${DATE}`)
        .then(response => response.text())
        .then(responseText => {
            const script = document.createElement('script');
            script.textContent = responseText;
            host.append(script);
        });


    function createMainPanel() {
        REWS_PD4.functions.templates.createBody(host, PRIVATE_IDENTIFIER, false);

        //Right side
        const main_content_right = document.createElement("div");
        main_content_right.classList.add(PRIVATE_IDENTIFIER + "-content_right");
        REWS_PD4.HTML.mainPanel.content.append(main_content_right);

        const fillerText = document.createElement("label");
        fillerText.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        main_content_right.append(fillerText);

        REWS_PD4.HTML.mainPanel.rightContentTitle = document.createElement("label");
        REWS_PD4.HTML.mainPanel.rightContentTitle.classList.add(PRIVATE_IDENTIFIER + "-right_title");
        REWS_PD4.HTML.mainPanel.rightContentTitle.textContent = "Unloaded";
        main_content_right.append(REWS_PD4.HTML.mainPanel.rightContentTitle);

        REWS_PD4.HTML.mainPanel.rightContent = document.createElement("div");
        REWS_PD4.HTML.mainPanel.rightContent.classList.add(PRIVATE_IDENTIFIER + "-right_content");
        REWS_PD4.HTML.mainPanel.rightContent.textContent = "Unloaded";
        main_content_right.append(REWS_PD4.HTML.mainPanel.rightContent);


        //Left side
        const main_content_left = document.createElement("div");
        main_content_left.classList.add(PRIVATE_IDENTIFIER + "-content_left");
        REWS_PD4.HTML.mainPanel.content.append(main_content_left);

        const addon_search = document.createElement("input");
        addon_search.type = "text";
        addon_search.classList.add(PRIVATE_IDENTIFIER + "-search");
        addon_search.placeholder = "Wyszukaj...";
        main_content_left.append(addon_search);

        const content_list = document.createElement("div");
        content_list.classList.add(PRIVATE_IDENTIFIER + "-content_list");
        main_content_left.append(content_list);

        const general_label = document.createElement("label");
        general_label.textContent = "Ogólne:";
        content_list.append(general_label);

        REWS_PD4.functions.templates.createButton(content_list, GLOBAL_IDENTIFIER, "> Aktualności", false, () => {

            REWS_PD4.HTML.mainPanel.rightContentTitle.textContent = "Aktualności";

            const actual_content = document.createElement("div");
            actual_content.classList.add(PRIVATE_IDENTIFIER + "-right_content");

            const p = document.createElement("p");
            p.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            actual_content.append(p);


            REWS_PD4.HTML.mainPanel.rightContent = actual_content;
        });

        REWS_PD4.functions.templates.createButton(content_list, GLOBAL_IDENTIFIER, "> Informacje", false, () => {

            REWS_PD4.HTML.mainPanel.rightContentTitle.textContent = "Informacje";

            const actual_content = document.createElement("div");
            actual_content.classList.add(PRIVATE_IDENTIFIER + "-right_content");

            const p = document.createElement("p");
            p.textContent = "2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            actual_content.append(p);


            REWS_PD4.HTML.mainPanel.rightContent = actual_content;
        });

        REWS_PD4.functions.templates.createButton(content_list, GLOBAL_IDENTIFIER, "> Keybindy", false, () => {
            REWS_PD4.HTML.mainPanel.rightContentTitle.textContent = "Keybindy";

            const actual_content = document.createElement("div");
            actual_content.classList.add(PRIVATE_IDENTIFIER + "-right_content");

            const p = document.createElement("p");
            p.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            actual_content.append(p);


            REWS_PD4.HTML.mainPanel.rightContent = actual_content;
        });

        const addons_label = document.createElement("label");
        addons_label.textContent = "Dodatki:"
        addons_label.classList.add(PRIVATE_IDENTIFIER + "-content_label");
        content_list.append(addons_label);




        //
        //

        function fillerButtons() {
            for (let i = 0; i < 10; i++) {
                const keybinds_button = document.createElement("div");
                keybinds_button.classList.add(PRIVATE_IDENTIFIER + "-button");
                content_list.append(keybinds_button);

                const keybinds_label = document.createElement("label");
                keybinds_label.textContent = `> Addon${i}`;
                keybinds_button.append(keybinds_label);
            }

        }
        fillerButtons();

        //
        //
    }

    createMainPanel();
















})();




