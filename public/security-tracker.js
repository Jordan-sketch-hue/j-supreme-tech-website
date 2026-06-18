(function () {
  var script = document.currentScript;
  var endpoint =
    (script && script.getAttribute("data-endpoint")) ||
    new URL("/api/security/events", script ? script.src : window.location.href).href;
  var project =
    (script && script.getAttribute("data-project")) ||
    window.location.hostname.replace(/^www\./, "");
  var lastTracked = "";

  function currentPath() {
    return window.location.pathname + window.location.search;
  }

  function track() {
    var path = currentPath();

    if (path === lastTracked) return;
    lastTracked = path;

    var payload = JSON.stringify({
      project: project,
      path: path,
      url: window.location.href,
      referrer: document.referrer,
    });

    if (navigator.sendBeacon) {
      var sent = navigator.sendBeacon(
        endpoint,
        new Blob([payload], { type: "application/json" })
      );
      if (sent) return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
      mode: "cors",
    }).catch(function () {});
  }

  function wrapHistory(method) {
    var original = history[method];
    history[method] = function () {
      var result = original.apply(this, arguments);
      setTimeout(track, 0);
      return result;
    };
  }

  wrapHistory("pushState");
  wrapHistory("replaceState");
  window.addEventListener("popstate", track);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", track, { once: true });
  } else {
    track();
  }
})();
