(async() => {
    let IDENTIFIER;

    await (async function initialize() {
        const host = document.createElement("div");

        await fetch(`https://itsrews.github.io/panel-dodatkow-4/utils/globals.js?v=${new Date().getTime()}`)
            .then(response => response.text())
            .then(responseText => {
                const script = document.createElement('script');
                script.textContent = responseText;
                host.append(script);
            });
        document.body.append(host);

        await fetch(`${REWS_PD4.globals.url}/updates/${REWS_PD4.globals.version}.json?v=${REWS_PD4.globals.date}`)
            .then(response => response.json())
            .then(responseJson => {
                REWS_PD4.globals.updateData = responseJson;
            });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = `${REWS_PD4.globals.url}/main/panel-dodatkow.css?v=${REWS_PD4.globals.date}`;
        host.append(css);

        IDENTIFIER = REWS_PD4.globals.identifier + "-main";
        REWS_PD4.HTML.host = host;
        host.classList.add(REWS_PD4.globals.identifier + "-host");
        host.id = REWS_PD4.globals.identifier + "-host";
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
            search.onkeyup = event => {
                const value = event.target.value.toLowerCase();

                const column = document.getElementsByClassName(IDENTIFIER + "-button_column")[0];

                Object.values(column.children).forEach(button => {
                    if (!button.classList.contains(REWS_PD4.globals.identifier + "-button")) return;

                    const buttonText = button.textContent.toLowerCase();
                    if (buttonText.includes(value)) button.style.display = "flex";
                    else button.style.display = "none";
                })
            }
            leftSide.append(search);


            const buttonColumn = document.createElement("div");
            buttonColumn.classList.add(IDENTIFIER + "-button_column");
            buttonColumn.addEventListener("wheel", e => e.stopPropagation(), { passive: false });
            leftSide.append(buttonColumn);

            const generalTitle = document.createElement("span");
            generalTitle.textContent = "Ogólne:";
            buttonColumn.append(generalTitle);

            REWS_PD4.functions.templates.createButton(buttonColumn, "> Aktualności", false, () => {
                rightSideContents("Aktualności")
            });

            REWS_PD4.functions.templates.createButton(buttonColumn, "> Informacje", false, () => {
                rightSideContents("Informacje")
            });

            REWS_PD4.functions.templates.createButton(buttonColumn, "> Skróty klawiszowe", false, () => {
                rightSideContents("Skróty klawiszowe")
            });


            const addonsTitle = document.createElement("span");
            addonsTitle.textContent = "Dodatki:";
            addonsTitle.classList.add(IDENTIFIER + "-addons_title");
            buttonColumn.append(addonsTitle);

            (function listAddons() {
                REWS_PD4.globals.addonList.forEach(addon => {
                    REWS_PD4.functions.templates.createButton(buttonColumn, `> ${addon}`, true, () => {
                        REWS_PD4.addons[addon].clickedOnMainPanel();
                    });
                });
            })();
        })();

        (function setupRightSide() {
            const rightSide = document.createElement("div");
            rightSide.classList.add(IDENTIFIER + "-right_side");
            mainPanelContent.append(rightSide);

            const contentTitle = document.createElement("span");
            contentTitle.classList.add(IDENTIFIER + "-page_title");
            contentTitle.id = IDENTIFIER + "-page_title";
            contentTitle.textContent = "TitleUnloaded";
            rightSide.append(contentTitle);

            const pageContent =  document.createElement("div");
            pageContent.classList.add(IDENTIFIER + "-page_content");
            pageContent.id = IDENTIFIER + "-page_content";
            pageContent.textContent = "ContentUnloaded";
            pageContent.addEventListener("wheel", e => e.stopPropagation(), { passive: false });
            rightSide.append(pageContent);
        })();

        function rightSideContents(page) {

            switch (page) {
                case "Aktualności": setupNews(); break;

                case "Informacje": setupInfo(); break;

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

    fetch(`https://itsrews.github.io/panel-dodatkow-4/utils/globals.js?v=${DATE}`)
        .then(response => response.text())
        .then(responseText => {
            const script = document.createElement('script');
            script.textContent = responseText;
            host.append(script);
        });


    const mainBody = document.createElement("div");
    mainBody.classList.add(GLOBAL_IDENTIFIER + "main_box");
    host.append(mainBody)

    const main_top = document.createElement("div");
    main_top.classList.add("top");
    mainBody.append(main_top);

    const main_title = document.createElement("label");
    main_title.textContent = "[REWS] Panel Dodatków 4";
    main_top.append(main_title);

    const main_close = document.createElement("label");
    main_close.textContent = "X";
    main_top.append(main_close);



    const main_content = document.createElement("div");
    main_content.classList.add("content");
    mainBody.append(main_content);

    const main_content_left = document.createElement("div");
    main_content_left.classList.add("content_left");
    main_content.append(main_content_left);

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
    main_content.append(main_content_right);

    })();

    function setupNews() {
        const title = document.getElementById(IDENTIFIER + "-page_title");
        const content = document.getElementById(IDENTIFIER + "-page_content");
        REWS_PD4.functions.removeAllChildren(content);

        title.textContent = "Aktualności";

        const newContent = document.createElement("div");
        newContent.classList.add(IDENTIFIER + "-page_layout");

        const versionHeader = document.createElement("span");
        versionHeader.classList.add(IDENTIFIER + "-page_header");
        versionHeader.textContent = REWS_PD4.globals.version;
        newContent.append(versionHeader);

        const headers = ["Dodatek", "Zmiany"];
        const updateData = REWS_PD4.globals.updateData;
        REWS_PD4.functions.templates.createTable(newContent, headers, updateData);

        content.append(newContent);
    }

    function setupInfo() {
        const title = document.getElementById(IDENTIFIER + "-page_title");
        const content = document.getElementById(IDENTIFIER + "-page_content");
        REWS_PD4.functions.removeAllChildren(content);

        title.textContent = "Informacje";

        const newContent = document.createElement("div");
        newContent.classList.add(IDENTIFIER + "-page_layout");

        let aboutTitle = "Czym jest Panel Dodatków 4";
        let aboutText = "Zbiórka dodatków stworzona przez itsRews. Pierwsze iteracje stworzone dla klanu w 2023 roku, po kilku przerwach od gry panel i czterech głównych wersjach panelu, zostaje on publicznie udostępniony na forum w celu udostępnienia dodatków które można łatwo zrobić \"pod siebie\", zmodyfikować, naprawić (w przypadku braku aktualizacji), albo po prostu jako materiał do nauki dla osób które dopiero zaczynają tworzyć dodatki.";
        REWS_PD4.functions.templates.createPageSection(newContent, aboutTitle, aboutText);

        let qualityAndPricingTitle = "Jakość oraz cena dodatków";
        let qualityAndPricingText = "Dodatki zawsze robiłem dla siebie, dlatego też zawsze były (i będą) w pełni darmowe. Z tego też powodu nie gwarantuje najlepiej zoptymizowanych dodatków, zrobionych w najlepszy możliwy sposób, lecz staram się robić je najlepiej jak potrafie.";
        REWS_PD4.functions.templates.createPageSection(newContent, qualityAndPricingTitle, qualityAndPricingText);

        let limitationsTitle = "Ograniczenia dodatków";
        let limitationsText = "Wszystkie dodatki są robione w szczególną myślą legalności do gry na świecie prywatnym Nubes. Z tego też powodu nigdy nie będzie tutaj dodatków typu Auto X (który różni się od dobijary), boty itd.";
        REWS_PD4.functions.templates.createPageSection(newContent, limitationsTitle, limitationsText);

        let contactTitle = "Kontakt";
        let contactText = "W przypadku jakichkolwiek propozycji polecaną metodą kontaktu jest forum. Może w przyszłości stworze Discord jeżeli będzie do tego potrzeba.";
        REWS_PD4.functions.templates.createPageSection(newContent, contactTitle, contactText);


        content.append(newContent);
    }

    function setupKeybinds() {
        const title = document.getElementById(IDENTIFIER + "-page_title");
        const content = document.getElementById(IDENTIFIER + "-page_content");
        REWS_PD4.functions.removeAllChildren(content);

        title.textContent = "Skróty klawiszowe";

        const newContent = document.createElement("div");
        newContent.classList.add(IDENTIFIER + "-page_layout");

        const headers = ["Dodatek", "Akcja", "Shift", "Ctrl", "Alt", "Przycisk"];
        const keybindData = REWS_PD4.addons;

        REWS_PD4.functions.templates.createKeybindsTable(newContent, headers, keybindData);

        content.append(newContent);
    }
})();