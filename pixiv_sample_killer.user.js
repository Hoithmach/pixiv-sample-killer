// ==UserScript==
// @name         Pixiv Sample Killer
// @namespace    https://github.com/Hoithmach/pixiv-sample-killer
// @version      0.1
// @description  Detect master1200 images and redirect to the full sized image
// @author       Hoithmach
// @include      http*://*_master1200*
// @license      GPL-3.0; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

function getPixivURL() {

    var URL = document.URL;

    var splitURL = URL.split("/");

    var file = splitURL[splitURL.length-1];

    var pixivId = file.split("_")[0];

    return ("https://www.pixiv.net/artworks/" + pixivId);
}

function redirect(link) {
    window.location.href = link;
};

function insertPixivLinkButton(link) {

    var div = replaceImageHTML("div");

    var pixivLinkButton = document.createElement("BUTTON")

    pixivLinkButton.id = "pixivLinkButton";
    pixivLinkButton.style.position = "fixed";
    pixivLinkButton.style.fontSize = "20px";
    pixivLinkButton.innerHTML = "Original";
    pixivLinkButton.style.width = "200px";
    pixivLinkButton.style.height = "50px";

    pixivLinkButton.onclick = function() { redirect(link) };

    div.appendChild(pixivLinkButton);
}

function replaceImageHTML() {

    var img = document.getElementsByTagName("img")[0];

    document.body.removeChild(img);

    var div = document.createElement("div");

    div.appendChild(img)

    document.body.appendChild(div);

    return div

};

(function() {
    'use strict';

    var pixivURL = getPixivURL()

    insertPixivLinkButton(pixivURL);

    document.addEventListener("keydown", function(key) {

        if ((key.key == "o") && (! key.ctrlKey) && (! key.altKey) && (! key.shiftKey)) {

            redirect(pixivURL);

        };
    });


})();
