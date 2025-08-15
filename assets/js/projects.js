document.addEventListener("DOMContentLoaded", () => {
  const c = document.getElementById('projects');
  const s = document.getElementById('project-search');
  let list = [];

  const render = items => {
    c.innerHTML = items.map(p =>
      `<a class="card" href="${p.url}" target="_blank">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <small>${(p.tags||[]).join(', ')}</small>
      </a>`
    ).join('');
  };

  fetch('../data/projects.json')
    .then(r => r.json())
    .then(data => {
      list = data;
      render(list);
    });

  if (s) {
    s.addEventListener('input', () => {
      const q = s.value.toLowerCase();
      render(list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags||[]).some(tag => tag.toLowerCase().includes(q))
      ));
    });
  }
});
