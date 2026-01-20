(async function () {
  await window._UTILS.tapWait("button.race-info__tab-button", "Track Time");

  const docTitle = document.title ? document.title.trim() : null;
  let nameFull = docTitle ? docTitle.split(",")[0].trim() : null;
  if (nameFull) {
    // Remove anything after a pipe and trim
    nameFull = nameFull.split("|")[0].trim();
    // Remove a leading year (e.g. "2025 ") if present
    nameFull = nameFull.replace(/^\s*\d{4}\s+/, "").trim();
  }

  let nameMedium = nameFull ? nameFull.replace(/\s+E-?Prix$/i, "").trim() : null;

  // Extract year for localDate (YYYY-MM-DD)
  const yearFromTitle = docTitle ? (docTitle.match(/\b(\d{4})\b/)?.[1] ?? null) : null;
  const year = yearFromTitle;

  const data = [];
  const url = window.location.href;

  const list = document.querySelector("div.race-info__session-content");
  if (list) {
    const items = Array.from(list.querySelectorAll("div.race-info__session-info"));
    items.forEach((item) => {
      const dateDiv = item.querySelector("div.race-info__cell--date");
      let month = null;
      let day = null;
      if (dateDiv) {
        const txt = dateDiv.textContent.trim();
        const parts = txt.split("/").map((s) => s.trim());
        if (parts.length >= 2) {
          day = parts[0].padStart(2, "0");
          month = parts[1].padStart(2, "0");
        }
      }

      const nameDiv = item.querySelector("div.race-info__cell--name");

      const timeDiv = item.querySelector("div.race-info__cell--time");

      const rawName = nameDiv ? nameDiv.textContent.trim() : null;
      const name = rawName ? window._.startCase(rawName.toLocaleLowerCase()) : null;

      const timeSpans = timeDiv ? Array.from(timeDiv.querySelectorAll("span")) : [];
      const localStartTime = timeSpans[0] ? timeSpans[0].textContent.trim() : null;
      const localEndTime = timeSpans[1] ? timeSpans[1].textContent.trim() : null;

      // Build localDate using Luxon: YYYY-MM-DD
      let localDate = null;
      try {
        if (year && month && day) {
          const dt = window.luxon.DateTime.fromFormat(`${year}-${month}-${day}`, "yyyy-LL-dd");
          if (dt.isValid) {
            localDate = dt.toISODate();
          }
        }
      } catch (_) {
        // leave localDate as null if parsing fails
      }

      data.push({ name, localDate, localStartTime, localEndTime });
    });
  }

  const meta = { url, nameFull, nameMedium };
  const out = window._UTILS.wrapData(data, meta);
  window._UTILS.showOverlayJson(out);
})();
