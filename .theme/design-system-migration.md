# Thread UI — Design System Reference

This document is the authoritative reference for Thread UI's surface and elevation system. It is intended for AI agents and developers working on component migration. For consumer-facing documentation, see `THEMING.md`.

---

## Core Concepts

Thread UI uses a **layer-based elevation system**. Every component either sits on a named layer (canvas, inset, surface, elevated, overlay) or opts out entirely (transparent). The layer determines the component's background color, shadow depth, border treatment, and stacking order.

### The Two Rules

1. **Light mode communicates elevation through shadows.** Surface, elevated, and overlay are currently all `#FFFFFF`. Shadows and z-index differentiate them.
2. **Dark mode communicates elevation through lightness.** Each layer step up is slightly lighter (`#121212` → `#1E1E1E` → `#252525` → `#2D2D2D`). Shadows are nearly invisible against dark surfaces.

---

## Surface Layers

| Layer      | Light     | Dark      | Purpose                                                              |
| ---------- | --------- | --------- | -------------------------------------------------------------------- |
| `canvas`   | `#FCFCFB` | `#121212` | Page background. The base everything sits on.                        |
| `inset`    | `#EDEEF1` | `#0A0A0A` | Recessed containers: inputs, code blocks, wells. Darker than canvas. |
| `surface`  | `#FFFFFF` | `#1E1E1E` | Cards, panels, content regions. Pops against canvas.                 |
| `elevated` | `#FFFFFF` | `#252525` | Sticky nav, toolbars. Differentiated by shadow in light mode.        |
| `overlay`  | `#FFFFFF` | `#2D2D2D` | Modals, dropdowns, popovers. Highest elevation.                      |

### Interactive States

| Token    | Light     | Dark      | Purpose                             |
| -------- | --------- | --------- | ----------------------------------- |
| `hover`  | `#F3F4F6` | `#333333` | Hovered interactive surfaces        |
| `active` | `#E9ECEF` | `#3A3A3A` | Pressed/active interactive surfaces |

These are not layers — they are interaction states applied on top of any surface.

---

## Shadow Scale

Mode-independent. Compound shadows (tight edge + diffused ambient).

| Token | Value                                                     | Layer Association |
| ----- | --------------------------------------------------------- | ----------------- |
| `sm`  | `0 1px 2px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)`  | `surface`         |
| `md`  | `0 2px 4px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)` | `elevated`        |
| `lg`  | `0 4px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)` | `overlay`         |

---

## Structure Colors (Borders & Dividers)

| Token     | Light     | Dark      | Usage                                      |
| --------- | --------- | --------- | ------------------------------------------ |
| `subtle`  | `#E8EAED` | `#2A2A2A` | Card edges, nav borders, light separators  |
| `default` | `#D1D5DB` | `#3D3D3D` | Input borders, dividers, dropdown outlines |
| `strong`  | `#9CA3AF` | `#5A5A5A` | Active/pressed borders, emphasis states    |

Input focus uses `primary.main`, not a structure color.

---

## Z-Index Scale

| Token     | Value | Usage                                     |
| --------- | ----- | ----------------------------------------- |
| `base`    | `0`   | Normal document flow                      |
| `sticky`  | `100` | NavMenu, SideNav, sticky controls         |
| `overlay` | `200` | Open dropdowns, popovers, tooltips        |
| `modal`   | `300` | Modal dialogs + scrim                     |
| `system`  | `400` | Toast notifications, global error banners |

---

## Scrim

```
--thread-scrim: rgba(0, 0, 0, 0.4)
```

Mode-independent. Used only by `Modal`.

---

## Surface Layer Map

The `SurfaceLayerMap` connects each layer to its default bg, shadow, structure, and zIndex. Components accept a `layer` prop and resolve defaults from this map, with individual overrides via `bg`, `shadow`, and `structure` props.

```typescript
SurfaceLayerMap = {
	canvas: { bg: 'canvas', shadow: 'none', structure: 'none', zIndex: 'none' },
	inset: { bg: 'inset', shadow: 'none', structure: 'default', zIndex: 'none' },
	surface: { bg: 'surface', shadow: 'sm', structure: 'subtle', zIndex: 'none' },
	elevated: { bg: 'elevated', shadow: 'md', structure: 'subtle', zIndex: 'sticky' },
	overlay: { bg: 'overlay', shadow: 'lg', structure: 'none', zIndex: 'overlay' },
};
```

---

## Component Prop Pattern

Components that fully participate in the layer system with overrides follow this pattern:

```typescript
type Props = {
	/** Layer shorthand — resolves bg, shadow, structure from SurfaceLayerMap */
	layer?: SurfaceLayerOptions;
	/** Override background color */
	bg?: BgOptions;
	/** Override shadow */
	shadow?: ShadowOptions;
	/** Override border structure color */
	structure?: StructureColorOptions | 'none';
};
```

Resolution logic:

```typescript
const defaults = SurfaceLayerMap[layer];
const resolvedBg = bg ?? defaults.bg;
const resolvedShadow = shadow ?? defaults.shadow;
const resolvedStructure = structure ?? defaults.structure;
```

---

## Key Types

| Type                    | Purpose                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `SurfaceLayerOptions`   | `keyof SurfaceColors` — the five named layers                        |
| `BgOptions`             | `keyof SurfaceColors \| 'none'` — what `bg` props accept             |
| `ShadowOptions`         | `keyof ShadowScale \| 'none'` — what `shadow` props accept           |
| `StructureColorOptions` | `keyof StructureColors` — `subtle \| default \| strong`              |
| `ZIndexOptions`         | `keyof ZIndexScale` — `base \| sticky \| overlay \| modal \| system` |

### Design Rules

- `'none'` is a component behavior (transparent / no shadow), NOT a theme token. No CSS variable is generated for it.
- `zIndex` and `shadow` are nested under `Theme` to avoid key collisions with `SurfaceColors` (both have `overlay`).
- `SurfaceLayerMap` is a plain TypeScript object, not a Panda CSS construct. Components use it to resolve which recipe variants to apply.

---

## Panda CSS Recipe Pattern

Recipes define static variants for each token. The `SurfaceLayerMap` selects among them at runtime.

```typescript
variants: {
    bg: {
        none: {},
        canvas: { backgroundColor: 'canvas' },
        inset: { backgroundColor: 'inset' },
        surface: { backgroundColor: 'surface' },
        elevated: { backgroundColor: 'elevated' },
        overlay: { backgroundColor: 'overlay' },
    },
    shadow: {
        none: { boxShadow: 'none' },
        sm: { boxShadow: 'sm' },
        md: { boxShadow: 'md' },
        lg: { boxShadow: 'lg' },
    },
    structure: {
        none: { borderWidth: '0' },
        subtle: { borderWidth: 'md', borderColor: 'structure.subtle' },
        default: { borderWidth: 'md', borderColor: 'structure.default' },
        strong: { borderWidth: 'md', borderColor: 'structure.strong' },
    },
}
```

---

## Component Audit & Migration Checklist

### Accept `layer` Prop (With Overrides)

- [x] **Card** — `layer` default: `surface`. Overrides: bg, shadow, structure. Not interactive.
- [x] **InfoCard** — `layer` default: `surface`. Overrides: bg, shadow, structure. Always interactive (hover → `hover`, active → `active`, shadow → `sm` on hover).
- [x] **MediaCard** — `layer` default: `surface`. Overrides: bg, shadow, structure. Always interactive (hover → `hover`, active → `active`, shadow → `sm` on hover).

### Accept `bg` Prop Only

- [x] **Container** — `bg` default: `none` (transparent). Consumer sets `bg="canvas"` or `bg="surface"` for alternating page bands. No shadow, structure, or zIndex.
- [x] **Footer** — `bg` default: `canvas`. Fixed `structure.subtle` top border. Text: `text.secondary`. No shadow or zIndex.

### Fixed Layer (No Prop)

- [ ] **Modal** — Fixed `overlay`. zIndex override to `modal`. Scrim fixed.
- [x] **NavMenu** — Fixed `elevated`. Bottom border via `structure.subtle`. Hover/active on items. zIndex: `sticky`.
- [ ] **SideNav** — Fixed `elevated` (when fixed) / `surface` (when static). Trailing edge border via `structure.subtle`. Shadow override to `none`.
- [ ] **Dropdown (closed)** — Fixed `inset`. Border via `structure.default`. Focus: border → `primary.main`.
- [ ] **Dropdown (open menu)** — Fixed `overlay`. Hover/active on items. zIndex: `overlay`. Shadow: `lg`.
- [ ] **FileUpload** — Fixed `inset`. Dashed border via `structure.default`. Drag-over: border → `primary.main`.
- [ ] **NumberInput** — Fixed `inset`. Border via `structure.default`. Focus: border → `primary.main`.
- [ ] **TextInput** — Fixed `inset`. Border via `structure.default`. Focus: border → `primary.main`.
- [ ] **DataDisplayControls** — `none` default. `elevated` when `sticky={true}`.

### No Layer Participation

- [ ] **Button** — Palette-driven bg/border/hover. No surface system.
- [ ] **IconButton** — Same as Button.
- [ ] **Toggle** — Track: `gray.main` off / `primary.main` on. Thumb: `white`.
- [ ] **Divider** — Structure color as line color. Prop default: `subtle`.
- [ ] **Icon** — Color prop, default `text.secondary`.
- [ ] **DotsLoader** — Dot color from `text.secondary`.
- [ ] **SpinLoader** — Stroke from `primary.main`.
- [ ] **Skeleton** — Shimmer uses `elevated` token directly in recipe.
- [ ] **SkeletonLayout** — Arranges Skeleton bars. Inherits surface from parent.
- [ ] **ImagePanel** — Pure content. Inherits surface from parent.
- [ ] **FormLabel** — Text color prop, default `text.standard`.
- [ ] **Title** — Text color prop, default `text.standard`.
- [ ] **H1** — Text color prop, default `text.standard`.
- [ ] **H2** — Text color prop, default `text.standard`.
- [ ] **H3** — Text color prop, default `text.standard`.
- [ ] **Text** — Text color prop, default `text.standard`.
- [ ] **Subtitle** — Text color prop, default `text.secondary`.
- [ ] **List** — Text color, inherits.
- [ ] **OrderedList** — Text color, inherits.
- [ ] **PageHeader** — Fixed: heading `text.standard`, subtitle `text.secondary`.
- [ ] **ColumnLayout** — Pure layout, no visual opinion.
- [ ] **MasonryLayout** — Pure layout, no visual opinion.
- [ ] **FilterControls** — Children handle their own layers.
- [ ] **SortControls** — Children handle their own layers.

### Global Requirements

- [ ] Storybook preview background set to `canvas` (`#FCFCFB`)
- [ ] App body/root uses `background-color: var(--thread-canvas)`
- [ ] Panda config registers all new semantic tokens (structure.subtle/default/strong, shadow sm/md/lg, zIndex scale)
- [ ] Tailwind config updated with matching tokens (if maintained)
- [ ] Dark mode text.secondary contrast verified (must pass WCAG AA against surface)
- [ ] Dark mode text.accent contrast verified (must pass WCAG AA against surface)
