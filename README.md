# solidcraft-prototypes

Design prototypes for [SolidCraft](https://github.com/tangency-labs/solidcraft), an open-source parametric CAD application. Each prototype is a static web page in its own folder, published with GitHub Pages. They are personal experiments by Daniel Owsianski, not part of the SolidCraft project.

| folder | what it is |
|---|---|
| [position-rotation-gizmo](position-rotation-gizmo/) | Placement handles for a feature placed on a face: a marker to move it and a ring to turn it, tried on a small 3D model, with a [design note](position-rotation-gizmo/note.md). |

Each topic has its own folder: the prototype as `index.html` and, when there is one, a short design note as `note.md`.

## Running locally

The pages load their drawings with `fetch`, so open them through a web server rather than from the file system:

```
python3 -m http.server 8000
```

Then open http://localhost:8000/.

## Changing the drawings

The handle drawings are SVG files exported from Figma in `position-rotation-gizmo/svg/`. Replace a file and reload. The page also takes SVGs pasted or dropped onto its cards; those stay in the browser only.

## Licence

MIT, see [LICENSE](LICENSE). Libraries the pages load at run time are listed in [THIRD_PARTY.md](THIRD_PARTY.md).
