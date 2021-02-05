import { box, display, inline, table, object, overflow, overscroll, position, sticky, edge, inset, visibility, z, grid, rowcol, auto, gap, spacing, margin, padding, background, text, font, typo, not, strokeFill, tracking, leading, list, placeholder, rounded, border, flex, order, transition, duration, ease, delay, animate, shadow, opacity, size, minSize, maxSize, align, justify, place, scale, rotate, translate, skew, origin, transform, appearance, outline, pointer, resize, select, sr, gradient, ring, divide, space } from './classes.js'
import { propDecl } from './util.js'

export const classMap = {
	// -- Layout --
	box,
	hidden: display,
	block: display,
	inline,
	table,
	flow: display,
	contents: display,
	float: propDecl,
	clear: propDecl,
	object,
	overflow,
	overscroll,
	static: position,
	fixed: position,
	absolute: position,
	relative: position,
	sticky,
	inset,
	top: edge,
	right: edge,
	bottom: edge,
	left: edge,
	visible: visibility,
	invisible: visibility,
	z,

	// -- Grid --
	grid,
	col: rowcol,
	row: rowcol,
	auto,
	gap,

	// -- Spacing --
	// margin
	m: margin,
	mx: margin,
	my: margin,
	mt: margin,
	mr: margin,
	mb: margin,
	ml: margin,
	// padding
	p: padding,
	px: padding,
	py: padding,
	pt: padding,
	pr: padding,
	pb: padding,
	pl: padding,
	space,

	// -- Typography --
	text,
	font,
	italic: typo,
	not,
	tracking,
	leading,
	underline: typo,
	line: typo,
	list,
	no: typo,
	uppercase: typo,
	lowercase: typo,
	capitalize: typo,
	normal: typo,
	truncate: typo,
	align: typo,
	whitespace: typo,
	break: typo,
	antialiased: typo,
	subpixel: typo,
	placeholder,
	ordinal: typo,
	slashed: typo,
	lining: typo,
	oldstyle: typo,
	proportional: typo,
	tabular: typo,
	diagonal: typo,
	stacked: typo,

	// -- Borders --
	rounded,
	border,
	ring,
	divide,

	// -- Transitions and Animation
	transition,
	duration,
	ease,
	delay,
	animate,

	// -- Transforms --
	scale,
	rotate,
	translate,
	skew,
	origin,
	transform,

	// -- Interactivity --
	appearance,
	cursor: propDecl,
	outline,
	pointer,
	resize,
	select,
	sr,

	// -- Miscellaneous --
	shadow,
	opacity,

	// -- Flexbox --
	flex,
	order,

	// -- Box Alignment --
	justify,
	content: align,
	items: align,
	self: align,
	place,

	// -- Sizing --
	w: size,
	h: size,
	min: minSize,
	max: maxSize,

	// -- Backgrounds --
	bg: background,
	from: gradient,
	to: gradient,
	via: gradient,

	// -- Miscellaneous --
	stroke: strokeFill,
	fill: strokeFill,
}