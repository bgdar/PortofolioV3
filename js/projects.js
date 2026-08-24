import "../scss/projects.scss";
import { chageBg } from "./core/components.js";
import {
  addProject,
  addProjects,
  cardProjectFavorit,
  cntTechRotate,
  mainCntPerspektive3D,
} from "./function/project.js";
import {
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
let isMainCntScroll = false; // menandakan jika masih dalam kondisi scroll di <main>
let touchStartYDp = 0;
// const isDesktop = windowsWidth >= 768;
let IsDesktop = window.matchMedia("(min-width: 1000px)").matches;

// Catatan: Jika scroll dipasang di tingkat halaman, gunakan window bukan document.body
window.addEventListener("scroll", () => {
  const techContainers = document.querySelectorAll(".project-card__tech");

  cntTechRotate(techContainers, window.scrollY, speedRotation);
});

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const overlay = document.querySelector("div.overlayBgPopup");

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

  addProjects(projectGame, gridGame);
  addProjects(projectWebs, gridWeb);
  addProjects(projectBot, gridBot);
  addProjects(projectTerminal, gridTerminal);
  addProjects(ProjectEngine, gridEngine);
  addProjects(projectGui, gridGui);

  // element dengan harapa sudah di tambah
  const techContainers = document.querySelectorAll(".project-card__tech");
  const subElmCardDes = main.querySelectorAll(".project-card__des");
  const subElmCard = main.querySelectorAll(".project-card");

  navThemeBtn.addEventListener("click", () => {
    chageBg();
  });

  // section project detail
  const detailProject = document.body.querySelector("div.detail-project");
  const img = detailProject.querySelector("img");
  const heading = detailProject.querySelector("h3");

  const description = detailProject.querySelector("p#description");
  const closeBtn = detailProject.querySelector("button.close");

  const cardprojects = main.querySelectorAll("div.project-card");

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

  // evek overlay pada main
  // untuk sekarang khusus Desktop , karena HP ada poblem scroll dan banyak makan performance
  main.addEventListener("scroll", () => {
    isMainCntScroll = main.scrollTop >= 10;

    if (!isMainCntScroll) {
      // matiin samapi keluar ke atas kembali
      document.body.style.overflow = "hidden";
    }

    console.info("kondisimain : ", isMainCntScroll);
    if (IsDesktop) {
      cntTechRotate(techContainers, main.scrollTop, speedRotation);

      mainCntPerspektive3D(main, subElmCard, subElmCardDes);
    }
  });
});

// Solusi agar bisa keluar ke atas kembali: deteksi scroll ke atas
window.addEventListener("wheel", (e) => {
  // Jika sedang terkunci dan pengguna scroll ke atas (deltaY negatif)
  if (document.body.style.overflow === "hidden" && e.deltaY < 0) {
    if (!isMainCntScroll) {
      document.body.style.overflow = "auto";
    }
  }
});

// Solusi untuk pengguna HP (Touchscreen)
window.addEventListener("touchstart", (e) => {
  touchStartYDp = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  let touchMoveYDp = e.touches[0].clientY;
  // Jika swipe ke bawah (artinya mau scroll ke atas)
  if (
    document.body.style.overflow === "hidden" &&
    touchMoveYDp > touchStartYDp
  ) {
    if (!isMainCntScroll) {
      document.body.style.overflow = "auto";
    }
  }
});
