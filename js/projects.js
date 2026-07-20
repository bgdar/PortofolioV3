import "../scss/projects.scss";
import { chageBg, databg } from "./core/components.js";
import {
  addProject,
  addProjects,
  cardProjectFavorit,
} from "./function/project.js";
import {
  projectFavorit,
  projectBot,
  projectGui,
  projectGame,
  projectWebs,
  projectDraws,
  projectTerminal,
  ProjectEngine,
} from "./data/project.js";

// global Variable
const speedRotation = 5;

// Catatan: Jika scroll dipasang di tingkat halaman, gunakan window bukan document.body
window.addEventListener("scroll", () => {
  const techContainers = document.querySelectorAll(".project-card__tech");

  techContainers.forEach((container) => {
    // Menghitung derajat putaran kontinu berdasarkan jarak scroll (makin besar scroll, makin berputar)
    // Dibagi 2 artinya setiap 1px scroll akan memutar elemen sebesar 0.5 derajat.
    const rotationDegree = window.scrollY / speedRotation;

    // Cukup update nilai rotasi global di tingkat kontainernya saja
    container.style.setProperty("--scroll-rot", `${rotationDegree}deg`);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const overlay = document.querySelector("div.overlayBgPopup");

  // favorite project
  const gridFavorite = document.querySelector("div#project-favorite");

  const web = main.querySelector("#web");
  const bots = main.querySelector("#bot");
  const terminal = main.querySelector("#terminal");
  const engine = main.querySelector("#engine");
  const game = main.querySelector("#game");
  const gui = main.querySelector("#gui");

  const gridWeb = web.querySelector(".projects__grid");
  const gridBot = bots.querySelector(".projects__grid");
  const gridTerminal = terminal.querySelector(".projects__grid");
  const gridEngine = engine.querySelector(".projects__grid");
  const gridGame = game.querySelector(".projects__grid");
  const gridGui = gui.querySelector(".projects__grid");

  const navbar = document.querySelector("nav");
  const navThemeBtn = navbar.querySelector("li#theme button");

  addProject(projectFavorit, gridFavorite);

  addProjects(projectGame, gridGame);
  addProjects(projectWebs, gridWeb);
  addProjects(projectBot, gridBot);
  addProjects(projectTerminal, gridTerminal);
  addProjects(ProjectEngine, gridEngine);
  addProjects(projectGui, gridGui);

  navThemeBtn.addEventListener("click", () => {
    chageBg(databg);
  });

  // section project detail
  const detailProject = document.body.querySelector("div.detail-project");
  const img = detailProject.querySelector("img");
  const heading = detailProject.querySelector("h3");

  const description = detailProject.querySelector("p#description");
  const closeBtn = detailProject.querySelector("button.close");

  console.info("detailt project : ", detailProject);

  const cardprojects = main.querySelectorAll("div.project-card");

  // terkhsusu projeck favorit
  const projeckfavoritCnt = document.querySelector("div.project-favorite-cnt");
  const projeckfavoritCard = projeckfavoritCnt.querySelector("div.card");
  cardProjectFavorit(projeckfavoritCard, projectFavorit);

  // Event untuk membuka card (Looping hanya untuk trigger buka)
  cardprojects.forEach((card) => {
    card.addEventListener("click", () => {
      detailProject.classList.add("active");
      overlay.classList.add("active");

      const projectName = card.querySelector("p.project-card__name");
      const projectCard = card.querySelector("div.project-card__tech");

      heading.textContent = projectName ? projectName.textContent : "";
      img.src = projectCard ? (projectCard.getAttribute("img-path") ?? "") : "";
      description.textContent = projectCard
        ? (projectCard.getAttribute("data-des") ?? "")
        : "";
    });
  });

  //Event untuk menutup card (Ditaruh di LUAR loop agar lebih bersih dan hemat memori)
  const closeCard = () => {
    detailProject.classList.remove("active");
    overlay.classList.remove("active");

    // Opsional: hapus konten setelah transisi selesai agar tidak terlihat patah
    setTimeout(() => {
      heading.textContent = "";
      img.src = "";
      description.textContent = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeCard);
  overlay.addEventListener("click", closeCard); // K
});
