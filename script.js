const container = document.getElementById("projects-container");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let allRepos = [];

async function loadRepos() {
  try {
    const res = await fetch("repos.csv");
    const text = await res.text();
    const rows = text.trim().split("\n").slice(1); // skip headers

    allRepos = rows.map(row => {
      const [name, desc, link, languages, category] = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/^"|"$/g, ''));
      return {
        name,
        description: desc,
        url: link,
        languages: languages.toLowerCase(),
        keywords: category.toLowerCase()
      };
    });

    filterAndRender();
  } catch (err) {
    container.innerHTML = `<p style="color:#dc2626;">🚫 Failed to load repos.csv</p>`;
  }
}

function filterAndRender() {
  const query = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = allRepos.filter(repo => {
    const combined = `${repo.name} ${repo.description} ${repo.languages} ${repo.keywords}`;
    const matchesSearch = combined.includes(query);
    const matchesCategory = selectedCategory === "All" || repo.keywords.includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  renderProjects(filtered);
}

function renderProjects(repos) {
  container.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "projects-grid";

  repos.forEach(repo => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h4>${repo.name}</h4>
      <p>${repo.description}</p>
      <a href="${repo.url}" target="_blank">🔗 View</a>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

searchInput.addEventListener("input", filterAndRender);
categoryFilter.addEventListener("change", filterAndRender);

loadRepos();
