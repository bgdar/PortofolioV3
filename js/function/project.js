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

    <!--  INISIALISASI  Tambahkan --scroll-rot: 0deg; dan dll -->
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
