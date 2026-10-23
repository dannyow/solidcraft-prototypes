---
layout: note
title: "Placement handles: move and turn"
---

# Placement handles: move and turn

Notes on the handles for a SolidCraft feature placed on a face, such as Rest, Boss or Snap Fit: a marker that moves the feature across the face and a ring that turns it. Try them on a model in the [prototype](./).

## How to read a handle

- Anything drawn white with a dark outline can be dragged. What the app draws for the feature itself, the preview and the footprint, uses the preview's blue, so white stays reserved for handles.
- A dotted line shows what dragging will do. It turns solid while you drag.
- At rest a handle shows a short hint. Hovering it shows the whole action: the arrows of the marker, the full circle of the ring.
- Animations follow the action. The marker's arms grow out from the dot, and the ring's circle opens from the grip.
- Arrows stand for a straight move. The diamond on the ring stands for a turn.

## Move marker

<div class="states">
<figure><div class="tile"><img src="svg/marker/normal.svg" alt="Marker at rest: a dot with short dotted arms"></div><figcaption>Normal</figcaption></figure>
<figure><div class="tile"><img src="svg/marker/hover.svg" alt="Marker under the pointer: longer dotted arms with arrowheads"></div><figcaption>Hover</figcaption></figure>
<figure><div class="tile"><img src="svg/marker/active.svg" alt="Marker while dragging: solid arrows"></div><figcaption>Active</figcaption></figure>
</div>

The marker sits at the feature's place. While you drag it, the feature's footprint follows the pointer as a blue ghost on the face. The solid preview catches up when the app has recomputed it, so the ghost shows where the feature is going before the preview gets there.

## Turn ring

<div class="states ring">
<figure><div class="tile"><img src="svg/ring/normal.svg" alt="Ring at rest: a dotted arc with the diamond grip"></div><figcaption>Normal</figcaption></figure>
<figure><div class="tile"><img src="svg/ring/hover.svg" alt="Ring under the pointer: the full dotted circle"></div><figcaption>Hover</figcaption></figure>
<figure><div class="tile"><img src="svg/ring/active.svg" alt="Ring while turning: a solid arc around the grip"></div><figcaption>Active</figcaption></figure>
<figure><div class="tile"><img src="svg/ring/compass.svg" alt="Compass: four short ticks at north, east, south and west"></div><figcaption>Compass</figcaption></figure>
</div>

The ring lies on the face at the marker's height, so moving and turning share one centre, and it is drawn in perspective with the face. Dragging the grip turns the feature. The ring keeps its size however far it turns.

While you turn, a compass with ticks at north, east, south and west stays fixed on the face, so the turn has a reference. The grip snaps to those four points when it comes within a few degrees of one, and turns in 5° steps elsewhere. A feature that may only face one of the four can be limited to them.

## While a handle is in use

The other handle fades to about a quarter of its strength, so only the one in use reads clearly. The footprint shows only while moving, not while turning.

## Open questions

- The ring is drawn at the same scale as the marker so their line widths match. On a large feature the ring then sits inside the feature instead of around it. Drawing the circle in code would let its radius follow the feature while the lines keep the marker's widths.
- The app draws handles with egui, so the final line widths and sizes need tuning there, at 1x and 2x.
