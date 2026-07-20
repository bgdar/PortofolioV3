

const imagesContext = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

// ---------Export --- var 
export const databg = ["bg1.jpg", "bg2.jpg"];


// ---------- Export function ----------

export function chageBg(databg) {
  const max = databg.length;
  const range = Math.floor(Math.random() * max);
  const namaFile = databg[range]; 

  // Panggil imagesContext untuk mendapatkan URL asli yang sudah diproses oleh Webpack
  // Jalur yang dimasukkan harus diawali dengan './' 
  const imgUrl = imagesContext(`./${namaFile}`);
  document.body.style.backgroundImage = `url('${imgUrl}')`;
}


/*
 * fungsi untuk mengubah direction url dari google drive ke thumbnail
 */
export function getDirectDriveImg(url) {
 
  const indexFist = url.indexOf("/d/");
  const indexlast = url.indexOf("/view");

  return `https://drive.google.com/thumbnail?id=${url.substring(indexFist + 3,indexlast)}`

}
