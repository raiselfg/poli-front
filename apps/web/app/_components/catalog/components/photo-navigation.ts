import type { KeyboardEvent } from 'react';

export type PhotoDirection = -1 | 1;

export type PhotoTrackNavigation = {
  step: (direction: PhotoDirection) => void;
};

export function navigateWithArrowKeys(
  event: KeyboardEvent<HTMLElement>,
  track: PhotoTrackNavigation | null
) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

  event.preventDefault();
  track?.step(event.key === 'ArrowLeft' ? -1 : 1);
}
