(() => {
    const IDENTIFIER = REWS_PD4.globals.identifier + "-EasyGroup";
    let BODY = null;

    REWS_PD4.addons["EasyGroup"] = {
        clickedOnMainPanel() {
            //sets up the right-side content page.
            const title = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_title");
            const content = document.getElementById(REWS_PD4.globals.identifier + "-main" + "-page_content");
            REWS_PD4.functions.removeAllChildren(content);

            title.textContent = "EasyGroup";

            const newContent = document.createElement("div");
            newContent.classList.add(IDENTIFIER + "-page_layout");

            const descriptionTitle = "Opis"
            const descriptionText = "Dodatek który ułatwia tworzenie grupy z wszystkich osób na mapie."
            REWS_PD4.functions.templates.createPageSection(newContent, descriptionTitle, descriptionText);

            REWS_PD4.functions.templates.createButton(content, "> Okno dodatku", false, () => {
                const isCreated = localStorage.getItem(IDENTIFIER + "-isCreated");
                if (isCreated === "true") {
                    localStorage.setItem(IDENTIFIER + "-isCreated", "false");

                    closeBody();
                } else {
                    localStorage.setItem(IDENTIFIER + "-isCreated", "true");

                    createBody();
                }
            });

            content.append(newContent);
        }
    };

    function createBody() {
        BODY = REWS_PD4.functions.templates.createBody(REWS_PD4.HTML.host, IDENTIFIER, "[REWS] EasyGroup", "[R] EG", true);

        const content = document.getElementById(IDENTIFIER + "-content");
    }

    function closeBody() {
        if (BODY === null) return;

        BODY.remove();
        BODY = null;
    }






    (function initialize() {
        if (localStorage.getItem(IDENTIFIER + "-isCreated") === "true") createBody();


    })();
})();