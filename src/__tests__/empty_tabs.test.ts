// (C) Copyright 2021 Keita Kita
// SPDX-License-Identifier: MIT

import { Direction, Tab, getEmptyTab } from '../browserAction/empty_tab';

const EmptyTabType = {
  NoEmpty: 'http://www.example.com',
  Blank: 'about:blank',
  NewTab: 'about:newtab',
} as const;

type EmptyTabType = typeof EmptyTabType[keyof typeof EmptyTabType];

function createTab(emptyTabType: EmptyTabType): Tab {
  return {
    active: false,
    url: emptyTabType,
  };
}

function createTabs(allTabs: Tab[]): Tab[] {
  return allTabs.map((tab, index) => {
    const newTab = { ...tab };

    newTab.id = index;

    return newTab;
  });
}

test('next empty tab (new tab) on no empty tab', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.NewTab),
    ],
  );

  tabs[0].active = true;

  const expectTab = tabs[1];

  expect(getEmptyTab(tabs, Direction.Next)).toBe(expectTab.id);
});

test('next empty tab (blank) on no empty tab', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.Blank),
    ],
  );

  tabs[0].active = true;

  const expectTab = tabs[1];

  expect(getEmptyTab(tabs, Direction.Next)).toBe(expectTab.id);
});

test('next empty tab on empty tab', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.NewTab),
    ],
  );

  tabs[0].active = true;

  const expectTab = tabs[2];

  expect(getEmptyTab(tabs, Direction.Next)).toBe(expectTab.id);
});

test('next empty tab on continuous empty tabs', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NewTab),
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.Blank),
    ],
  );

  tabs[0].active = true;

  const expectTab = tabs[4];

  expect(getEmptyTab(tabs, Direction.Next)).toBe(expectTab.id);
});

test('next empty tab from not first active not empty tab', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.Blank),
    ],
  );

  tabs[1].active = true;

  const expectTab = tabs[2];

  expect(getEmptyTab(tabs, Direction.Next)).toBe(expectTab.id);
});

test('next empty tab from not first active empty tab', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NewTab),
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.NewTab),
    ],
  );

  tabs[1].active = true;

  const expectTab = tabs[4];

  expect(getEmptyTab(tabs, Direction.Next)).toBe(expectTab.id);
});

test('previous empty tab (new tab)', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NewTab),
      createTab(EmptyTabType.NoEmpty),
    ],
  );

  tabs[1].active = true;

  const expectTab = tabs[0];

  expect(getEmptyTab(tabs, Direction.Previous)).toBe(expectTab.id);
});

test('previous empty tab (blank)', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NoEmpty),
    ],
  );

  tabs[1].active = true;

  const expectTab = tabs[0];

  expect(getEmptyTab(tabs, Direction.Previous)).toBe(expectTab.id);
});

test('previous first empty tab', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NewTab),
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NoEmpty),
    ],
  );

  tabs[2].active = true;

  const expectTab = tabs[0];

  expect(getEmptyTab(tabs, Direction.Previous)).toBe(expectTab.id);
});

test('previous first empty tab after no empty tab', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.NewTab),
      createTab(EmptyTabType.Blank),
      createTab(EmptyTabType.NoEmpty),
    ],
  );

  tabs[3].active = true;

  const expectTab = tabs[1];

  expect(getEmptyTab(tabs, Direction.Previous)).toBe(expectTab.id);
});

test('not found when no tabs', () => {
  expect(getEmptyTab([], Direction.Next)).toBeNull();
});

test('not found when no empty tabs', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.NoEmpty),
    ],
  );

  tabs[0].active = true;

  expect(getEmptyTab(tabs, Direction.Next)).toBeNull();
});

test('not found when active empty tab only', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.Blank),
    ],
  );

  tabs[0].active = true;

  expect(getEmptyTab(tabs, Direction.Next)).toBeNull();
});

test('not found when active not empty tab only', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NoEmpty),
    ],
  );

  tabs[0].active = true;

  expect(getEmptyTab(tabs, Direction.Next)).toBeNull();
});

test('not found when last empty tab is active', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NoEmpty),
      createTab(EmptyTabType.NewTab),
    ],
  );

  tabs[1].active = true;

  expect(getEmptyTab(tabs, Direction.Next)).toBeNull();
});

test('not found when first empty tab is active', () => {
  const tabs = createTabs(
    [
      createTab(EmptyTabType.NewTab),
      createTab(EmptyTabType.NoEmpty),
    ],
  );

  tabs[0].active = true;

  expect(getEmptyTab(tabs, Direction.Previous)).toBeNull();
});
