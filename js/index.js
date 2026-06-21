import "../scss/index.scss";
import imgDar from "../assets/fr-dar.jpg";

const pejalanan_kari = [];

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

// left canvas
const canvas = document.getElementById("visual");
const ctx = canvas.getContext("2d");
// Konfigurasi Gelombang (Bisa Anda ubah nilainya sesuai selera)
const waveRight = {
  y: canvas.height / 2, // Posisi vertikal tengah gelombang
  length: 0.01, // Jarak antar lekukan gelombang (semakin kecil semakin lebar)
  amplitude: 80, // Tinggi gelombang
  frequency: 0.03, // Kecepatan gerak/looping gelombang
};

// ------------ Funtion Inisialiasi Property  start --------
// function resizeCanvas(winHeigth, winWidth) {
//   canvas.width = winHeigth;
//   canvas.height = winWidth;
//   wave.y = canvas.height / 2; // Perbarui titik tengah saat layar berubah ukuran
// }
// ------------ Funtion Inisialiasi Property  End -------

// ------------ Funtion Inisialiasi Web start --------

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

// funciton untuk menggambar gelombang di canvas
function waveDraw() {
  // Variabel untuk menggerakkan waktu/animasi
  let increment = waveRight.frequency;

  // Fungsi untuk menyesuaikan ukuran canvas dengan layar monitor secara otomatis

  // Fungsi Utama untuk Menggambar Animasi (Looping)
  function animate() {
    requestAnimationFrame(animate);

    // Bersihkan canvas pada setiap frame agar tidak menumpuk
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Membuat warna gradasi linear (Cyan ke Ungu Neon) untuk garis gelombang
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#141414");
    gradient.addColorStop(0.5, "#3b82f6");
    gradient.addColorStop(1, "#cfcfcf");

    // Mulai menggambar jalur garis gelombang
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    // Looping koordinat X dari ujung kiri ke ujung kanan layar
    for (let i = 0; i < canvas.width; i++) {
      // Rumus Matematika Gelombang Sinus
      const yCoord =
        waveRight.y +
        Math.sin(i * waveRight.length + increment) * waveRight.amplitude;
      ctx.lineTo(i, yCoord * 4);
    }

    // Pengaturan gaya garis
    ctx.strokeStyle = gradient; // Menerapkan warna gradasi
    ctx.lineWidth = 4; // Ketebalan garis gelombang
    ctx.lineCap = "round"; // Ujung garis membulat halus
    ctx.stroke(); // Gambar garis ke layar

    // Geser posisi gelombang secara terus menerus untuk efek animasi berjalan
    increment += waveRight.frequency;
  }

  // Mulai jalankan animasi
  animate();
}

// ------------ Funtion Inisialiasi Web end --------

function paralaxBg() {}

// Jalankan fungsi saat halaman dimuat
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

  // handle perubahan windows
  window.addEventListener("resize", () => {
    const windowsWidth = window.innerWidth;

    // IsDesktop = windowsWidth > 963 ? true : false;
    if (windowsWidth >= 963) {
      IsDesktop = true;
      // kembali ke default
      sectionLeft.style.top = 0;
      sectionRight.style.top = 0;
    } else {
      IsDesktop = false;
    }
    console.info(windowsWidth, IsDesktop);

    // inisilasi resize jika ada perubahan windows
    canvas.width = sectionRight.offsetWidth;
    canvas.height = sectionRight.offsetHeight;
    waveRight.y = canvas.height / 2; // Perbarui titik tengah saat layar berubah ukuran
  });

  // Menentukan ukuran awal canvas sebelum animasi pertama kali berjalan
  canvas.width = sectionRight.offsetWidth;
  canvas.height = sectionRight.offsetHeight;

  // perubahan pada section kanan

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
      contentRightTop.style.width = newRight + "px";
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

  // gelombang assigment
  waveDraw();
});

function addTimeKarir(timelineContainer, data) {
  data.forEach((value) => {
    const tmpl = `<div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-date">2024 - Sekarang</div>
                <div class="timeline-content">
                    <h3>Senior Web Developer</h3>
                    <h4 class="company">PT Teknologi Maju</h4>
                    <p>Memimpin tim pengembang untuk membangun aplikasi web berskala besar menggunakan teknologi modern.</p>
                </div>
            </div>`;

    timelineContainer.innerHTML += tmpl;
  });
}
