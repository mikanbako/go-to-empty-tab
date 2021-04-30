// (C) Copyright 2021 Keita Kita
// SPDX-License-Identifier: MIT

import { Direction, getEmptyTab } from './empty_tab';

const previousButtonId = 'previous_button';
const nextButtonId = 'next_button';

async function goToEmptyTab(direction: Direction) {
  const allTabs = await browser.tabs.query({ currentWindow: true });
  const emptyTabId = getEmptyTab(allTabs, direction);

  if (emptyTabId == null) {
    return;
  }

  browser.tabs.update(emptyTabId, { active: true });
}

function onPreviousButtonClicked() {
  goToEmptyTab(Direction.Previous);
}

function onNextButtonClicked() {
  goToEmptyTab(Direction.Next);
}

function logError(text: string) {
  // eslint-disable-next-line no-console
  console.error(text);
}

const previousButton = document.getElementById(previousButtonId);
if (!previousButton) {
  logError('Previous button is unavailable.');
}

const nextButton = document.getElementById(nextButtonId);
if (!nextButton) {
  logError('Next button is unavailable.');
}

if (previousButton && nextButton) {
  previousButton.addEventListener('click', onPreviousButtonClicked);
  nextButton.addEventListener('click', onNextButtonClicked);
}
