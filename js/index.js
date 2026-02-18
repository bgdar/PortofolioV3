import "../scss/index.scss";
import imgDar from "../assets/fr-dar.jpg";

document.addEventListener("DOMContentLoaded", () => {
  rightSection();
  leftSection();
});

function rightSection() {
  let img = document.querySelector("section#right div.img img");
  console.info("img : ", img);
  img.src = imgDar;
}

function leftSection() {
  let length = 0;

  let content = `
<div class="item it-${length}">
${"isi" + length}
</div>
`;
  let leftSection = document.querySelector("section#left");

  for (let i = 0; i < 2; i++) {
    leftSection.innerHTML += content;
    console.log("Content akses : ", length);
    length++;
  }
}
