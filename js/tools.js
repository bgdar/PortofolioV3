import "../scss/tools.scss";

// --- SEMAU DATA
// tech_icon : default bisa undifine
// badge : default bisa null

const languageData = [
  {

    tech_icon: '<i class="ri-javascript-fill"></i>',
    des: "bahasa pembrograma pertama sekaligus favorite",
    badge: null,
    hov_color_class: "kuning",
  },
];

const desainAppData = [
  {
    name: "Github",
    tech_icon: '<i class="ri-github-fill"></i>',
    des: "Platfrom terpusat untuk git",
    badge: "intermedet",
    hov_color_class: "hitam",
  },
];

const workflowData = [
  {
    name: "git",
    tech_icon: '<i class="ri-github-fill"></i>',
    des: "Platfrom terpusat untuk git",
    badge: "intermedet",
    hov_color_class: "merah",
  },

  {
    name: "Canvas",
    tech_icon: '<i class="ri-painting-fill"></i>',
    des: "Tools desain online",
    badge: "intermedet",
    hov_color_class: "biru",
  },
];

const Virsulasilasi = [
 {
    name: "docker",
    tech_icon: '<i class="ri-painting-fill"></i>',
    des: "Tools desain online",
    badge: "intermedet",
   profile : "https://hub.docker.com/u/bgdar",
    hov_color_class: "biru",
  },
]

document.addEventListener("DOMContentLoaded", function () {
  const toolsLanguageContainer = document.querySelector(
    "div.container-language",
  ); 
  const toolsWorkflowContainer = document.querySelector(
    "div.container-workflow",
  );

  const toolsLanguageGrid =
    toolsLanguageContainer.querySelector("div.tools-grid");
  const toolsWorkflowGrid =
    toolsWorkflowContainer.querySelector("div.tools-grid");

  addCard(toolsLanguageGrid, languageData);
  addCard(toolsWorkflowGrid, workflowData);
});

function addCard(toolsGrid, tools) {
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
