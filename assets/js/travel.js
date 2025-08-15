document.addEventListener("DOMContentLoaded", () => {
  const blogList = document.getElementById("blog-list");
  if (!blogList) return;

  fetch("../data/travel_blogs.json")
    .then(r => r.json())
    .then(list => {
      blogList.innerHTML = list.map(b =>
        `<a class="card block" href="./${b.slug}.html">
          <h3 class="text-lg font-bold">${b.title}</h3>
          <p>${b.summary}</p>
          <small>${b.date}</small>
        </a>`
      ).join("");
    });
});
