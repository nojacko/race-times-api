(function () {
  const titleEl = document.querySelector("h2.race-calendar__title");
  const title = titleEl ? titleEl.textContent.trim() : null;
  const yearMatch = title ? title.match(/\b(\d{4}\/\d{2})\b/) : null;
  const yearRaw = yearMatch ? yearMatch[1] : null;
  const year = yearRaw ? window._UTILS.slugify(yearRaw) : null;
  const meta = { title, year };

  const nodes = Array.from(document.querySelectorAll("ul.race-calendar__list li"));
  const data = nodes.map((a) => {
    const buttonLink = a.querySelector("a.button[href*='en/calendar/']");
    const href = buttonLink ? buttonLink.getAttribute("href") : a.querySelector("a")?.getAttribute("href") || "";
    const url = (() => {
      try {
        return new URL(`/${href}`, window.location.href).toString();
      } catch (e) {
        return href;
      }
    })();
    const fullSpan = a.querySelector("span.race-card__round-location");
    const nameFull = fullSpan ? fullSpan.textContent.trim() : null;
    const nameShort = nameFull;
    const slug = nameFull ? window._UTILS.slugify(nameFull) : null;
    const dateDiv = a.querySelector("div.race-card__round-date");
    const displayDate = dateDiv
      ? Array.from(dateDiv.querySelectorAll("span"))
          .map((span) => span.textContent.trim())
          .join(" ")
      : null;
    const typeP = a.querySelector("span.race-card__round-name");
    const type = typeP ? typeP.textContent.trim().toUpperCase() : null;
    return { url, slug, nameFull, nameShort, displayDate, type };
  });

  if (data.length) {
    // If multiple items share the same slug, append incremental suffixes
    // so slugs become `slug-1`, `slug-2`, ... preserving original order.
    const slugCounts = data.reduce((acc, d) => {
      if (!d.slug) return acc;
      acc[d.slug] = (acc[d.slug] || 0) + 1;
      return acc;
    }, {});
    const seen = {};
    Object.keys(slugCounts).forEach((s) => {
      if (slugCounts[s] > 1) {
        data.forEach((d) => {
          if (d.slug === s) {
            seen[s] = (seen[s] || 0) + 1;
            d.slug = `${s}-${seen[s]}`;
          }
        });
      }
    });

    const out = window._UTILS.wrapData(data, meta);
    window._UTILS.showOverlayJson(out, "_calendar.json");
    return;
  }

  console.error("FAILED!");
})();
