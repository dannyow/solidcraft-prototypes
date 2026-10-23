// Renders the topic's note.md into the page, so notes stay plain Markdown and the site needs
// no build step: the same files work on a local server and on GitHub Pages.
const out = document.getElementById('note');
fetch('note.md')
  .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
  .then(md => {
    md = md.replace(/^---\n[\s\S]*?\n---\n/, '');
    out.innerHTML = marked.parse(md);
    const h1 = out.querySelector('h1');
    if (h1) document.title = `${h1.textContent} · SolidCraft prototypes`;
  })
  .catch(() => { out.textContent = 'The note could not be loaded. Open the page through a web server, not as a file.'; });
