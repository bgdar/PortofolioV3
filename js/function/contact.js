/*
 * cnt : container yang akan di masukan data
 */
async function getGitHubProfile(ctn, dataCur) {
  try {
    const username = "bgdar";
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    //  Buat elemen heading h3 beserta ikonnya
    const h3Title = document.createElement("h3");
    const iconTitle = document.createElement("i");
    iconTitle.className = "ri-github-line";
    h3Title.appendChild(iconTitle);
    h3Title.appendChild(document.createTextNode(dataCur.judul));

    // Buat elemen pembungkus utama (div#github)
    const githubContainer = document.createElement("div");
    githubContainer.id = "github";
    githubContainer.className = `piece ${dataCur.clClass || ""}`;
    //  Buat elemen gambar avatar (img#gh-avatar)
    const avatarImg = document.createElement("img");
    avatarImg.id = "gh-avatar";
    avatarImg.alt = "Avatar";

    // Buat elemen kontainer informasi (div.gh-info)
    const ghInfoDiv = document.createElement("div");
    ghInfoDiv.className = "gh-info";

    // Buat nama github (h3#gh-name)
    const ghName = document.createElement("h3");
    ghName.id = "gh-name";

    // Buat bio github (p#gh-bio)
    const ghBio = document.createElement("p");
    ghBio.id = "gh-bio";

    // Buat tautan github (a#gh-link)
    const ghLink = document.createElement("a");
    ghLink.id = "gh-link";
    ghLink.target = "_blank";
    ghLink.textContent = "Kunjungi Profil ";

    // Buat elemen ikon untuk tautan
    const iconLink = document.createElement("i");
    iconLink.className = "ri-arrow-right-up-line";
    ghLink.appendChild(iconLink);

    // 5. Masukkan data hasil fetch API ke dalam tag secara dinamis
    if (response.ok) {
      avatarImg.src = data.avatar_url;
      ghName.textContent = data.name || data.login;
      ghBio.textContent = data.bio || "Tidak ada bio.";
      ghLink.href = data.html_url;
    } else {
      avatarImg.src = "https://via.placeholder.com/80"; // Gambar placeholder jika gagal
      ghName.textContent = "User tidak ditemukan";
      ghBio.textContent = "Gagal memuat bio.";
      ghLink.style.display = "none"; // Sembunyikan link jika user tidak ada
    }

    // Suusun struktur elemen (Append Child)
    ghInfoDiv.appendChild(ghName);
    ghInfoDiv.appendChild(ghBio);
    ghInfoDiv.appendChild(ghLink);

    githubContainer.appendChild(avatarImg);
    githubContainer.appendChild(ghInfoDiv);
    githubContainer.appendChild(h3Title);

    // Masukkan seluruh struktur yang telah dibuat ke dalam DOM (Target: document.body)
    // document.body.appendChild(h3Title);
    ctn.appendChild(githubContainer);
  } catch (error) {
    console.error("Gagal mengambil data GitHub:", error);
  }
}

/*
 * masukin aja send box sama seperti github di pangling bawah
 */
function sendBox(ctn, data) {
  //Buat div utama (piece message)
  const pieceDiv = document.createElement("div");
  pieceDiv.className = "piece message";

  // Buat div isi (cnt-message)
  const cntDiv = document.createElement("div");
  cntDiv.className = "cnt-message";

  //Buat tag h3 beserta icon dan teksnya
  const h3 = document.createElement("h3");
  const iconH3 = document.createElement("i");
  iconH3.className = "ri-chat-smile-3-line";
  h3.appendChild(iconH3);
  h3.appendChild(document.createTextNode(" Send Message"));

  // Buat input text
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Your name";

  // Buat textarea
  const textarea = document.createElement("textarea");
  textarea.placeholder = "Message";

  // Buat button beserta teks dan icon-nya
  const button = document.createElement("button");
  button.className = "btn-send";
  const iconBtn = document.createElement("i");
  iconBtn.className = "ri-send-plane-fill";
  button.appendChild(document.createTextNode("Send "));
  button.appendChild(iconBtn);

  cntDiv.appendChild(h3);
  cntDiv.appendChild(input);
  cntDiv.appendChild(textarea);
  cntDiv.appendChild(button);

  pieceDiv.appendChild(cntDiv);

  ctn.appendChild(pieceDiv);
}

/*
 * return string
 * data : data looping
 * ctn : conntainer assigment
 */
export async function generateSubContact(cnt, data) {
  if (data.isManual) {
    if (data.clClass === "github") {
      await getGitHubProfile(cnt, data);
    } else if (data.clClass === "message") {
      sendBox(cnt, data);
    }
  } else {
    const manual = `
   <div class="piece ${data.clClass}">
      <h3><i class="ri-mail-send-line"></i>${data.judul}</h3>
      <p>${data.des}</p>
    </div>
  `;

    // gak pisa pakai innerHTML karena akan mengahpus seleuruh element jika berbeda dengan createElement
    // cnt.innerHTML = manual;
    // Menambahkan elemen baru ke paling bawah kontainer tanpa menghapus isi lama
    cnt.insertAdjacentHTML("beforeend", manual);
  }
}
