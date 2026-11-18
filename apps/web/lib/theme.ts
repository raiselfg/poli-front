const themeStorageKey = 'alvin-site-theme';

export const themeScript = `
  (() => {
    const key = ${JSON.stringify(themeStorageKey)};
    const system = matchMedia('(prefers-color-scheme: dark)');
    function applyTheme() {
      let preference;
      try {
        preference = localStorage.getItem(key);
      } catch {}
      document.documentElement.classList.toggle(
        'dark',
        preference === 'dark' || (preference !== 'light' && system.matches)
      );
    }
    applyTheme();
    system.addEventListener('change', applyTheme);
    addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && (event.key === key || event.key === null)) {
        applyTheme();
      }
    });
  })();
`;

export function setSiteTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  try {
    localStorage.setItem(themeStorageKey, dark ? 'dark' : 'light');
  } catch {
    // The theme still works when the browser blocks persistent storage.
  }
}
