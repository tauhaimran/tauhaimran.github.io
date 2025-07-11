const username = "yourusername";

async function loadRepos() {
  const container = document.getElementById("projects-container");
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    container.innerHTML = "";
    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description"}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "Failed to load projects.";
  }
}

loadRepos();
