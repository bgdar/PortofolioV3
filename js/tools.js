import "../scss/tools.scss";
import {
  languageData,
  libraryData,
  desainData,
  workflowData,
  visualisasiData,
} from "./data/tools.js";
import { addCard } from "./function/tools.js";
import { chageBg } from "./core/components.js";

document.addEventListener("DOMContentLoaded", function () {
  const languageContainer = document.querySelector("div.container-language");
  const workflowContainer = document.querySelector("div.container-workflow");
  const visualisasiContainer = document.querySelector(".container-visualisasi");
  const desainContainer = document.querySelector("div.container-desain");

  const languageGrid = languageContainer.querySelector("div.tools-grid");
  const workflowGrid = workflowContainer.querySelector("div.tools-grid");
  const desainGrid = desainContainer.querySelector("div.tools-grid");
  const visualisasiGrid = visualisasiContainer.querySelector("div.tools-grid");

  const navbar = document.querySelector("nav");
  const navThemeBtn = navbar.querySelector("li#theme button");

  addCard(languageGrid, languageData);
  addCard(workflowGrid, workflowData);
  addCard(desainGrid, desainData);
  addCard(visualisasiGrid, visualisasiData);

  //  NAVBAR SECTION
  navThemeBtn.addEventListener("click", () => {
    console.info("bgchage has click");
    chageBg();
  });
});
