// ==UserScript==
// @name         [REWS] Panel Dodatków 4
// @description  Oficjalna wersja Panelu Dodatków autorstwa itsRews do gry Margonem.
// @author       itsRews (10048792) // Discord: itsrews
// @namespace    https://www.margonem.pl/profile/view,10048792
// @version      4.0
// @updateURL    https://itsrews.github.io/panel-dodatkow-4/userscript/panel-dodatkow-4.meta.js
// @downloadURL  https://itsrews.github.io/panel-dodatkow-4/userscript/panel-dodatkow-4.user.js
// @match        *://*.margonem.pl/
// @match        *://*.margonem.com/
// @exclude      *://www.margonem.pl/*
// @exclude      *://forum.margonem.pl/*
// @exclude      *://addons2.margonem.pl/*
// @icon         https://www.google.com/s2/favicons?domain=margonem.pl
// @connect      itsrews.github.io
// @grant        none
// ==/UserScript==

(async () => {
    async function waitForAllInit() {
        return new Promise(resolve => {
            const intervalId = setInterval(() => {
                if (typeof Engine !== 'undefined' && typeof Engine.hero !== 'undefined') {
                    if (Engine.allInit === true) {
                        clearInterval(intervalId);
                        resolve(true);
                    }
                }
                else {
                    if (g.init === 5) {
                        setInterval(() => {
                            clearInterval(intervalId);
                            resolve(false);
                        }, 100);
                    }
                }
            }, 100);
        });
    }

    function fetchScript() {
        let date = new Date().getTime();
        fetch(`https://itsrews.github.io/panel-dodatkow-4/main/panel-dodatkow.js?v=${date}`)
            .then(response => response.text())
            .then(responseText => {
                const script = document.createElement('script');
                script.textContent = responseText;
                document.head.appendChild(script);
            });
    }


    async function main() {
        let proceed = true;
        await waitForAllInit().then(loadedNewInterface => {
            if (!loadedNewInterface) {
                message("[R] Panel Dodatków v4 obecnie nie wspierwa Starego Interface. \n\nWyłącz dodatek albo zmień interface.")
                proceed = false;
            }
        });

        if (!proceed) return;

        fetchScript();
    }

    await main();
})();