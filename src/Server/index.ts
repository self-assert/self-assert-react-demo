import { setupWorker } from 'msw/browser';

export const worker = setupWorker();

worker.events.on('response:mocked', ({ request, response }) => {
  console.log(
    `[ALaGorraSystem] ${request.method} ${request.url} => ${response.status} ${response.statusText}`
  );
});
