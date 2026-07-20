export function addCard(toolsGrid, tools) {
  tools.forEach((t) => {
    const tmpl = `
          <div class="tool-card">
              <div class="tool-icon">
              ${t.tech_icon ? t.tech_icon : '<i class="ri-projector-2-line"></i>'}
              </div>
              <div class="tool-info">
                <h4>${t.name}</h4>
                <p>${t.des}</p>
              </div>
             ${t.badge ? `<span class='badge tech-blue'> ${t.badge}</span>` : ""}
            </div>
    `;
    toolsGrid.innerHTML += tmpl;
  });
}
