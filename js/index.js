import "../scss/index.scss";
import imgDar from "../assets/fr-dar.jpg";

let btnIsDragging = false;
let startx = 0;

let leftWidth = 0;
let rightWidth = 0;

document.addEventListener("DOMContentLoaded", () => {
  const sectionRight = document.querySelector("section#right");
  const contentRight = sectionRight.querySelector("#content");
  const imgRight = sectionRight.querySelector(".img img");
  const dataRight = sectionRight.querySelector("div#data");

  const btnCenter = document.querySelector("button#btn-center");
  const sectionLeft = document.querySelector("section#left");

  // img di sebelah kanan
  imgRight.src = imgDar;

  console.info("left : ", leftWidth, "right : ", rightWidth);

  // validasu bisa di scroll yang di sebelah kaann
  sectionRight.addEventListener("scroll", () => {
    if (sectionRight.scrollTop > 10) {
      contentRight.classList.add("scrolled");
      dataRight.classList.add("scrolled");
    } else {
      dataRight.classList.remove("scrolled");
      contentRight.classList.remove("scrolled");
    }
  });

  // mulai drag
  btnCenter.addEventListener("pointerdown", (e) => {
    btnIsDragging = true;

    startx = e.clientX;
    leftWidth = sectionLeft.offsetWidth;
    rightWidth = sectionRight.offsetWidth;

    btnCenter.setPointerCapture(e.pointerId);
  });

  // drag move
  btnCenter.addEventListener("pointermove", (e) => {
    if (!btnIsDragging) return;
    // menghitung jarak pergerakan mouse dari posisi awal saat pointerdown
    // nilai positif = mouse bergerak ke kanan
    // nilai negatif = mouse bergerak ke kiri
    const dx = e.clientX - startx;

    // menghitung ukuran baru untuk section kiri
    // jika mouse ke kanan maka section kiri akan membesar
    const newLeft = leftWidth + dx;

    // menghitung ukuran baru untuk section kanan
    // karena kiri membesar maka kanan harus mengecil
    const newRight = rightWidth - dx;

    // batas minimal ukuran panel agar tidak terlalu kecil
    // ini mencegah panel hilang atau width menjadi negatif
    const minWidth = 250;

    // validasi agar kedua panel tidak lebih kecil dari batas minimal
    // hanya jika keduanya valid maka ukuran akan diubah
    if (newLeft > minWidth && newRight > minWidth) {
      sectionLeft.style.width = newLeft + "px";
      sectionRight.style.width = newRight + "px";
    }
  });

  document.addEventListener("pointerup", () => {
    btnIsDragging = false;
  });
});
// saat tombol di tegah di lepas
btnCenter.addEventListener("pointerup", (e) => {
  btnIsDragging = false;
});
