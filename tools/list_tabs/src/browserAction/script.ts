// (C) Copyright 2021 Keita Kita
// SPDX-License-Identifier: MIT

async function listTabs() {
  const allTabs = await browser.tabs.query({ currentWindow: true });

  // eslint-disable-next-line no-console
  console.log('-----');

  allTabs.forEach((tab) => {
    // eslint-disable-next-line no-console
    console.log(tab);
  });
}

document.addEventListener('DOMContentLoaded', listTabs);
