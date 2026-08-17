/*
 * Function untuk memperbarui data di sidebar
 * wkwkw baru tau bisa destructering setipa elements seperti ini
 */
export function updateSidebarContent(data, elements) {
  const {
    detailPreview, // Perbaikan typo nama
    detailCategory,
    detailTitle,
    detailIssuer,
    detailDate,
    detailCredential,
    detailDesc,
    detailVerifyLink,
    detailDownloadLink,
  } = elements;

  // Bersihkan preview lama agar tidak menumpuk saat ganti sertifikat
  if (detailPreview) detailPreview.innerHTML = "";

  // Proteksi jika data eframe/pdf/icon tidak sengaja undefined
  const hasEframe = data.eframe && data.eframe.length > 0;

  if (data.icon && detailPreview) {
    const icon = document.createElement("i");
    icon.className = data.icon; // Tambah class agar icon muncul
    detailPreview.appendChild(icon);
  } else if (hasEframe && detailPreview) {
    const eframe = document.createElement("iframe");
    eframe.src = data.eframe;
    eframe.width = "100%";
    eframe.height = "400";
    eframe.setAttribute("frameborder", "0");
    detailPreview.appendChild(eframe);
  } else if (data.pdf && detailPreview) {
    // untuk semantaar pdf untuk link ja
    const a = document.createElement("a");
    a.href = data.pdf;
    a.textContent = "Lihat PDF";
    detailPreview.appendChild(a);
  }

  if (detailTitle) detailTitle.textContent = data.title || "-";
  if (detailCategory) detailCategory.textContent = data.category || "-";
  if (detailIssuer) detailIssuer.textContent = data.issuer || "-";
  if (detailDate) detailDate.textContent = data.date || "-";
  if (detailCredential) detailCredential.textContent = data.credential || "-";
  if (detailDesc) detailDesc.textContent = data.desc || data.des || "-";

  // Tombol Download
  if (detailDownloadLink) {
    if (data.downloadUrl) {
      detailDownloadLink.href = data.downloadUrl;
      detailDownloadLink.style.display = "inline-block";
    } else {
      detailDownloadLink.style.display = "none";
    }
  }
}

/*
 * Buat cart untuk menampung Eframe
 * data yang di ikrim : 
 * judul: "",
 * :title "",
 * pdf : "", 
 * icon : "",
 * image : "",
  eframe: "",
  credential: "",
  category: "",
  date: "",
  category: "",
  des: "",
  credential: "",
  downloadUrl : "",
 */
export function cardElement(containerTrack, id, data) {
  const card = document.createElement("div");
  card.classList.add("cert-card");
  card.setAttribute("data-id", id);

  const heading = document.createElement("h3");
  heading.classList.add("cert-card__title");
  heading.textContent = data.title || data.titke;
  const des = document.createElement("div");
  des.classList.add("class-card_des");
  des.textContent = data.desc || data.des || "";

  card.appendChild(heading);
  card.appendChild(des);
  containerTrack.appendChild(card);
}

/*
 * datas : kirim data yang dalam katagory spesifk , hackerankg ,  dicodnng , .....
 * cardElements : Nodelist ( querySelectorAll )
 */
export function handleActionActiveCard(
  cardElements,
  datas,
  sidebarElements,
  detailSidebar,
) {
  cardElements.forEach((card) => {
    card.addEventListener("click", () => {
      // Menghapus active dari semua card di halaman
      document
        .querySelectorAll(".cert-card")
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      const certId = card.getAttribute("data-id");
      const data = datas[certId];

      if (data && detailSidebar) {
        updateSidebarContent(data, sidebarElements);
        detailSidebar.classList.add("open");

        if (window.innerWidth <= 768) {
          detailSidebar.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
    });
  });
}

export function handleActionDeactiveCard(
  cardElements,
  detailSidebar,
  closeSidebarBtn,
) {
  // Event Listener untuk Tombol Tutup Sidebar
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", () => {
      detailSidebar.classList.remove("open");
      cardElements.forEach((c) => c.classList.remove("active"));
    });
  }
}
