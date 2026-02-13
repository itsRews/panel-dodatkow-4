(async () => {
    ///------------\\\
    ///            \\\
    ///------------\\\

    const GLOBAL_IDENTIFIER = "REWS_PD4";
    const PRIVATE_IDENTIFIER = "REWS_PD4.main";
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


    REWS_PD4.functions.templates.createBody(host, PRIVATE_IDENTIFIER, false);


    const main_content_left = document.createElement("div");
    main_content_left.classList.add("content_left");
    REWS_PD4.HTML.mainPanel.content.append(main_content_left);

    const addon_search = document.createElement("input");
    addon_search.type = "text";
    addon_search.classList.add("search");
    addon_search.placeholder = "Wyszukaj...";
    main_content_left.append(addon_search);

    const content_list = document.createElement("div");
    content_list.classList.add("content_list");
    main_content_left.append(content_list);

    const general_label = document.createElement("label");
    general_label.textContent = "Ogólne:";
    content_list.append(general_label);


    const news_button = document.createElement("div");
    news_button.classList.add("button");
    content_list.append(news_button);

    const news_label = document.createElement("label");
    news_label.textContent = "> Aktualności";
    news_button.append(news_label);

    const info_button = document.createElement("div");
    info_button.classList.add("button");
    content_list.append(info_button);

    const info_label = document.createElement("label");
    info_label.textContent = "> Informacje";
    info_button.append(info_label);

    const keybinds_button = document.createElement("div");
    keybinds_button.classList.add("button");
    content_list.append(keybinds_button);

    const keybinds_label = document.createElement("label");
    keybinds_label.textContent = "> Keybindy";
    keybinds_button.append(keybinds_label);

    const addons_label = document.createElement("label");
    addons_label.textContent = "Dodatki:"
    addons_label.classList.add("content_label");
    content_list.append(addons_label);


    const main_content_right = document.createElement("div");
    main_content_right.classList.add("content_right");
    REWS_PD4.HTML.mainPanel.content.append(main_content_right);

    const fillerText = document.createElement("label");
    fillerText.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    main_content_right.append(fillerText);




    function fillerButtons() {
        for (let i = 0; i < 10; i++) {
            const keybinds_button = document.createElement("div");
            keybinds_button.classList.add("button");
            content_list.append(keybinds_button);

            const keybinds_label = document.createElement("label");
            keybinds_label.textContent = `> Addon${i}`;
            keybinds_button.append(keybinds_label);
        }

    }
    fillerButtons();


})();




