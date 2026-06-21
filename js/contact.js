import "../scss/contact.scss";

async function getGitHubProfile() {
  try {
    const username = "bgdar";
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    const cardGithub = document.querySelector("div.github");
    console.info("ard", cardGithub);

    if (response.ok) {
      cardGithub.querySelector("#gh-avatar").src = data.avatar_url;
      cardGithub.querySelector("#gh-name").textContent =
        data.name || data.login;
      cardGithub.querySelector("#gh-bio").textContent =
        data.bio || "Tidak ada bio.";
      cardGithub.querySelector("#gh-link").href = data.html_url;
    } else {
      cardGithub.querySelector("#gh-name").textContent = "User tidak ditemukan";
    }
  } catch (error) {
    console.error("Gagal mengambil data GitHub:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await getGitHubProfile();
});
