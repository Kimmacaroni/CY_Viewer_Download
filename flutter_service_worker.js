// 이전 웹앱을 캐시한 사용자도 본 프로젝트의 새 주소로 이동한다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  const previousScope = self.registration.scope;
  event.waitUntil((async () => {
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    await Promise.all(windows
      .filter((client) => client.url.startsWith(previousScope))
      .map((client) => client.navigate('https://kimmacaroni.github.io/CY_Viewer/')));
  })());
});
