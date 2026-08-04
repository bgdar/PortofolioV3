import "../scss/contact.scss";

import { generateSubContact } from "./function/contact";
import { dataContact } from "./data/contact";
document.addEventListener("DOMContentLoaded", async function () {
  // gak perlu di contack
  // const navbar = document.querySelector("nav");
  //  const navThemeBtn = navbar.querySelector("li#theme button");
  const puzzleCnt = document.querySelector("div.puzzle");

  // ---- External Fech data ------------

  // yaelah rupanya gunakna for loop  agar fungsi await bisa berlaku , gak bisa dengan forEach wkwkw
  for (const v of dataContact) {
    await generateSubContact(puzzleCnt, v);
  }
});
