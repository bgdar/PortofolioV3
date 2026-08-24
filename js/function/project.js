import { getDirectDriveImg } from "../core/components.js";

/**
 * tambah project berdasarkan data
 * projectName : array yang akan di berikan
 * projectGrid : grid container yang menampungnnya
 */
export function addProjects(projectName, projectGrid) {
  projectName.forEach((v) => {
    // buat `tech` mengelilingi element
    //
    // const cleanImgUrl = getDirectDriveImg(v.img); // sudah migrasi ke imgBB

    const tmpl = `<div class="project-card">
  <div class="project-card__content">
    
    <div class="project-card__des">
    <p class="project-card__name">${v.name}</p>
      <div class="project-card__actions">
        <a href="${v.repo}" target="_blank" class="btn-repo">
          <i class="ri-github-line"></i>
        </a>
      </div>
    </div>

    <!--  inisialisasi  tambahkan --scroll-rot: 0deg; dan dll -->
    <div class="project-card__tech" data-des="${v.des}" img-path="${v.img}" data-total="${v.tech.length}" style="--total: ${v.tech.length}; --scroll-rot: 0deg;">
      ${v.tech
        .map(
          (t, i) => `
        <p class="elm"  data-original-index="${i}" style="--i: ${i + 1};">

          <span class="tech-badge">
        <i class="${v.tech_icon[i]}" || "ri-code-line ></i> 
          ${t}</span>
          
        </p>
      `,
        )
        .join("")}
    </div>
  </div>
</div>`;

    // style nya di tambhaakn berdasarkan nilai i untuk menentukan di mana letaknya
    projectGrid.innerHTML += tmpl;
  });
}

/**
 * Menambahkan satu project favorit ke dalam container.
 *
 * @param {Object} project - Data project.
 * @param {HTMLElement} projectGrid - Container tujuan.
 */
export function addProject(project, projectGrid) {
  const cleanImgUrl = getDirectDriveImg(project.img);

  const tmpl = `
    <div class="project-card">
      <div class="project-card__content">

        <div class="project-card__des">

          <p class="project-card__name">
            ${project.name}
          </p>

          <div class="project-card__actions">
            <a
              href="${project.repo}"
              target="_blank"
              class="btn-repo"
            >
              <i class="ri-github-line"></i>
            </a>
          </div>

        </div>

        <div
          class="project-card__tech"
          data-des="${project.des}"
          img-path="${cleanImgUrl}"
          data-total="${project.tech.length}"
          style="
            --total:${project.tech.length};
            --scroll-rot:0deg;
          "
        >

          ${project.tech
            .map(
              (tech, i) => `
            <p
              class="elm"
              data-original-index="${i}"
              style="--i:${i + 1};"
            >
              <span class="tech-badge">

                <i class="${project.tech_icon?.[i] || "ri-code-line"}"></i>

                ${tech}

              </span>
            </p>
          `,
            )
            .join("")}

        </div>

      </div>
    </div>
  `;

  projectGrid.insertAdjacentHTML("beforeend", tmpl);
}

export const cardProjectFavorit = (projeckfavoritCard, favoriteProject) => {
  projeckfavoritCard.querySelector("#projectName").textContent =
    favoriteProject.name;

  projeckfavoritCard.querySelector("#projectDescription").textContent =
    favoriteProject.des;

  projeckfavoritCard.querySelector("#projectLanguage").textContent =
    favoriteProject.lang;

  projeckfavoritCard.querySelector("#projectRepo").href = favoriteProject.repo;

  const techContainer = projeckfavoritCard.querySelector("#projectTech");

  techContainer.innerHTML = "";

  favoriteProject.tech.forEach((item) => {
    const badge = document.createElement("span");

    badge.textContent = item;

    techContainer.appendChild(badge);
  });

  const image = projeckfavoritCard.querySelector("#projectImage");

  if (favoriteProject.img) {
    image.src = getDirectDriveImg(favoriteProject.img);
  }
};

/*
 * scrollVertical : nilai scroll pada sumbu y , bisa dari scrollTop || scrollY
 */
export function cntTechRotate(techContainers, scrollVertical, speedRotation) {
  techContainers.forEach((cnt) => {
    const rotationDegree = scrollVertical / speedRotation;
    // Cukup update nilai rotasi global di tingkat kontainernya saja
    cnt.style.setProperty("--scroll-rot", `${rotationDegree}deg`);
  });
}

export function mainCntPerspektive3D(main, subElmCard, subElmCardDes) {
  // Hitung scroll maksimal dengan benar
  const maxScroll = main.scrollHeight - main.clientHeight;
  if (maxScroll <= 0) return;

  const currentScroll = main.scrollTop; // Gunakan scrollTop, bukan scrollY
  const scrollRatio = Math.min(currentScroll / maxScroll, 1);

  const maxRotateX = 20;
  const minScale = 0.88;

  const currentRotate = scrollRatio * maxRotateX;
  const currentScale = 1 - scrollRatio * (1 - minScale);
  main.style.transform = ` perspective(1000px) rotateX(${currentRotate}deg) scale(${currentScale})`;

  // set shadows
  if (subElmCardDes || subElmCard) {
    subElmCard.forEach((v) => elementShadowPerpestive3D(v, scrollRatio, 7));
    subElmCardDes.forEach((v) => {
      elementShadowPerpestive3D(v, scrollRatio, 4);
    });
  }
}

/*
 * maxSteps : jumlah bayangan yang di hasilkan
 */
export function elementShadowPerpestive3D(element, scrollRatio, maxSteps) {
  let shadows = [];

  for (let i = 1; i <= maxSteps; i++) {
    // let currentX = (i * scrollRatio).toFixed(2);
    let currentY = (i * scrollRatio).toFixed(2);
    // shadows.push(`${currentX}px ${currentY}px 0px #cfcfcf`);
    shadows.push(`0px ${currentY}px 0px #cfcfcf`);
  }

  // Lapisan terakhir Soft shadow hitam (6px 6px 10px) yang ikut membesar dinamis
  let softX = (6 * scrollRatio).toFixed(2);
  let softY = (6 * scrollRatio).toFixed(2);
  let blur = (10 * scrollRatio).toFixed(2);
  shadows.push(`${softX}px ${softY}px ${blur}px rgba(0, 0, 0, 0.4)`);

  // Gabungkan semua array menjadi satu string CSS box-shadow
  element.style.boxShadow = shadows.join(", ");
}
