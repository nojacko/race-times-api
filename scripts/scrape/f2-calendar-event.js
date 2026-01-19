(async function () {
  const articleEl = document.querySelector("div.circuit-header-wrapper .container");

  const parseScheduleDates = (text) => {
    if (!text) return [];

    const match = text.match(/^(\d{2})-(\d{2})\s+(\w+)\s+(\d{4})$/);
    if (!match) return [];

    const [, startDayStr, endDayStr, monthName, yearStr] = match;
    const startDay = Number(startDayStr);
    const endDay = Number(endDayStr);
    const year = Number(yearStr);

    if (Number.isNaN(startDay) || Number.isNaN(endDay) || Number.isNaN(year)) {
      return [];
    }

    try {
      // Use Luxon to parse month name and validate
      const dt = window.luxon.DateTime.fromFormat(`${monthName} 1`, "MMMM d");
      if (!dt.isValid) return [];
      const monthIndex = dt.month;

      const dates = [];
      for (let day = startDay; day <= endDay; day += 1) {
        const luxonDt = window.luxon.DateTime.utc(year, monthIndex, day);
        dates.push(luxonDt);
      }
      return dates;
    } catch (_) {
      return [];
    }
  };

  // Extract year from h1 tag
  const h1El = document.querySelector("h1");
  const h1Text = h1El ? h1El.textContent.trim() : "";
  const yearMatch = h1Text.match(/(\d{4})/);
  const yearFromH1 = yearMatch ? yearMatch[1] : "";

  const countryCircuitDiv = articleEl ? articleEl.querySelector("div.country-circuit p") : null;
  const nameFull = countryCircuitDiv ? countryCircuitDiv.textContent.trim() : null;
  const nameMedium = nameFull;
  const slug = nameFull ? window._UTILS.slugify(nameFull) : null;

  const scheduleSpan = document.querySelector("div.schedule span:nth-of-type(2)");
  const scheduleText = scheduleSpan ? scheduleSpan.textContent.trim() : "";
  const scheduleDates = parseScheduleDates(scheduleText);

  const data = [];
  const items = document.querySelectorAll("div.circuit-col .pin-col .pin");
  items.forEach((item) => {
    const divs = item.querySelectorAll("div");
    if (divs.length === 0) return;

    const name = divs[0]?.textContent.trim() ?? "";
    const weekdayLowercase = divs[1]?.textContent.trim().toLowerCase() ?? ""; // Full weekday name (e.g., "Thursday")
    const timeText = divs[2]?.textContent.trim() ?? ""; // e.g., "09:30" or "TBC"
    const tbc = /^TBC$/i.test(timeText);

    // Find matching date from scheduleDates by weekday
    const matchedDate = scheduleDates.find((d) => {
      return d.toFormat("cccc").toLowerCase() == weekdayLowercase;
    });
    let dayNum = matchedDate ? String(matchedDate.day).padStart(2, "0") : "";
    let month = matchedDate ? matchedDate.toFormat("LLL") : "";

    // Compute start and end times
    let localStartTime = "TBC";
    let localEndTime = "TBC";
    if (!tbc) {
      const m = timeText.match(/^(\d{1,2}):(\d{2})$/);
      if (m) {
        localStartTime = m;
      }
    }

    // Create ISO date (YYYY-MM-DD)
    let localDate = "";
    if (yearFromH1 && dayNum && month) {
      // Parse month string to number using Luxon
      const monthDt = window.luxon.DateTime.fromFormat(month, "LLL");
      const monthNum = String(monthDt.month).padStart(2, "0");
      localDate = `${yearFromH1}-${monthNum}-${dayNum}`;
    }

    data.push({ name, localDate, localStartTime, localEndTime });
  });

  const meta = {
    url: window.location.href,
    slug,
    nameFull: nameFull || "",
    nameMedium: nameMedium || "",
  };
  const out = window._UTILS.wrapData(data, meta);
  window._UTILS.showOverlayJson(out, `${slug}.json`);
})();
