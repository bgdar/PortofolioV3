import "../scss/sertifikat.scss";
import { dicodingData, hackerrankData, hacktiv8Data } from "./data/sertifikat";
import {
  cardElement,
  handleActionActiveCard,
  handleActionDeactiveCard,
  updateSidebarContent,
} from "./function/sertifikat";

document.addEventListener("DOMContentLoaded", () => {
  // ------------- Group Sertifikat ------------
  const dicodingGroup = document.querySelector("div.dicoding-group");
  const dicodingTrack = dicodingGroup.querySelector(".certificate-track");

  const hackerRankGroup = document.querySelector("div.hackerrank-group");
  const hackerRankTrack = hackerRankGroup.querySelector(".certificate-track");

  const hacktiv8Group = document.querySelector("div.hacktiv8-group");
  const Hacktiv8Track = hacktiv8Group.querySelector(".certificate-track");

  // ------------- Group Sertifikat ------------
  const detailSidebar = document.getElementById("detailSidebar");
  const closeSidebarBtn = detailSidebar.querySelector("#closeSidebarBtn");

  // const waveContainer = document.querySelector(".wave-container");
  // const svgElement = waveContainer.querySelector("svg"); // Target langsung ke elemen <svg>
  // Sidebar Content Elements

  const SidebarElements = {
    // sbenarnya di ambil semua dari SidebarElements
    // element harus di declarasi dahulu , jadi pakai document
    detailPreview: document.getElementById("detailPreview"),
    detailCategory: document.getElementById("detailCategory"),
    detailTitle: document.getElementById("detailTitle"),
    detailIssuer: document.getElementById("detailIssuer"),
    detailDate: document.getElementById("detailDate"),
    detailCredential: document.getElementById("detailCredential"),
    detailDesc: document.getElementById("detailDesc"),
    detailVerifyLink: document.getElementById("detailVerifyLink"),
    detailDownloadLink: document.getElementById("detailDownloadLink"),
  };

  // menampilkna semua element data sertifikat ----------------
  for (const [id, data] of Object.entries(dicodingData)) {
    cardElement(dicodingTrack, id, data);
  }
  for (const [id, data] of Object.entries(hackerrankData)) {
    cardElement(hackerRankTrack, id, data);
  }

  for (const [id, data] of Object.entries(hacktiv8Data)) {
    cardElement(Hacktiv8Track, id, data);
  }

  // menampilkna semua element data sertifikat ----------------

  // setelah kartu di masukan
  const dicodingCards = dicodingTrack.querySelectorAll(".cert-card");
  const dicodingCardsValid = dicodingCards.length > 0 ? dicodingCards : null;

  const hackerrankCards = hackerRankTrack.querySelectorAll(".cert-card");
  const hackerrankCardsValid =
    hackerrankCards.length > 0 ? hackerrankCards : null;
  const hacktiv8Cards = Hacktiv8Track.querySelectorAll(".cert-card");
  const hacktiv8CardsValid = hacktiv8Cards.length > 0 ? hacktiv8Cards : null;

  handleActionActiveCard(
    hackerrankCardsValid,
    hackerrankData,
    SidebarElements,
    detailSidebar,
  );

  handleActionActiveCard(
    dicodingCardsValid,
    dicodingData,
    SidebarElements,
    detailSidebar,
  );
  handleActionActiveCard(
    hacktiv8CardsValid,
    hacktiv8Data,
    SidebarElements,
    detailSidebar,
  );

  handleActionDeactiveCard(dicodingCardsValid, detailSidebar, closeSidebarBtn);
  handleActionDeactiveCard(
    hackerrankCardsValid,
    detailSidebar,
    closeSidebarBtn,
  );

  handleActionDeactiveCard(hacktiv8CardsValid, detailSidebar, closeSidebarBtn);
});
