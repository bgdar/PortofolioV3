import "../scss/index.scss";
import imgDar from "../assets/fr-dar.jpg";

let btnIsDragging = false;
let startx = 0;
let starty = 0;

let leftWidth = 0;
let rightWidth = 0;
let topHeigth = 0;
let downHeigth = 0;

let heigthDefault = 0;

// let windowsWidth = 0;

// const isDesktop = windowsWidth >= 768;
// const ISDESKTOP = window.matchMedia("(min-width: 1000px)").matches;
let IsDesktop = window.matchMedia("(min-width: 1000px)").matches;

function cv(perent) {
  const button = perent.getElementById("downloadBtn");

  button.addEventListener("click", function (e) {
    // Ripple effect
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);

    // Loading animation
    button.classList.add("loading");

    // Simulasi download
    setTimeout(() => {
      button.classList.remove("loading");

      const link = document.createElement("a");
      link.href = "cv.pdf";
      link.download = "My-CV.pdf";
      link.click();
    }, 1500);
  });
}

async function getGitHubProfile() {
  try {
    const username = "bgdar"
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    const cardGithub = document.querySelector("div#github")
    console.info("ard",cardGithub);

    if (response.ok) {
      cardGithub.querySelector("#gh-avatar").src = data.avatar_url;
      cardGithub.querySelector("#gh-name").textContent = data.name || data.login;
      cardGithub.querySelector("#gh-bio").textContent = data.bio || "Tidak ada bio.";
      cardGithub.querySelector("#gh-link").href = data.html_url;
    } else {
      cardGithub.querySelector("#gh-name").textContent = "User tidak ditemukan";
    }
  } catch (error) {
    console.error("Gagal mengambil data GitHub:", error);
  }
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", getGitHubProfile);
document.addEventListener("DOMContentLoaded", () => {
  const sectionRight = document.querySelector("section#right");
  const contentRightStatic = sectionRight.querySelector("#content-static");
  const contentRightTop = sectionRight.querySelector("#content-top");

  const imgStaticRight = contentRightStatic.querySelector(".img img");
  const imgTopRight = contentRightTop.querySelector(".img img");
  const dataRight = sectionRight.querySelector("div#data");

  const btnCenter = document.querySelector("button#btn-center");
  const sectionLeft = document.querySelector("section#left");

  // img di sebelah kanan
  imgStaticRight.src = imgDar;
  imgTopRight.src = imgDar;

  heigthDefault = contentRightStatic.style.heigth;

  // default
  contentRightTop.style.width = sectionRight.offsetWidth + "px";

  const heigthContentStatic = contentRightStatic.offsetHeight;

  // validasu bisa di scroll yang di sebelah kaann
  sectionRight.addEventListener("scroll", () => {
    // if (sectionRight.scrollTop > 10) {
    if (sectionRight.scrollTop > 10 + heigthContentStatic) {
      contentRightTop.classList.add("scrolled");
      dataRight.classList.add("scrolled");
    } else {
      dataRight.classList.remove("scrolled");
      contentRightTop.classList.remove("scrolled");
    }
  });

  // cv download
  const cvPerent = dataRight.querySelector("#cv");
  // cv(cvPerent);
  // getGitHubProfile()

  // handle sroll cotainer
  window.addEventListener("resize", () => {
    const windowsWidth = window.innerWidth;
    // IsDesktop = windowsWidth > 963 ? true : false;
    if (windowsWidth >= 963) {
      IsDesktop = true;
      // kembali ke default
      sectionLeft.style.top = 0;
      sectionRight.style.top = 0;
    } else {
      false;
    }
    console.info(windowsWidth, IsDesktop);
  });

  // mulai drag
  btnCenter.addEventListener("pointerdown", (e) => {
    btnIsDragging = true;

    startx = e.clientX;
    starty = e.clientY;

    leftWidth = sectionLeft.offsetWidth;
    rightWidth = sectionRight.offsetWidth;

    topHeigth = sectionLeft.offsetHeight;
    downHeigth = sectionRight.offsetHeight;

    btnCenter.setPointerCapture(e.pointerId);
  });

  // drag move
  btnCenter.addEventListener("pointermove", (e) => {
    if (!btnIsDragging) return;
    // menghitung jarak pergerakan mouse dari posisi awal saat pointerdown
    // nilai positif = mouse bergerak ke kanan
    // nilai negatif = mouse bergerak ke kiri
    const dx = e.clientX - startx;
    const dy = e.clientY - starty;

    // menghitung ukuran baru untuk section kiri
    // jika mouse ke kanan maka section kiri akan membesar
    const newLeft = leftWidth + dx;

    // menghitung ukuran baru untuk section kanan
    // karena kiri membesar maka kanan harus mengecil
    const newRight = rightWidth - dx;

    const newTop = topHeigth + dy;
    const newDown = downHeigth - dy;

    // batas minimal ukuran panel agar tidak terlalu kecil
    // ini mencegah panel hilang atau width menjadi negatif
    const minWidth = 350;

    const minHeigth = 350;

    // validasi agar kedua panel tidak lebih kecil dari batas minimal
    // hanya jika keduanya valid maka ukuran akan diubah
    if (newLeft > minWidth && newRight > minWidth && IsDesktop) {
      sectionLeft.style.width = newLeft + "px";
      sectionRight.style.width = newRight + "px";

      //samain ukuran right section
      contentRightTop.style.width = newRight  + "px";
    }
    if (newTop > minHeigth && newDown > minHeigth && !IsDesktop) {
      sectionLeft.style.height = newTop + "px";
      sectionRight.style.height = newDown + "px";

    }
  });

  btnCenter.addEventListener("pointerup", () => {
    btnIsDragging = false;
  });
  // saat tombol di tegah di lepas
  btnCenter.addEventListener("pointerup", (e) => {
    e.preventDefault();
    btnIsDragging = false;
  });
});
