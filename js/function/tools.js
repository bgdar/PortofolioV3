export function addCard(toolsGrid, tools) {
  tools.forEach((t) => {
    const tmpl = `
  <div class="tool-card ${t.hov_color_class || ''}">
    <div class="tool-icon">
      ${t.tech_icon ? t.tech_icon : '<i class="ri-code-s-slash-line"></i>'}
    </div>
    <div class="tool-info">
      <h4>${t.name}</h4>
      <p>${t.des}</p>
    </div>
    ${t.badge ? `<span class="badge ${t.hov_color_class}">${t.badge}</span>` : ""}
  </div>
`;    toolsGrid.innerHTML += tmpl;
  });
}
