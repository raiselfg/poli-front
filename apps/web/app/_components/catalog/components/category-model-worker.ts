/// <reference lib="webworker" />

import {
  createCategoryModelRenderer,
  type CategoryModelName,
} from './category-model-renderer';

export type CategoryModelCommand =
  | { type: 'init'; canvas: OffscreenCanvas; model: CategoryModelName }
  | { type: 'render'; progress: number; size: number };

export type CategoryModelEvent = 'ready' | 'rendered' | 'unavailable';

const scope = self as unknown as DedicatedWorkerGlobalScope;
let scene: Awaited<ReturnType<typeof createCategoryModelRenderer>> = null;

function report(event: CategoryModelEvent) {
  scope.postMessage(event);
}

scope.onmessage = (event: MessageEvent<CategoryModelCommand>) => {
  const command = event.data;
  if (command.type === 'init') {
    command.canvas.addEventListener('webglcontextlost', () => {
      report('unavailable');
    });
    void createCategoryModelRenderer(command.canvas, command.model)
      .then((result) => {
        scene = result;
        report(result === null ? 'unavailable' : 'ready');
      })
      .catch(() => {
        report('unavailable');
      });
    return;
  }

  report(
    scene?.render(command.progress, command.size) === true
      ? 'rendered'
      : 'unavailable'
  );
};
