/**
 * Utility to show a fullscreen overlay with formatted JSON in a textarea.
 * Paste this into the console before running other scripts so `showOverlayJson`
 * is available globally.
 */
(function () {
  window._UTILS = {
    showOverlayJson: function (data, filename) {
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
        background: "rgba(0,0,0,0.9)",
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

      let copyFileBtn;
      if (filename) {
        copyFileBtn = document.createElement("button");
        copyFileBtn.type = "button";
        copyFileBtn.textContent = `Copy ${filename}`;
        Object.assign(copyFileBtn.style, {
          padding: "8px 12px",
          fontSize: "13px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          background: "#fff",
          color: "#000",
        });
      }

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
      if (copyFileBtn) copyFileBtn.addEventListener("click", (e) => e.stopPropagation());
      copyBtn.addEventListener("click", (e) => e.stopPropagation());
      closeBtn.addEventListener("click", (e) => e.stopPropagation());

      // cleanup helper
      function closeOverlay() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }

      // generic copy button setup: wires stopPropagation + clipboard copy + temporary label
      function setupCopyButton(btn, getText, defaultLabel) {
        if (!btn) return;
        btn.addEventListener("click", (e) => e.stopPropagation());
        btn.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(typeof getText === "function" ? getText() : getText);
            const prev = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(() => {
              btn.textContent = prev || defaultLabel;
            }, 1500);
          } catch (err) {
            const prev = btn.textContent;
            btn.textContent = "Copy failed";
            setTimeout(() => {
              btn.textContent = prev || defaultLabel;
            }, 1500);
          }
        });
      }

      // attach generic copy handlers
      setupCopyButton(copyBtn, () => JSON.stringify(data, null, 2), "Copy JSON");
      if (copyFileBtn) setupCopyButton(copyFileBtn, () => filename, `Copy ${filename}`);

      closeBtn.addEventListener("click", () => {
        closeOverlay();
      });

      if (copyFileBtn) controls.appendChild(copyFileBtn);
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
        updatedAt: new Date().toISOString(),
        ...(meta || {}),
        data,
      };
    },
  };
})();
