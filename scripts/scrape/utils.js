/**
 * Utility to show a fullscreen overlay with formatted JSON in a textarea.
 * Paste this into the console before running other scripts so `showOverlayJson`
 * is available globally.
 */
(function () {
  window._UTILS = {
    showOverlayJson: function (data) {
      const overlayId = "scrape_overlay";
      const existing = document.getElementById(overlayId);
      if (existing) existing.remove();
      const overlay = document.createElement("div");
      overlay.id = overlayId;
      Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        zIndex: "2147483647",
      });

      const container = document.createElement("div");
      Object.assign(container.style, {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "stretch",
        width: "100%",
        maxWidth: "1200px",
      });

      const controls = document.createElement("div");
      Object.assign(controls.style, { display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" });

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.textContent = "Copy JSON";
      Object.assign(copyBtn.style, {
        padding: "8px 12px",
        fontSize: "13px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        background: "#fff",
        color: "#000",
      });

      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.textContent = "Close";
      Object.assign(closeBtn.style, {
        padding: "8px 12px",
        fontSize: "13px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        background: "#eee",
        color: "#000",
      });

      const ta = document.createElement("textarea");
      ta.value = JSON.stringify(data, null, 2);
      Object.assign(ta.style, {
        width: "100%",
        height: "80vh",
        padding: "12px",
        fontFamily: "monospace",
        fontSize: "12px",
        whiteSpace: "pre",
        resize: "both",
        border: "1px solid #444",
        borderRadius: "6px",
        background: "#333",
        color: "#fff",
        boxSizing: "border-box",
      });

      // prevent overlay clicks when interacting with textarea or controls
      ta.addEventListener("click", (e) => e.stopPropagation());
      ta.addEventListener("mousedown", (e) => e.stopPropagation());
      copyBtn.addEventListener("click", (e) => e.stopPropagation());
      closeBtn.addEventListener("click", (e) => e.stopPropagation());

      // cleanup helper
      function closeOverlay() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }

      // copy handler
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
          const prev = copyBtn.textContent;
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = prev;
          }, 1500);
        } catch (err) {
          copyBtn.textContent = "Copy failed";
          setTimeout(() => {
            copyBtn.textContent = "Copy JSON";
          }, 1500);
        }
      });

      closeBtn.addEventListener("click", () => {
        closeOverlay();
      });

      controls.appendChild(copyBtn);
      controls.appendChild(closeBtn);
      container.appendChild(ta);
      container.appendChild(controls);
      overlay.appendChild(container);
      document.body.appendChild(overlay);
    },
    wrapData: function (data, meta) {
      return {
        url: window.location.href,
        update_at: new Date().toISOString(),
        ...(meta || {}),
        data,
      };
    },
  };
})();
