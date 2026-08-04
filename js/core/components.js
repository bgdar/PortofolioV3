const imagesContext = require.context(
  "../../assets/",
  false,
  /\.(webp|png|jpe?g|svg)$/,
);

// ---------Export --- var
export const databg = [
  "https://i.ibb.co.com/1JqK6qHH/bg1.webp",
  "https://i.ibb.co.com/qYQmFJy4/bg2.webp",
  "https://i.ibb.co.com/9krGgC6c/bg6.webp",
  "https://i.ibb.co.com/BHwYRcZB/bg7.webp",
  "https://i.ibb.co.com/RGYx7g7F/bg11.webp",
  "https://i.ibb.co.com/RGsvT0Mv/bg12.webp",
  "https://i.ibb.co.com/NdpgpXCZ/bg5.webp",
  "https://i.ibb.co.com/8gnprgh0/bg10.webp",
  "https://i.ibb.co.com/5hNtSgZB/bg3.webp",
  "https://i.ibb.co.com/8SxbTmc/bg4.webp",
  "https://i.ibb.co.com/LhPt0K42/bg8.webp",
  "https://i.ibb.co.com/5hfxCNnD/bg9.webp",
];

// ---------- Export function ----------

export function chageBg() {
  const max = databg.length;
  const range = Math.floor(Math.random() * max);
  const namaFile = databg[range];

  // Panggil imagesContext untuk mendapatkan URL asli yang sudah diproses oleh Webpack
  // const imgUrl = imagesContext(`./${namaFile}`); // sudah ganti ke imgbb

  document.body.style.backgroundImage = `url('${namaFile}')`;
}

/*
 * fungsi untuk mengubah direction url dari google drive ke thumbnail
 */
export function getDirectDriveImg(url) {
  console.info("url : ", url);
  if (!url || url.length === 0) {
    return;
  }

  const width = "&sz=w1000"; //  nantik ja

  const indexFist = url.indexOf("/d/") + 3;
  const indexlast = url.indexOf("/view");

  return `https://drive.google.com/thumbnail?id=${url.substring(indexFist, indexlast)}`;
}
