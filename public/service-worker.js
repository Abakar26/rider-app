var isAuthenticated = false;
var pendingNotifications = [];

//  Installing Service worker
self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

// Activating Service Worker
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim()); // Become available to all pages
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Receiving Push Notifications
self.addEventListener("push", (event) => {
  if (isAuthenticated) {
    const notification = event.data?.json();
    event.waitUntil(
      self.registration.showNotification(notification.title, {
        body: notification.body,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: notification.type,
        icon: "./logo512.png",
      })
    );
  } else {
    pendingNotifications.push(event.data?.json());
  }
});

//  handling on click of push notifications
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          client.navigate(
            `${client.url.split("/").slice(0, -1).join("/")}/logistics`
          );
        }
      })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "MESSAGE_IDENTIFIER") {
    isAuthenticated = event.data.user ? true : false;
  }
  if (event.data && event.data.type === "PENDING_NOTIFICATIONS") {
    while (pendingNotifications.length !== 0) {
      const notification = pendingNotifications.pop();
      event.waitUntil(
        self.registration.showNotification(notification.title, {
          body: notification.body,
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: `${notification.title + " " + notification.body}`,
          icon: "./logo512.png",
        })
      );
    }
  }
});
