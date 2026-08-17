<h1 align="center">
  Portofolio V3
</h1>
<h5 align="center">
  for profesional
</h5>

<p align="center">
  <!-- HTML -->
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  </a>

  <!-- CSS -->
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  </a>

  <!-- Sass -->
  <a href="https://sass-lang.com/" target="_blank">
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass"/>
  </a>

  <!-- Webpack -->
  <a href="https://webpack.js.org/" target="_blank">
    <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack"/>
  </a>

  <!-- JavaScript -->
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  </a>
</p>

> mobile first : sesuatu yang tersembunyi akan kelihatan jika memang di cari

### teknik

##### cara menampilkan gambar dari link url share di google drive

pastikan folder yang menampung img tersebut sudah open url ke siapapun
reference : <https://stackoverflow.com/questions/15557392/how-do-i-display-images-from-google-drive-on-a-website>

```bash
# misalnya url share di dapat adalah
https://drive.google.com/file/d/1pW2ZZZYTRJGsvOiPfTEU5mmOQx00X2JW/view?usp=sharing
# maka pindahkan id nya
https://drive.google.com/thumbnail?id=1pW2ZZZYTRJGsvOiPfTEU5mmOQx00X2JW

```

### Web Pack Package

- `css-loader` : untuk load content css ,
- `sass-loader `: untuk load content sass ,
- `style-loader` : untuk load content style ,
- `html-webpack-plugin` : untuk load content html ,
- `webpack-dev-server` : untuk menjalanakan webpack dalam mode development ,

- `remixicon` : icon yang di gunakan di project ini
  <https://remixicon.com/>

### Image DB

mengguankan `ImgBB` untuk menyimpan gambar public
profile :
<https://u514893.imgbb.com/?sort=views_desc>

### App Color

| Nama Variabel     | Nilai / Hex | Deskripsi / Kegunaan                                  |
| ----------------- | ----------- | ----------------------------------------------------- |
| $black-space      | #0a0a0a     | Background utama aplikasi                             |
| $deep-purple      | #141414     | Lapisan permukaan (surface layer)                     |
| $nebula-purple    | #1f1f1f     | Batas elemen atau garis pemisah (border/divider)      |
| $violet-soft      | #2b2b2b     | Permukaan saat kursor diarahkan (hover surface)       |
| $blue-mystic      | #3a3a3a     | Permukaan komponen sekunder (secondary surface)       |
| $blue-light       | #6b6b6b     | Sorotan berwarna abu-abu (highlight abu)              |
| $lavender         | #cfcfcf     | Teks sekunder                                         |
| $gray-shadow      | #111111     | Efek bayangan gelap                                   |
| $accent-red       | #ff3b3b     | Merah utama untuk pesan peringatan atau sorotan utama |
| $accent-red-soft  | #ff6b6b     | Merah versi lebih lembut                              |
| $accent-blue      | #3b82f6     | Biru utama untuk elemen interaktif                    |
| $accent-blue-soft | #60a5fa     | Biru versi lembut untuk kondisi hover                 |
| $accent-white     | #ffffff     | Efek pendaran cahaya terang (glow)                    |

<br>
Global UI Components & Cards Mapping

| Nama Variabel [1] | Referensi / Nilai  | Implementasi Elemen UI               |
| ----------------- | ------------------ | ------------------------------------ |
| $bg-primary       | $black-space       | Latar belakang utama halaman         |
| $text-primary     | #ffffff            | Teks utama halaman                   |
| $text-secondary   | $lavender          | Teks sekunder halaman                |
| $card-bg          | $deep-purple       | Latar belakang komponen kartu proyek |
| $card-border      | $nebula-purple     | Garis tepi komponen kartu proyek     |
| $card-shadow      | rgba(0, 0, 0, 0.8) | Efek bayangan kartu proyek           |

<br> 
Buttons, Effects, & Gradients Mapping

| Nama Variabel       | Referensi / Nilai                                                     | Detail Penggunaan UI                            |
| ------------------- | --------------------------------------------------------------------- | ----------------------------------------------- |
| $btn-primary-bg     | $accent-blue                                                          | Latar belakang tombol utama                     |
| $btn-primary-text   | #ffffff                                                               | Warna teks tombol utama                         |
| $btn-secondary-bg   | $accent-red                                                           | Latar belakang tombol sekunder                  |
| $btn-secondary-text | #ffffff                                                               | Warna teks tombol sekunder                      |
| $hover-glow         | rgba(59, 130, 246, 0.6)                                               | Efek pendaran biru saat elemen di-hovers        |
| $active-glow        | rgba(255, 59, 59, 0.7)                                                | Efek pendaran merah saat elemen diklik/aktif    |
| $gradient-space     | linear-gradient(135deg, #000000, #111111, #1f1f1f)                    | Gradasi linier latar belakang tema luar angkasa |
| $gradient-planet    | radial-gradient(circle, $accent-blue-soft, $accent-red-soft, #1a1a1a) | Gradasi melingkar untuk visualisasi planet      |
