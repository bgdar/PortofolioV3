import "../scss/sertifikat.scss";
import { sertificatesData } from "./data/sertifikat";
import { updateSidebarContent } from "./function/sertifikat";

document.addEventListener("DOMContentLoaded", () => {
  const certCards = document.querySelectorAll(".cert-card");
  const detailSidebar = document.getElementById("detailSidebar");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");

  const waveContainer = document.querySelector(".wave-container");
  const svgElement = waveContainer.querySelector("svg"); // Target langsung ke elemen <svg>

  // Sidebar Content Elements
  const SidebarElements = {
    detailImg: document.getElementById("detailImg"),
    detailCategory: document.getElementById("detailCategory"),
    detailTitle: document.getElementById("detailTitle"),
    detailIssuer: document.getElementById("detailIssuer"),
    detailDate: document.getElementById("detailDate"),
    detailCredential: document.getElementById("detailCredential"),
    detailDesc: document.getElementById("detailDesc"),
    detailVerifyLink: document.getElementById("detailVerifyLink"),
    detailDownloadLink: document.getElementById("detailDownloadLink"),
  };

  // Event Listener pada setiap Card Sertifikat
  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      certCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      const certId = card.getAttribute("data-id");
      const data = sertificatesData[certId];

      if (data) {
        updateSidebarContent(data, SidebarElements);
        detailSidebar.classList.add("open");

        //  Jika di mobile, scroll halus ke bottom sheet agar terlihat penuh
        if (window.innerWidth <= 768) {
          detailSidebar.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
    });
  });

  // Event Listener untuk Tombol Tutup Sidebar
  closeSidebarBtn.addEventListener("click", () => {
    detailSidebar.classList.remove("open");
    certCards.forEach((c) => c.classList.remove("active"));
  });
});
