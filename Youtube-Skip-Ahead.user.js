// ==UserScript==
// @name         Youtube Skip Ahead
// @namespace    https://greasyfork.org/users/xransum
// @version      1.1.0
// @description  Simple auto-clicker for skipping sponsored segments with the "Skip Ahead" button for Premium users.
// @author       xransum (https://github.com/xransum)
// @match        https://www.youtube.com/watch*
// @grant        none
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/xransum/Youtube-Skip-Ahead/refs/heads/main/Youtube-Skip-Ahead.user.js
// @updateURL    https://raw.githubusercontent.com/xransum/Youtube-Skip-Ahead/refs/heads/main/Youtube-Skip-Ahead.meta.js
// ==/UserScript==

(function() {
    'use strict';
    
    /** Delayed function execution.
     * 
     * When called consecutively, this function will delay the execution
     * of the callback function until the delay time has passed. This is
     * useful for functions that are called multiple times in a short
     * period of time, such as when a user is typing in a text box.
     * 
     * @author xransum <https://github.com/xransum>
     * @see https://github.com/xransum/script-junkyard/blob/main/js/delay.js
     * 
     * @param {function} callback The function to execute.
     * @param {number} ms The number of milliseconds to delay.
     * @returns {function} The callback function.
     * 
     * @example
     * var delayedFunction = delay(function() {
     *    console.log('Hello World!');
     * }, 1000);
    **/
    function delay(callback, ms) {
        var timer = 0;
        return function() {
            var context = this;
            var args = arguments;

            clearTimeout(timer);
            timer = setTimeout(function() {
                callback.apply(context, args);
            }, ms || 0);
        };
    }

    console.log(`${GM.info.name} by ${GM.info.author}.`);

    const observer = new MutationObserver(delay(function(mutations) {
        mutations.forEach(function(mutation) {
            const timelyModel = document.getElementsByTagName("ytw-timely-actions-overlay-view-model");
            if (!timelyModel) {
                return;
            }

            const timelyBtns = timelyModel[0].querySelector('button-view-model yt-touch-feedback-shape > .yt-spec-touch-feedback-shape');
            if (!timelyBtns) {
                return;
            }

            console.log("Jump Ahead Detected!");
            timelyBtns.click();
        });
    }, 50));

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(document.body, config);
})();
