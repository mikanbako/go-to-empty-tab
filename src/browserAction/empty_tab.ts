// (C) Copyright 2021 Keita Kita
// SPDX-License-Identifier: MIT

/**
 * The direction to search.
 */
export const Direction = {
  Next: 0,
  Previous: 1,
} as const;

const TabPosition = {
  First: 0,
  Last: 1,
} as const;

export type Direction = typeof Direction[keyof typeof Direction];
export type Tab = Pick<browser.tabs.Tab, 'active' | 'id' | 'url'>;
export type TabId = NonNullable<browser.tabs.Tab['id']>
type TabArrayIndex = number;
type TabPosition = typeof TabPosition[keyof typeof TabPosition];

const emptyTabUrls = [
  'about:blank',
  'about:newtab',
];

function findActiveTabArrayIndex(allTabs: Tab[]): TabArrayIndex | null {
  const index = allTabs.findIndex((tab) => tab.active);

  return (index >= 0) ? index : null;
}

function isEmptyTab(tab: Tab): boolean {
  if (!tab.url) {
    return false;
  }

  return emptyTabUrls.includes(tab.url);
}

function getEmptyTabSearchStartIndex(
  activeIndex: TabArrayIndex, allTabs: Tab[],
): TabArrayIndex | null {
  if (allTabs.length <= activeIndex + 1) {
    return null;
  }

  const nextOfActiveIndex = activeIndex + 1;

  if (isEmptyTab(allTabs[activeIndex])) {
    const noEmptyTabIndex = allTabs.slice(nextOfActiveIndex)
      .findIndex((tab) => !isEmptyTab(tab));

    if (noEmptyTabIndex < 0) {
      return null;
    }

    return nextOfActiveIndex + noEmptyTabIndex;
  }

  return nextOfActiveIndex;
}

function getNextEmptyTabIndex(
  startIndex: TabArrayIndex, allTabs: Tab[],
): TabArrayIndex | null {
  const nextEmptyTabIndexFromStart = allTabs.slice(startIndex)
    .findIndex((tab) => isEmptyTab(tab));

  if (nextEmptyTabIndexFromStart < 0) {
    return null;
  }

  return startIndex + nextEmptyTabIndexFromStart;
}

function getLastEmptyTab(
  emptyTabIndex: number, allTabs: Tab[],
): Tab | null {
  const noEmptyTabIndexFromEmptyTab = allTabs.slice(emptyTabIndex)
    .findIndex((tab) => !isEmptyTab(tab));

  if (noEmptyTabIndexFromEmptyTab >= 0) {
    return allTabs[emptyTabIndex + noEmptyTabIndexFromEmptyTab - 1];
  }

  if (isEmptyTab(allTabs[allTabs.length - 1])) {
    return allTabs[allTabs.length - 1];
  }

  return allTabs[emptyTabIndex];
}

function findNextEmptyTab(
  activeIndex: TabArrayIndex, allTabs: Tab[], targetPosition: TabPosition,
): Tab | null {
  const searchStartIndex = getEmptyTabSearchStartIndex(activeIndex, allTabs);

  if (searchStartIndex == null) {
    return null;
  }

  const nextEmptyTabIndex = getNextEmptyTabIndex(searchStartIndex, allTabs);

  if (nextEmptyTabIndex == null) {
    return null;
  }

  if (targetPosition === TabPosition.Last) {
    return getLastEmptyTab(nextEmptyTabIndex, allTabs);
  }

  return allTabs[nextEmptyTabIndex];
}

/**
 * Gets an empty tab from the active tab.
 *
 * @param allTabs The array of tabs.
 * @param direction The direction to search.
 * @returns The id of a found empty tab or null when it is not found.
 */
export function getEmptyTab(allTabs: Tab[], direction: Direction):
    TabId | null {
  const targetTabs = (direction === Direction.Next)
    ? allTabs : [...allTabs].reverse();
  const activeIndex = findActiveTabArrayIndex(targetTabs);

  if (activeIndex == null) {
    return null;
  }

  const targetTabPosition = (direction === Direction.Next)
    ? TabPosition.First : TabPosition.Last;
  const emptyTab = findNextEmptyTab(activeIndex, targetTabs, targetTabPosition);

  return emptyTab?.id ?? null;
}
