import "../scss/contact.scss"

import  { getGitHubProfile }  from "./function/contact"


document.addEventListener("DOMContentLoaded", async function () {
  

  // gak perlu di contack
 // const navbar = document.querySelector("nav"); 
 //  const navThemeBtn = navbar.querySelector("li#theme button");
 //


  // ---- External Fech data ------------ 

  await getGitHubProfile();

});
