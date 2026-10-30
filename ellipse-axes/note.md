# Ellipse axes: notes from a redesign

An ellipse in SolidCraft used to be just an outline. Now it comes with its two axes, and every size on it can be dimensioned the way a drawing states it. Here is what was wrong, what I changed and why. The code is in [#9292](https://github.com/tangency-labs/solidcraft/pull/9292) (issue [#9291](https://github.com/tangency-labs/solidcraft/issues/9291)).

## The problem

I ran into it while trying to draw an ellipse to given sizes. A few days later a user asked the very same question in [#8658](https://github.com/tangency-labs/solidcraft/issues/8658): how do you dimension an ellipse? The honest answer was: partly.

`D` on the outline gave exactly one thing, the minor radius, labelled R as if the ellipse were a circle. It isn't one, so the arrowhead usually ended up inside the curve. The major half-axis took two picks. The whole axes, which is what a drawing actually states, took none, because there was nothing to pick.

<figure><video src="clips/before-1.mp4" controls muted playsinline loop></video><figcaption>Before: R8, wherever you pull</figcaption></figure>

## What changed

I didn't invent anything. SolidCraft already draws a Center Rectangle with its diagonals as construction lines, and a line already decides what it measures by where you pull the value. The ellipse now gets the same treatment: its two axes are drawn through the centre, and its dimensions follow the rules lines use. Constraints that already existed hold it all together, so the ellipse keeps its five degrees of freedom and the file format doesn't change.

- **`D` on the outline** gives a half-axis. Pull across the major axis for the major one, past its end for the minor one. Near the boundary the preview stays put instead of flickering.
- **`D` on an axis** gives the whole axis. Half and whole decide each other, so whichever comes second becomes a reference dimension.

<div class="pair">
<figure><video src="clips/after-1.mp4" controls muted playsinline loop></video><figcaption>The half-axis follows the pull</figcaption></figure>
<figure><video src="clips/after-2.mp4" controls muted playsinline loop></video><figcaption><code>D</code> on an axis: 40 mm and 16 mm</figcaption></figure>
</div>

Drag an axis and the ellipse moves. Drag the outline and the minor half-axis changes. A double-click selects the ellipse with its axes, and move, turn and scale take them along.

<div class="pair">
<figure><video src="clips/after-3.mp4" controls muted playsinline loop></video><figcaption>Drag by an axis, double-click to select</figcaption></figure>
<figure><video src="clips/after-7.mp4" controls muted playsinline loop></video><figcaption>Move, turn and scale</figcaption></figure>
</div>

Trim, extend and break stop at the axes, and deleting the ellipse leaves them behind, just as a Center Rectangle's diagonals stay.

<figure><video src="clips/after-8.mp4" controls muted playsinline loop></video><figcaption>Trim stops at an ellipse axis as it does at a rectangle's diagonal</figcaption></figure>

## Decisions

Most of these came from clicking through a build and writing down whatever annoyed me.

### Two shapes, one set of rules

Whenever I wasn't sure what the axes should do (on delete, under trim, with their constraint badges), I copied the Center Rectangle. Two shapes with construction lines shouldn't teach two different lessons.

### No R on an ellipse

A half-axis is not a radius, and labelling it R is a small lie. I spotted it in one case, then found it in all of them, so R is gone from every ellipse dimension, with axes or without. Values and constraints are untouched; only the label and the drawing changed.

### Deleting an axis changes nothing

My first version fell back to the old radius when an axis was missing. In a click-through that looked like the feature switching itself off. Now `D` works the same with two axes, one or none, which also covers mirrored copies and ellipses from older designs.

<div class="pair">
<figure><video src="clips/after-5a.mp4" controls muted playsinline loop></video><figcaption>Minor axis deleted</figcaption></figure>
<figure><video src="clips/after-6.mp4" controls muted playsinline loop></video><figcaption>No axes at all</figcaption></figure>
</div>

### The second `D` knows what's left

With one half-axis set, a second `D` could land on the same one again and hand me a reference copy of a size I had already set. Now it picks the half-axis that is still free, wherever I pull.

### A preference, because the default changed

A tool that suddenly draws extra lines changes what people see on day one, and SolidCraft keeps the old behaviour behind a preference when that happens. **Preferences › Sketch & selection › Draw ellipses with their axes** is on; switch it off and you get the bare outline. Existing designs are left alone.

<figure><video src="clips/after-9.mp4" controls muted playsinline loop></video><figcaption>The preference, off and on</figcaption></figure>

### Not in this change

The first dimension in a sketch still scales the whole sketch, as it does for every shape; that deserves its own change. And there are no value boxes while drawing: draw first, dimension after.

## What I found on the way

The tests passed, and still missed things. Reading every function each change calls, not just the diff, turned up three:

- **Trim and the axes.** My first pass let the axes cut a trimmed line, and a test had been quietly adjusted to delete the axes instead. That became a decision: trim stops at the axes, and the test now says so.
- **Preview and result disagreed.** The preview showed one half-axis and the placed dimension took the other, because the choice was never passed on. Each half was right on its own.
- **Saved text moved.** Redrawing the radius would have shifted dimension text in existing designs. Stored positions are now read the old way.

The rest came from clicking through every case in the real app and recording it: the axis fallback and the stuck second `D` above. A test checks a value. It doesn't notice a feature quietly switching itself off.

## Before and after

<div class="pair">
<figure><video src="clips/before-1.mp4" controls muted playsinline loop></video><figcaption>Before: R8 wherever the value is pulled</figcaption></figure>
<figure><video src="clips/after-1.mp4" controls muted playsinline loop></video><figcaption>After: the major or the minor half-axis, by the pull</figcaption></figure>
</div>

<div class="pair">
<figure><video src="clips/before-2.mp4" controls muted playsinline loop></video><figcaption>Before: no axis line to pick</figcaption></figure>
<figure><video src="clips/after-2.mp4" controls muted playsinline loop></video><figcaption>After: the whole axes, 40 mm and 16 mm</figcaption></figure>
</div>

<div class="pair">
<figure><video src="clips/before-6.mp4" controls muted playsinline loop></video><figcaption>Before: the second <code>D</code> gives R8 again, as a reference</figcaption></figure>
<figure><video src="clips/after-6.mp4" controls muted playsinline loop></video><figcaption>After: without axes, the second <code>D</code> gives the other half-axis</figcaption></figure>
</div>
