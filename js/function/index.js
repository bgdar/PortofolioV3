// ------------ Funtion Inisialiasi Property  start --------
// function resizeCanvas(winHeigth, winWidth) {
//   canvas.width = winHeigth;
//   canvas.height = winWidth;
//   wave.y = canvas.height / 2; // Perbarui titik tengah saat layar berubah ukuran
// }



export function cv(perent) {
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
export function waveDraw(waveRight, ctx , canvas) {
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

export function addTimeKarir(timelineContainer, data) {
  data.forEach((value) => {
    const tmpl = `<div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${value.date}</div>
                <div class="timeline-content">
                    <h3>Senior ${value.judul}</h3>
                    <h4 class="company">${value.company}</h4>
                    <p>${value.des}</p>
                </div>
            </div>`;

    timelineContainer.innerHTML += tmpl;
  });
}
