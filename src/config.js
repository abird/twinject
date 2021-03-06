import { box, display, inline, table, object, overflow, overscroll, position, sticky, edge, inset, visibility, z, grid, rowcol, auto, gap, margin, padding, background, text, font, typo, not, strokeFill, tracking, leading, list, placeholder, rounded, border, flex, order, transition, duration, ease, delay, animate, shadow, opacity, size, minSize, maxSize, align, justify, place, scale, rotate, translate, skew, origin, transform, appearance, outline, pointer, resize, select, sr, gradient, ring, divide, space, set } from './classes.js'
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

	// -- Theme Vars --
	set
}

export const preflight = [
	'*,::after,::before{box-sizing:border-box}',
	':root{-moz-tab-size:4;tab-size:4}',
	'html{line-height:1.15;-webkit-text-size-adjust:100%}',
	'body{margin:0}',
	'body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"}',
	'hr{height:0;color:inherit}',
	'abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}',
	'b,strong{font-weight:bolder}',
	'code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",Menlo,monospace;font-size:1em}',
	'small{font-size:80%}',
	'sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}',
	'sub{bottom:-.25em}',
	'sup{top:-.5em}',
	'table{text-indent:0;border-color:inherit}',
	'button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}',
	'button,select{text-transform:none}',
	'[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}',
	'::-moz-focus-inner{border-style:none;padding:0}',
	':-moz-focusring{outline:1px dotted ButtonText}',
	':-moz-ui-invalid{box-shadow:none}',
	'legend{padding:0}',
	'progress{vertical-align:baseline}',
	'::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}',
	'[type=search]{-webkit-appearance:textfield;outline-offset:-2px}',
	'::-webkit-search-decoration{-webkit-appearance:none}',
	'::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}',
	'summary{display:list-item}',
	'blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}',
	'button{background-color:transparent;background-image:none}',
	'button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}',
	'fieldset{margin:0;padding:0}',
	'ol,ul{list-style:none;margin:0;padding:0}',
	'html{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";line-height:1.5}',
	'body{font-family:inherit;line-height:inherit}',
	'*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}',
	'hr{border-top-width:1px}',
	'img{border-style:solid}',
	'textarea{resize:vertical}',
	'input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}',
	'[role=button],button{cursor:pointer}',
	'table{border-collapse:collapse}',
	'h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}',
	'a{color:inherit;text-decoration:inherit}',
	'button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}',
	'code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}',
	'audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}',
	'img,video{max-width:100%;height:auto}',]

export const screenSizes = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
}
