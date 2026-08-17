// ------------ Funtion Inisialiasi Property  start --------
// function resizeCanvas(winHeigth, winWidth) {
//   canvas.width = winHeigth;
//   canvas.height = winWidth;
//   wave.y = canvas.height / 2; // Perbarui titik tengah saat layar berubah ukuran
// }

import { daftarBulan, daftarHari } from "../data";

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
export function waveDraw(waveRight, ctx, canvas) {
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

/*
 * buat manual footer dengan createElement , jika dengan innerHTML akan mereload Element
 */
export function footer() {
  const timeNow = new Date();

  const year = timeNow.getFullYear();
  const day = timeNow.getDay();
  const month = timeNow.getMonth();
  const hour = timeNow.getHours();
  const date = timeNow.getDate();

  const footerText = `Bgdar ${daftarHari[day]}, ${date} ${daftarBulan[month]} ${year} - Jam ${hour} `;

  const footer = document.createElement("footer");

  // --- bagian  wave svg ---
  const footerWave = document.createElement("div");
  footerWave.className = "footer-wave";

  // SVG harus menggunakan createElementNS dengan XML namespace yang tepat
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("data-name", "Layer 1");
  svg.setAttribute("viewBox", "0 0 1200 120");
  svg.setAttribute("preserveAspectRatio", "none");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V11.8C59.9,37.3,124,54.6,188.7,58.33,233,60.89,277.6,60.19,321.39,56.44Z",
  );
  path.setAttribute("class", "shape-fill"); // Khusus SVG gunakan baseVal untuk class

  svg.appendChild(path);
  footerWave.appendChild(svg);
  footer.appendChild(footerWave);

  // --- bagian container links ---
  const footerContainer = document.createElement("div");
  footerContainer.className = "footer-container";

  const footerLinksGrid = document.createElement("div");
  footerLinksGrid.className = "footer-links-grid";

  // Fungsi bantuan (helper) untuk mempercepat pembuatan baris tautan
  function createLink(href, iconClass, text) {
    const a = document.createElement("a");
    a.href = href;
    if (href !== "" && href !== "#") {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    if (iconClass) {
      const i = document.createElement("i");
      i.className = iconClass;
      a.appendChild(i);
      a.appendChild(document.createTextNode(" " + text));
    } else {
      a.textContent = text;
    }
    return a;
  }

  // Kolom 1: Tech Stack
  const colTech = document.createElement("div");
  colTech.className = "footer-column tech-stack-column";
  const h5Tech = document.createElement("h5");
  h5Tech.textContent = "Building With";
  colTech.appendChild(h5Tech);
  colTech.appendChild(createLink("", "ri-sass-line", "Sass"));
  colTech.appendChild(
    createLink("https://mozilla.org", "ri-css3-line", "CSS3"),
  );
  colTech.appendChild(
    createLink("https://mozilla.org", "ri-html5-line", "HTML5"),
  );
  colTech.appendChild(
    createLink("https://mozilla.org", "ri-javascript-line", "JavaScript"),
  );
  colTech.appendChild(
    createLink("https://js.org", "ri-webpack-line", "Webpack"),
  );

  // Kolom 2: Shop
  const colShop = document.createElement("div");
  colShop.className = "footer-column";
  const h5Shop = document.createElement("h5");
  h5Shop.textContent = "Shop";
  colShop.appendChild(h5Shop);
  colShop.appendChild(createLink("#", null, "Web Apps"));
  colShop.appendChild(createLink("#", null, "Telegram Bots"));
  colShop.appendChild(createLink("#", null, "Discord Bots"));
  colShop.appendChild(createLink("#", null, "CLI Tools"));

  // Kolom 3: Learn
  const colLearn = document.createElement("div");
  colLearn.className = "footer-column";
  const h5Learn = document.createElement("h5");
  h5Learn.textContent = "Learn";
  colLearn.appendChild(h5Learn);
  colLearn.appendChild(createLink("#", null, "Our Story"));
  colLearn.appendChild(createLink("#", null, "Blog Posts"));
  colLearn.appendChild(createLink("#", null, "Tech Stack"));
  colLearn.appendChild(createLink("#", null, "Open Source"));

  // Gabungkan semua kolom ke grid
  footerLinksGrid.appendChild(colTech);
  footerLinksGrid.appendChild(colShop);
  footerLinksGrid.appendChild(colLearn);
  footerContainer.appendChild(footerLinksGrid);
  footer.appendChild(footerContainer);

  // --- bagian footer bottom ---
  const footerBottom = document.createElement("div");
  footerBottom.className = "footer-bottom";

  const pBottom = document.createElement("p");
  pBottom.innerHTML = "&copy; "; // Menggunakan innerHTML khusus entitas simbol ©

  const spanText = document.createElement("span");
  spanText.textContent = ` ${footerText} `;

  pBottom.appendChild(spanText);
  pBottom.appendChild(document.createTextNode(". All Rights Reserved."));
  footerBottom.appendChild(pBottom);
  footer.appendChild(footerBottom);

  // Mengembalikan object Node elemen tunggal footer
  return footer;

  //
  //  return `
  // <footer>
  //          <!-- Efek Garis Melengkung Atas (Wave SVG) -->
  //          <div class="footer-wave">
  //            <svg
  //              data-name="Layer 1"
  //              xmlns="http://w3.org"
  //              viewBox="0 0 1200 120"
  //              preserveAspectRatio="none"
  //            >
  //              <!-- Path ini otomatis mengisi area bawah dan membentuk gelombang mulus di permukaan atas footer -->
  //              <path
  //                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V11.8C59.9,37.3,124,54.6,188.7,58.33,233,60.89,277.6,60.19,321.39,56.44Z"
  //                class="shape-fill"
  //              ></path>
  //            </svg>
  //          </div>
  //
  //          <div class="footer-container">
  //            <div class="footer-links-grid">
  //              <div class="footer-column tech-stack-column">
  //                <h5>Building With</h5>
  //                <a
  //                  href=""
  //                  target="_blank"
  //                  rel="noopener noreferrer"
  //                >
  //                  <i class="ri-sass-line"></i> Sass
  //                </a>
  //                <a
  //                  href="https://mozilla.org"
  //                  target="_blank"
  //                  rel="noopener noreferrer"
  //                >
  //                  <i class="ri-css3-line"></i> CSS3
  //                </a>
  //                <a
  //                  href="https://mozilla.org"
  //                  target="_blank"
  //                  rel="noopener noreferrer"
  //                >
  //                  <i class="ri-html5-line"></i> HTML5
  //                </a>
  //                <a
  //                  href="https://mozilla.org"
  //                  target="_blank"
  //                  rel="noopener noreferrer"
  //                >
  //                  <i class="ri-javascript-line"></i> JavaScript
  //                </a>
  //                <a
  //                  href="https://js.org"
  //                  target="_blank"
  //                  rel="noopener noreferrer"
  //                >
  //                  <i class="ri-webpack-line"></i> Webpack
  //                </a>
  //              </div>
  //
  //              <div class="footer-column">
  //                <h5>Shop</h5>
  //                <a href="#">Web Apps</a>
  //                <a href="#">Telegram Bots</a>
  //                <a href="#">Discord Bots</a>
  //                <a href="#">CLI Tools</a>
  //              </div>
  //
  //              <div class="footer-column">
  //                <h5>Learn</h5>
  //                <a href="#">Our Story</a>
  //                <a href="#">Blog Posts</a>
  //                <a href="#">Tech Stack</a>
  //                <a href="#">Open Source</a>
  //              </div>
  //            </div>
  //
  //            <!-- <div class="footer-action-panel">
  //      <div class="newsletter-box">
  //        <label for="footer-email">Sign up to get 15% off your first order</label>
  //        <div class="input-group">
  //          <input type="email" id="footer-email" placeholder="Your Email Address">
  //          <button type="submit">Subscribe</button>
  //        </div>
  //      </div>
  //
  //      <div class="social-icons">
  //        <a href="#" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
  //        <a href="#" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
  //        <a href="#" aria-label="X / Twitter"><i class="ri-twitter-x-line"></i></a>
  //        <a href="#" aria-label="LinkedIn"><i class="ri-linkedin-box-fill"></i></a>
  //        <a href="#" aria-label="Github"><i class="ri-github-fill"></i></a>
  //      </div>
  //    </div> -->
  //          </div>
  //
  //          <div class="footer-bottom">
  //            <p>
  //              &copy;
  //              <span> ${footerText} </span>. All Rights Reserved.
  //            </p>
  //          </div>
  //        </footer>
  //
  //  `;
}
