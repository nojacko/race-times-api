(async function () {
  await window._UTILS.tapWait("button.w-full.flex.rounded-full", "Track time");

  const h1El = document.querySelector("h1");
  const nameFull = h1El ? h1El.textContent.trim() : null;
  const docTitle = document.title ? document.title.trim() : null;
  let nameMedium = docTitle ? docTitle.split(",")[0].trim() : null;
  nameMedium = nameMedium ? nameMedium.replace(/\b\d{4}\s*-\s*F1 Race$/i, "").trim() : null;

  // Extract year for localDate (YYYY-MM-DD)
  const yearFromTitle = docTitle ? (docTitle.match(/\b(\d{4})\b/)?.[1] ?? null) : null;
  const yearFromH1 = h1El ? (h1El.textContent.match(/\b(\d{4})\b/)?.[1] ?? null) : null;
  const year = yearFromTitle || yearFromH1;

  const data = [];

  const isPreSeasonTest = nameFull.includes("RE-SEASON TESTING");
  if (isPreSeasonTest) {
    const parts = docTitle.split("-");
    const last = parts.length ? parts[parts.length - 1].trim() : null;
    if (last) {
      nameMedium = last.replace(/\bTest\s+/i, "Pre-season Test ");
    }
  }

  const list = document.querySelector("ul.grid");
  if (list) {
    const items = Array.from(list.querySelectorAll("li"));
    items.forEach((li) => {
      const col1 = li.querySelector("span.row-span-2");
      const daySpan = col1.querySelector("span.typography-module_technical-l-bold__AKrZb");
      const monthSpan = col1.querySelector("span.typography-module_technical-s-regular__6LvKq");

      const col2 = li.querySelector("span.z-20.flex.flex-col.justify-center");
      const nameSpan = col2.querySelector("span.typography-module_display-m-bold__qgZFB");

      const col3 = li.querySelector("span.z-20.col-start-3");
      const timeContainer = col3.querySelector("span");

      const name = nameSpan ? nameSpan.textContent.trim() : null;
      const day = daySpan ? daySpan.textContent.trim() : null;
      const month = monthSpan ? monthSpan.textContent.trim() : null;

      const times = timeContainer ? Array.from(timeContainer.querySelectorAll("time")) : [];
      const localStartTime = times[0] ? times[0].textContent.trim() : null;
      const localEndTime = times[1] ? times[1].textContent.trim() : null;

      // Build localDate using Luxon: YYYY-MM-DD
      let localDate = null;
      try {
        if (year && month && day) {
          const dt = window.luxon.DateTime.fromFormat(`${year}-${month}-${day.padStart(2, "0")}`, "yyyy-LLL-dd");
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

  const meta = { nameFull, nameMedium };
  const out = window._UTILS.wrapData(data, meta);
  window._UTILS.showOverlayJson(out);
})();
