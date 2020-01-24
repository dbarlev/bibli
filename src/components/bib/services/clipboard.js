import { Row, Col, Toast } from "react-bootstrap";
import React, { Component } from "react";
const TEMP_ID = "bibli_copy_id";

export class CopyToClipboard {

    single(selector, element, parentElement) {
        parentElement = parentElement || "body";
        let records = element.closest(".bib_card").querySelectorAll(selector);
        this.addTempElementForCopy(records, parentElement);
        this.copy();
    }

    bulk(selector, parentElement) {
        parentElement = parentElement || "body";
        let records = document.querySelectorAll(selector);
        this.addTempElementForCopy(records, parentElement);
        this.copy();
    }

    copy() {
        let elWithText = document.getElementById(TEMP_ID);
        let range;
        let selection;

        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(elWithText);
            range.select();
        }

        else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(elWithText);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        this.removeTempElement();
    }

    addTempElementForCopy(records, parentSeletor) {
        var divEl = document.createElement("div");
        var divElChild = document.createElement("div");
        var mainarea = document.querySelector(parentSeletor);
        var html = "";
        divEl.id = TEMP_ID;
        divEl.classList.add("sr-only");
        divEl.appendChild(divElChild);
        mainarea.appendChild(divEl);
        records.forEach((el) => {
            html = html + el.outerHTML;
        });
        divElChild.outerHTML = html;
        return divElChild;
    }

    removeTempElement(selector) {
        document.getElementById(TEMP_ID).remove();
    }
}


