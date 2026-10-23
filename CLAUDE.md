# solidcraft-prototypes

Browser prototypes for SolidCraft, published as a website

## Layout

- `index.html`: the site's front page, a list of the prototypes. Add a row for each new one.
- `<prototype>/index.html`: one self-contained page per prototype (inline CSS and JS; libraries
  from a CDN, listed in `THIRD_PARTY.md`).
- `position-rotation-gizmo/svg/marker/` and `svg/ring/`: the handle drawings the page loads as its
  defaults. Marker frames are 400 x 400 with the dot at the centre of the viewBox; ring frames
  are 600 x 600 with the circle (radius 125) at the centre and the grip on the right.
- `notes/`: short design notes in Markdown; GitHub Pages renders `notes/x.md` as `notes/x.html`.
  Link each from the front page.
- `_config.yml`: Jekyll settings for Pages; files for the repository only are excluded from the site.
- Each page keeps its settings in `localStorage` under its own key (the folder name), because all
  pages of the site share one browser origin.

## Build and run

No build. Serve the folder and open it: `python3 -m http.server 8000`, then
http://localhost:8000/ (the pages `fetch` their SVGs, which `file://` does not allow). The local
server shows notes as raw Markdown; only Pages renders them.
Published with GitHub Pages from `main`, folder `/`.

## Working in this repo

- Test your own change (build, run, whatever you can observe) before asking a person to try it.
- English for code, commits and docs.
- Commit straight to `main` unless asked otherwise. Install the hooks once per clone:
  `tools/hooks/install.sh`.
- The history is meant to be publishable as it is. The hooks refuse private words in files
  and commit messages (lists outside the repo: `~/.config/lab-private-words` and
  `.git/info/private-words`), secrets, files over 1 MB and content without a licence.
  Raw photos and videos stay outside the repo; only cropped, metadata-free versions go in.
  No session links in commit messages.
- This project stands on its own: no names, paths or links of other private projects in
  tracked files.
- Third-party code and content are listed in `THIRD_PARTY.md`.
