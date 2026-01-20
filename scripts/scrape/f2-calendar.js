(function () {
  const nodes = Array.from(document.querySelectorAll("div.calendar-layout div.result-card"));
  const data = nodes.map((a) => {
    const href = a.querySelector("a").getAttribute("href") || "";
    const url = (() => {
      try {
        return new URL(href, window.location.href).toString();
      } catch (e) {
        return href;
      }
    })();
    const fullSpan = a.querySelector("span.event-place span");
    const nameFull = fullSpan ? fullSpan.textContent.trim() : null;
    const nameShort = nameFull;
    const slug = nameFull ? window._UTILS.slugify(nameFull) : null;
    const dateP = a.querySelector("p.date");
    const displayDate = dateP
      ? Array.from(dateP.querySelectorAll("span"))
          .map((span) => span.textContent.trim())
          .join(" ")
      : null;
    const typeP = a.querySelector("p.h6");
    const type = typeP ? typeP.textContent.trim().toUpperCase() : null;
    return { url, slug, nameFull, nameShort, displayDate, type };
  });

  if (data.length) {
    const titleEl = document.querySelector("h1");
    const title = titleEl ? titleEl.textContent.trim() : null;
    const yearMatch = title ? title.match(/\b(\d{4})\b/) : null;
    const year = yearMatch ? yearMatch[1] : null;
    const meta = { title, year };
    const out = window._UTILS.wrapData(data, meta);
    window._UTILS.showOverlayJson(out, "_calendar.json");
    return;
  }

  console.error("FAILED!");
})();
