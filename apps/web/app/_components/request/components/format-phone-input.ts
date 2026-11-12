export function formatPhoneDigits(digits: string): string {
  return [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 8),
    digits.slice(8, 10),
  ]
    .filter(Boolean)
    .join('-');
}

export function formatPhoneInput(input: HTMLInputElement): string {
  const { value, selectionStart } = input;
  const hasCountryCode = value.startsWith('+7');
  const digits = value.replace(/\D/g, '').slice(hasCountryCode ? 1 : 0);
  const formatted = formatPhoneDigits(digits);

  if (selectionStart !== null && value !== formatted) {
    // Keep the caret beside the edited digit when separators move.
    const digitsBeforeCaret = value.slice(0, selectionStart).replace(/\D/g, '');
    const localPosition = Math.max(
      0,
      digitsBeforeCaret.length - (hasCountryCode ? 1 : 0)
    );
    let caret = 0;
    for (
      let remaining = localPosition;
      remaining > 0 && caret < formatted.length;
      caret++
    ) {
      if (formatted[caret] !== '-') remaining--;
    }

    requestAnimationFrame(() => {
      if (input.value === formatted && document.activeElement === input) {
        input.setSelectionRange(caret, caret);
      }
    });
  }

  return formatted;
}
