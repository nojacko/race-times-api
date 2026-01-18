/**
 * Paste this into Firefox's console on an individual event page.
 */

(function () {
  // Attempt to click the "Track time" button if present
  try {
    const trackBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent && b.textContent.trim().includes("Track time"),
    );
    if (trackBtn) trackBtn.click();
  } catch (e) {
    console.error("Failed to click Track time button", e);
  }

  const titleEl = document.querySelector("h1");
  const nameFull = titleEl ? titleEl.textContent.trim() : null;
  const rawTitle = document.title ? document.title.trim() : null;
  const truncated = rawTitle ? rawTitle.split(",")[0].trim() : null;
  const nameMedium = truncated ? truncated.replace(/\b\d{4}\s*-\s*F1 Race$/i, "").trim() : null;

  const data = [];
  const url = window.location.href;
  const parts = url.split("/").filter(Boolean);
  const slug = parts.length ? parts[parts.length - 1] : null;

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
      const startTime = times[0] ? times[0].textContent.trim() : null;
      const endTime = times[1] ? times[1].textContent.trim() : null;

      data.push({ day, month, name, startTime, endTime });
    });
  }

  const meta = { url, slug, nameFull, nameMedium };
  const out = window._UTILS.wrapData(data, meta);
  window._UTILS.showOverlayJson(out, `${slug}.json`);
  return out;
})();
