// GovCon Inc. - Modern Roadmap Visualizer (Phase View)
(function () {
  "use strict";

  const DATA = window.GOVCON_ROADMAPS;
  if (!DATA || !DATA.programs) return;

  function el(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content) {
      if (Array.isArray(content)) {
        content.forEach(c => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
      } else {
        node.innerHTML = content;
      }
    }
    return node;
  }

  // Helper to group tasks by Phase
  function groupByPhase(tasks) {
    const groups = {};
    const phases = []; // preserve order

    tasks.forEach(task => {
      // Normalize phase name
      let pName = task.phase || "Execution";
      if (!groups[pName]) {
        groups[pName] = { 
          name: pName, 
          tasks: [], 
          start: task.start, 
          end: task.end 
        };
        phases.push(pName);
      }
      
      const g = groups[pName];
      g.tasks.push(task);
      // Update duration range for the phase
      if (task.start < g.start) g.start = task.start;
      if (task.end > g.end) g.end = task.end;
    });

    return phases.map(p => groups[p]);
  }

  function calculateDays(s, e) {
    const d1 = new Date(s);
    const d2 = new Date(e);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff + " Days" : "1 Day";
  }

  function renderRoadmap(container, programKey) {
    const program = DATA.programs.find(p => p.key === programKey);
    if (!program) return;

    // Clear container
    container.innerHTML = "";
    container.className = "roadmap-container";

    // Header
    const phases = groupByPhase(program.tasks);

    // Render Phases
    phases.forEach((phase, index) => {
      const duration = calculateDays(phase.start, phase.end);
      
      // Task List
      const taskList = el("ul", "phase-tasks", 
        phase.tasks.map(t => {
          const ownerBadge = t.owner ? `<span class="task-owner">${t.owner}</span>` : "";
          return el("li", "task-item", `${t.name} ${ownerBadge}`);
        })
      );

      // Card Construction
      const card = el("div", "phase-card", [
        // Left Side: Header
        el("div", "phase-header", [
          el("div", "kicker", `Step 0${index + 1}`),
          el("div", "phase-title", phase.name),
          el("div", "phase-meta", [
            el("span", "phase-duration", `⏱ ${duration}`)
          ])
        ]),
        // Right Side: Content
        el("div", "phase-content", [
          taskList
        ])
      ]);

      container.appendChild(card);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-gantt]").forEach((node) => {
      const key = node.getAttribute("data-gantt");
      renderRoadmap(node, key);
    });
  });
})();
