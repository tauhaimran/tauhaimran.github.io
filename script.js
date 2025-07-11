const username = "tauhaimran"; // Replace this with your GitHub username
const container = document.getElementById("projects-container");
let allRepos = [];

async function loadRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await res.json();

    allRepos = repos;
    renderProjects(repos);
  } catch (e) {
    container.innerHTML = "<p>🚫 Could not load repos.</p>";
  }
}

function renderProjects(repos) {
  container.innerHTML = "";
  repos.forEach(repo => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description provided."}</p>
      <a href="${repo.html_url}" target="_blank">🔗 View on GitHub</a>
    `;
    container.appendChild(card);
  });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allRepos.filter(repo =>
    repo.name.toLowerCase().includes(query) ||
    (repo.description && repo.description.toLowerCase().includes(query))
  );
  renderProjects(filtered);
});

loadRepos();
