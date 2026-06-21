import "../scss/projects.scss";

const projectFavorit = [
  {
    name: "rant dashboard",
    repo: "https://github.com/bgdar/rant",
    img: "",
    tech: ["typerscript", "nest.js", "ejs", "webscoket", "rabbitMq"],
    tech_icon: [""],
    lang: "php",
    des: "Aplikasi Rant ytakni web dashboard utama",
  },
];

// pisahkan berdasarkan katagory
// teh dan tech_icon harus selaras, agar icon nya terlihat
const projectWebs = [
  {
    name: "my-bakery",
    repo: "https://github.com/bgdar/myBakery",
    img: "",
    tech: ["Goravel"],
    tech_icon: ["ri-instance-line"], // Gunakan class Remix Icon yang sesuai
    lang: "golang",
    des: "aplikasi perlaporan sampah",
  },
  {
    name: "sibersih",
    repo: "",
    img: "",
    tech: ["Laravel", "php"],
    tech_icon: ["ri-laravel-fill"],
    lang: "php",
    des: "aplikasi perlaporan sampah",
  },
  {
    name: "E-Learning",
    repo: "https://github.com/bgdar/E-Learning",
    img: "",
    tech: ["nest.js", "mustache", "typeorm", "argon2"],
    tech_icon: [
      "ri-node-js",
      "ri-code-s-slash-line",
      "ri-database-2-line",
      "ri-lock-password-line",
    ],
    lang: "Typescript",
    des: "aplikasi Pembelajaran Online",
  },
];

const projectGame = [];

const projectDraws = [
  {
    name: "doople virsualizer",
    repo: "https://github.com/bgdar/draws/tree/rust-doppler-visualize",
    img: "",
    tech: ["egui", "eframe"],
    tech_icon: ["ri-brush-line", "ri-window-line"],
    lang: "rust",
    des: "Visulasis gelombang dengan gelombang ",
  },
];

const projectGui = [
  {
    name: "paint",
    repo: "https://github.com/bgdar/paint",
    img: "",
    tech: ["egui", "eframe"],
    tech_icon: ["ri-brush-line", "ri-window-line"],
    lang: "rust",
    des: "Aplikasi Menggambar ",
  },
];

const projectTerminal = [
  {
    name: "m-shell",
    repo: "https://github.com/bgdar/m-shell",
    img: "",
    tech: ["rust"],
    tech_icon: ["ri-terminal-box-line"], // Ikon terminal/shell
    lang: "rust",
    des: "shell app like bash or zsh",
  },
  {
    name: "astfetch",
    repo: "https://github.com/bgdar/astfetch",
    img: "https://github.com/bgdar/astfetch/blob/main/img/astfetch.png",
    tech: ["golang"],
    tech_icon: ["ri-terminal-box-line"], // Ikon terminal/shell
    lang: "golang",
    des: "tools information system dengan golang murni",
  },
];

const projectBot = [
  {
    name: "rant",
    repo: "https://github.com/bgdar/bot-discord/tree/rant",
    img: "",
    tech: ["pycord"],
    tech_icon: ["ri-discord-line"], // Ikon resmi Discord
    lang: "python",
    des: "Bot discord untuk deteksi kata kata kasar (my tugas akhir )",
  },

  {
    name: "rant",
    repo: "https://github.com", // Ganti dengan URL repo telegram Anda jika ada
    img: "",
    tech: ["python-telegram-bot"],
    tech_icon: ["ri-telegram-2-line"], // Ikon resmi Telegram
    lang: "python",
    des: "Bot telegram untuk deteksi kata kata kasar",
  },
];

const ProjectEngine = [
  {
    name: "Http server",
    repo: "https://github.com/bgdar/Http-server", // Ganti dengan URL repo telegram Anda jika ada
    img: "",
    tech: ["zig"],
    tech_icon: ["ri-global-line"], // Ikon resmi Telegram
    lang: "zig",
    des: "Engine untuk Http ",
  },
  {
    name: "Qrcode",
    repo: "https://github.com/bgdar/web-QrCode/tree/master/qrcode", // Ganti dengan URL repo telegram Anda jika ada
    img: "",
    tech: ["rust"],
    tech_icon: ["ri-settings-5-line"], // Ikon resmi Telegram
    lang: "rust",
    des: "Qrcode generator ",
  },
];

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
  const overlay = document.querySelector("div.overlayBg");

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

  addProject(projectFavorit, gridFavorite);

  addProject(projectGame, gridGame);
  addProject(projectWebs, gridWeb);
  addProject(projectBot, gridBot);
  addProject(projectTerminal, gridTerminal);
  addProject(ProjectEngine, gridEngine);
  addProject(projectGui, gridGui);

  // section project detail
  const detailProject = document.body.querySelector("div.detail-project");
  const img = detailProject.querySelector("img");
  const heading = detailProject.querySelector("h3");

  const description = detailProject.querySelector("p#description");
  const closeBtn = detailProject.querySelector("button.close");

  console.info("detailt project : ", detailProject);

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
});

/**
 * tambah project berdasarkan data
 * projectName : array yang akan di berikan
 * projectGrid : grid container yang menampungnnya
 */
function addProject(projectName, projectGrid) {
  projectName.forEach((v) => {
    // buat `tech` mengelilingi element
    //

    const tmpl = `<div class="project-card">
  <div class="project-card__content">
    
    <div class="project-card__des">
    <p class="project-card__name">${v.name}</p>
      <div class="project-card__actions">
        <a href="${v.repo}" target="_blank" class="btn-repo">
          <i class="ri-github-line"></i>
        </a>
      </div>
    </div>

    <!--  INISIALISASI  Tambahkan --scroll-rot: 0deg; dan dll -->
    <div class="project-card__tech" data-des="${v.des}" img-path="${v.img}" data-total="${v.tech.length}" style="--total: ${v.tech.length}; --scroll-rot: 0deg;">
      ${v.tech
        .map(
          (t, i) => `
        <p class="elm"  data-original-index="${i}" style="--i: ${i + 1};">

          <span class="tech-badge">
        <i class="${v.tech_icon[i]}" || "ri-code-line ></i> 
          ${t}</span>
          
        </p>
      `,
        )
        .join("")}
    </div>
  </div>
</div>`;

    // style nya di tambhaakn berdasarkan nilai i untuk menentukan di mana letaknya
    projectGrid.innerHTML += tmpl;
  });
}
