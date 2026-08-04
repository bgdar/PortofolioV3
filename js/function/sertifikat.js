/*
 * Function untuk memperbarui data di sidebar
 * wkwkw baru tau bisa destructering setipa elements seperti ini
 */
export function updateSidebarContent(data, elements) {
  // Destructuring elemen DOM yang dikirim
  const {
    detailImg,
    detailCategory,
    detailTitle,
    detailIssuer,
    detailDate,
    detailCredential,
    detailDesc,
    detailVerifyLink,
    detailDownloadLink,
  } = elements;

  detailImg.src = data.image;
  detailCategory.textContent = data.category;
  detailTitle.textContent = data.title;
  detailIssuer.textContent = data.issuer;
  detailDate.textContent = data.date;
  detailCredential.textContent = data.credential;
  detailDesc.textContent = data.desc;
  detailVerifyLink.href = data.verifyUrl;
  detailDownloadLink.href = data.downloadUrl;
}
