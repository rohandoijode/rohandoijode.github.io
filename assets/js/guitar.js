document.addEventListener("DOMContentLoaded", () => {
  const c = document.getElementById('songs');
  const s = document.getElementById('search');
  let list = [];

  if (!c) return; // Prevent running if #songs is missing

  const render = items => {
    if (!items || items.length === 0) {
      c.innerHTML = '<div class="text-gray-500">No songs found.</div>';
      return;
    }
    c.innerHTML = items.map((song, idx) =>
      `<div class="card p-4 border rounded mb-4 bg-white shadow">
        <h3 class="text-lg font-semibold mb-1">${song.title}</h3>
        <p class="mb-1"><strong>Artist:</strong> ${song.artist}</p>
        <p class="mb-2"><strong>Chords:</strong> ${song.chords.join(', ')}</p>
        <a href="./${song.slug}.html" class="bg-indigo-500 text-white px-4 py-2 rounded mt-2 inline-block hover:bg-indigo-600 transition">View Details</a>
      </div>`
    ).join('');
  };

  c.innerHTML = '<div class="text-gray-400">Loading songs...</div>';
  fetch('../data/guitar_chords.json')
    .then(r => {
      if (!r.ok) {
        throw new Error('Failed to load song data. Status: ' + r.status + ' ' + r.statusText);
      }
      return r.json();
    })
    .then(data => {
      list = data;
      render(list);
    })
    .catch(err => {
      c.innerHTML = `<div class="text-red-500">Error loading songs:<br>${err.message}</div>`;
    });

  let searchTimeout;
  if (s) {
    s.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const q = s.value.toLowerCase();
        render(list.filter(song =>
          song.title.toLowerCase().includes(q) ||
          song.artist.toLowerCase().includes(q)
        ));
      }, 150);
    });
  }

  // Modal logic only if modal elements exist
  const modal = document.getElementById('chord-modal');
  const closeModal = document.getElementById('close-modal');
  const autoscrollBtn = document.getElementById('autoscroll-btn');
  const stopscrollBtn = document.getElementById('stopscroll-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalArtist = document.getElementById('modal-artist');
  const modalChords = document.getElementById('modal-chords');
  const modalLyrics = document.getElementById('modal-lyrics');
  let scrollInterval;

  if (modal && closeModal && autoscrollBtn && stopscrollBtn && modalTitle && modalArtist && modalChords && modalLyrics) {
    c.addEventListener('click', e => {
      if (e.target.classList.contains('show-chords-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const song = list[idx];
        modalTitle.textContent = song.title;
        modalArtist.textContent = "Artist: " + song.artist;
        modalChords.innerHTML = song.chords.map(chord => `<span class="inline-block bg-gray-100 rounded px-2 py-1 m-1">${chord}</span>`).join('');
        modalLyrics.textContent = song.lyrics || "Lyrics not available.";
        modal.classList.remove('hidden');
        modalChords.scrollTop = 0;
    // Modal logic only if modal elements exist
    // Removed unused modal logic for scalability and maintainability
  }
});
  }
});
