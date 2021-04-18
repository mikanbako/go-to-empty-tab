// (C) Copyright 2021 Keita Kita
// SPDX-License-Identifier: MIT

function listTabs() {
    let querying = browser.tabs.query({'currentWindow': true})

    querying.then(all_tabs => {
        console.log('----')

        for (let tab of all_tabs) {
            console.log(tab)
        }
    })
}

document.addEventListener('DOMContentLoaded', listTabs)
