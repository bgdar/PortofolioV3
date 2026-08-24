import "../scss/index.scss";

import { chageBg } from "./core/components.js";
import { KarirData, daftarBulan, daftarHari } from "./data/index.js";
import { waveDraw, cv, addTimeKarir, footer } from "./function/index.js";

import imgDar from "../assets/fr-dar.jpg"; // local , foto i'm lebih enak jika di deploy di satu tempat aja

let btnIsDragging = false;
let startx = 0;
let starty = 0;

let leftWidth = 0;
let rightWidth = 0;
let topHeigth = 0;
let downHeigth = 0;

let heigthDefault = 0;

const memory = navigator.deviceMemory;
console.log(`This device approximately ${memory}GiB of RAM.`);

// let windowsWidth = 0;

// const isDesktop = windowsWidth >= 768;
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

  const navbar = document.querySelector("nav");
  const navThemeBtn = navbar.querySelector("li button");

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

  btnCenter.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Mencegah menu pop-up muncul saat ditekan lama
  });

  // perubahan pada section kanan
  // mulai drag
  btnCenter.addEventListener("pointerdown", (e) => {
    // Kunci pointer ke tombol ini, meskipun jari bergeser keluar dari tombol
    btnCenter.setPointerCapture(e.pointerId);

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

    if (btnCenter.hasPointerCapture(e.pointerId)) {
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
    }
  });

  // saat tombol di tegah di lepas
  btnCenter.addEventListener("pointerup", (e) => {
    e.preventDefault();
    btnIsDragging = false;
    btnCenter.releasePointerCapture(e.pointerId);
  });

  // gelombang assigment
  waveDraw(waveRight, ctx, canvas);

  // -------------- PERJALAN KARIR SECTION --------------
  const perjalanKarirContn = dataRight.querySelector(
    "div#pejalanan div.timeline-container",
  );
  addTimeKarir(perjalanKarirContn, KarirData);

  //  NAVBAR SECTION
  navThemeBtn.addEventListener("click", () => {
    chageBg();
  });

  // FOOTER section
  if (IsDesktop) {
    const lastFooter = sectionLeft.querySelector("footer");
    if (lastFooter) {
      lastFooter.remove();
    }
    sectionRight.appendChild(footer());
  } else {
    const lastFooter = sectionRight.querySelector("footer");
    if (lastFooter) {
      lastFooter.remove();
    }
    sectionLeft.appendChild(footer());
  }
});
