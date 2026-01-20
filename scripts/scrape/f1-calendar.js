(function () {
  const nodes = Array.from(document.querySelectorAll('main a.group[href^="/en/racing/2026/"]'));
  const data = nodes.map((a) => {
    const href = a.getAttribute("href") || "";
    const url = (() => {
      try {
        return new URL(href, window.location.href).toString();
      } catch (e) {
        return href;
      }
    })();
    const parts = url.split("/").filter(Boolean);
    const slug = parts.length ? parts[parts.length - 1] : null;

    const fullSpan = a.querySelector('span[class*="typography-module_body-xs-semibold__Fyfwn"]');
    const nameFull = fullSpan ? fullSpan.textContent.trim() : null;
    const shortP = a.querySelector("p.typography-module_display-xl-bold__Gyl5W");
    const nameShort = shortP ? shortP.textContent.trim() : null;
    const dateSpan = a.querySelector("span.typography-module_technical-m-bold__JDsxP");
    const displayDate = dateSpan ? dateSpan.textContent.trim() : null;
    const typeSpan = a.querySelector("span.typography-module_body-2-xs-bold__M03Ei");
    const type = typeSpan ? typeSpan.textContent.trim() : null;
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
