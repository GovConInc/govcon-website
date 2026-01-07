// GovCon Inc. - lightweight interactive Gantt (no deps)
(function () {
  "use strict";

  const DATA = window.GOVCON_ROADMAPS;
  if (!DATA || !DATA.programs) return;

  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  function parseDate(s) {
    // Expect YYYY-MM-DD
    const d = new Date(s + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }

  function daysBetween(a, b) {
    return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
  }

  function formatDate(d) {
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function uniq(arr) {
    return Array.from(new Set(arr));
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(k => {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      children.forEach(ch => node.appendChild(typeof ch === "string" ? document.createTextNode(ch) : ch));
    }
    return node;
  }

  function computeRange(tasks) {
    let min = null;
    let max = null;
    tasks.forEach(t => {
      const s = parseDate(t.start);
      const e = parseDate(t.end);
      if (!s || !e) return;
      if (!min || s < min) min = s;
      if (!max || e > max) max = e;
    });
    return { min, max };
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function renderGantt(container, program) {
    const originalTasks = (program.tasks || []).map(t => ({
      ...t,
      name: (t.name || "").trim(),
      phase: (t.phase || "").trim() || "Phase",
      owner: (t.owner || "").trim() || "Team",
      priority: (t.priority || "").trim()
    })).filter(t => t.start && t.end);

    if (!originalTasks.length) {
      container.innerHTML = '<div class="callout">No roadmap data found.</div>';
      return;
    }

    const phases = ["All phases"].concat(uniq(originalTasks.map(t => t.phase)).sort());
    const owners = ["All owners"].concat(uniq(originalTasks.map(t => t.owner)).sort());

    let zoom = "week"; // week | day
    let phaseFilter = "All phases";
    let ownerFilter = "All owners";
    let query = "";

    // controls
    const header = el("div", { class: "gantt-header" }, [
      el("div", { class: "gantt-title" }, [
        el("div", { class: "badge" }, [program.name || "Roadmap"]),
        el("div", { class: "muted" }, [program.summary || ""])
      ]),
      el("div", { class: "gantt-controls" }, [
        el("label", { class: "gantt-label" }, ["Search", el("input", { type: "search", class: "gantt-input", placeholder: "Filter tasks..." })]),
        el("label", { class: "gantt-label" }, ["Phase", el("select", { class: "gantt-select" })]),
        el("label", { class: "gantt-label" }, ["Owner", el("select", { class: "gantt-select" })]),
        el("div", { class: "gantt-zoom" }, [
          el("button", { type: "button", class: "btn btn-small", "data-zoom": "week" }, ["Week"]),
          el("button", { type: "button", class: "btn btn-small", "data-zoom": "day" }, ["Day"])
        ])
      ])
    ]);

    const searchInput = header.querySelector('input[type="search"]');
    const phaseSelect = header.querySelectorAll("select")[0];
    const ownerSelect = header.querySelectorAll("select")[1];
    phases.forEach(p => phaseSelect.appendChild(el("option", { value: p }, [p])));
    owners.forEach(o => ownerSelect.appendChild(el("option", { value: o }, [o])));

    const wrap = el("div", { class: "gantt-wrap" }, []);
    const legend = el("div", { class: "gantt-legend muted" }, [
      "Tip: scroll horizontally. Click a bar for details."
    ]);
    const details = el("div", { class: "gantt-details card" }, [
      el("h3", null, ["Task details"]),
      el("div", { class: "muted" }, ["Select a task in the chart to see details here."])
    ]);

    const chartHost = el("div", { class: "gantt-chart-host" }, []);

    wrap.appendChild(chartHost);
    container.innerHTML = "";
    container.appendChild(header);
    container.appendChild(legend);
    container.appendChild(wrap);
    container.appendChild(details);

    function currentTasks() {
      return originalTasks.filter(t => {
        const matchPhase = (phaseFilter === "All phases") || (t.phase === phaseFilter);
        const matchOwner = (ownerFilter === "All owners") || (t.owner === ownerFilter);
        const q = query.trim().toLowerCase();
        const matchQuery = !q || (t.name.toLowerCase().includes(q) || t.phase.toLowerCase().includes(q) || t.owner.toLowerCase().includes(q));
        return matchPhase && matchOwner && matchQuery;
      });
    }

    function draw() {
      const tasks = currentTasks();
      const range = computeRange(tasks.length ? tasks : originalTasks);
      if (!range.min || !range.max) return;

      const unitDays = zoom === "day" ? 1 : 7;

      // snap range to unit boundaries
      const totalDays = daysBetween(range.min, range.max) + 1;
      const units = Math.ceil(totalDays / unitDays);
      const start = new Date(range.min.getTime());

      const grid = el("div", { class: "gantt-grid", style: `--gantt-cols:${units};` }, []);

      // header row
      const headerRow = el("div", { class: "gantt-row gantt-row-head" }, []);
      headerRow.appendChild(el("div", { class: "gantt-cell gantt-sticky" }, ["Task"]));
      for (let u = 0; u < units; u++) {
        const d = new Date(start.getTime() + u * unitDays * MS_PER_DAY);
        const label = zoom === "day"
          ? d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
          : `W${u + 1}`;
        headerRow.appendChild(el("div", { class: "gantt-cell gantt-colhead", title: formatDate(d) }, [label]));
      }
      grid.appendChild(headerRow);

      // rows
      tasks.forEach((t, idx) => {
        const s = parseDate(t.start);
        const e = parseDate(t.end);
        if (!s || !e) return;

        const offsetDays = daysBetween(start, s);
        const spanDays = daysBetween(s, e) + 1;

        const colStart = clamp(Math.floor(offsetDays / unitDays) + 1, 1, units);
        const colEnd = clamp(Math.ceil((offsetDays + spanDays) / unitDays) + 1, 2, units + 1);

        const row = el("div", { class: "gantt-row" }, []);
        const left = el("div", { class: "gantt-cell gantt-sticky" }, [
          el("div", { class: "gantt-task" }, [
            el("div", { class: "gantt-task-name" }, [t.name]),
            el("div", { class: "muted" }, [
              `${t.phase} • ${t.owner}` + (t.priority ? ` • ${t.priority}` : "")
            ])
          ])
        ]);
        row.appendChild(left);

        for (let u = 0; u < units; u++) row.appendChild(el("div", { class: "gantt-cell" }, []));

        const bar = el("button", {
          type: "button",
          class: "gantt-bar",
          style: `grid-column:${colStart + 1} / ${colEnd + 1};`,
          title: `${t.name}\n${t.phase} • ${t.owner}\n${t.start} → ${t.end}`
        }, [
          el("span", { class: "gantt-bar-label" }, [t.name])
        ]);

        bar.addEventListener("click", () => {
          const s2 = parseDate(t.start);
          const e2 = parseDate(t.end);
          const dur = s2 && e2 ? (daysBetween(s2, e2) + 1) : null;

          details.innerHTML = "";
          details.appendChild(el("h3", null, [t.name]));
          details.appendChild(el("div", { class: "muted" }, [
            `${t.phase} • ${t.owner}` + (t.priority ? ` • ${t.priority}` : "")
          ]));
          details.appendChild(el("div", { class: "pad" }, [
            el("div", null, [
              el("b", null, ["Dates: "]),
              `${t.start} → ${t.end}` + (dur ? ` (${dur} day${dur === 1 ? "" : "s"})` : "")
            ]),
            t.hours ? el("div", null, [el("b", null, ["Effort: "]), `${t.hours} hr`]) : el("div", null, []),
            t.cost ? el("div", null, [el("b", null, ["Direct labor (est.): "]), `$${t.cost.toFixed(2)}`]) : el("div", null, []),
            t.notes ? el("div", null, [el("b", null, ["Notes: "]), t.notes]) : el("div", null, [])
          ]));
          details.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });

        row.appendChild(bar);
        grid.appendChild(row);
      });

      chartHost.innerHTML = "";
      chartHost.appendChild(grid);

      // update zoom button state
      header.querySelectorAll("[data-zoom]").forEach(btn => {
        const active = btn.getAttribute("data-zoom") === zoom;
        btn.classList.toggle("primary", active);
      });
    }

    // bind controls
    searchInput.addEventListener("input", () => { query = searchInput.value || ""; draw(); });
    phaseSelect.addEventListener("change", () => { phaseFilter = phaseSelect.value; draw(); });
    ownerSelect.addEventListener("change", () => { ownerFilter = ownerSelect.value; draw(); });
    header.querySelectorAll("[data-zoom]").forEach(btn => {
      btn.addEventListener("click", () => { zoom = btn.getAttribute("data-zoom"); draw(); });
    });

    // initial
    draw();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-gantt]").forEach((node) => {
      const key = node.getAttribute("data-gantt");
      const program = DATA.programs.find(p => p.key === key);
      if (program) renderGantt(node, program);
    });
  });
})();
