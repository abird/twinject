import { hasItem, isColor, isOpacity, getSize, flexJustify, isIn, isEqual, getFraction, isNegative, isInMap, isSize, isFraction, getColor, rgbaColor } from './util.js'


export const box = ({ B }) => `box-sizing: ${B}-box`

export const display = ({ cls }) => `display: ${cls === 'hidden' ? 'none' : cls}`

export const inline = ({ B, C, BC }) => `display: ${C ? BC : (B ? `inline-${B}` : 'inline')}`

export const table = ({ cls, B }) => /auto|fixed/.test(B) ? `table-layout: ${B}` : `display: ${cls}`

export const object = ({ BC }) =>
	isIn(BC, 'contain|cover|fill|none|scale-down', `object-fit: ${BC}`, `object-position: ${BC.replace('-', ' ')}`)

export const overflow = ({ B, C }) =>
	isIn(B, 'ellipsis|clip', `text-overflow: ${B}`, `overflow${C ? '-' + B : ''}: ${C ? C : B}`)

export const overscroll = ({ B, C }) => {
	let dim = '';
	if (C) {
		dim = '-' + B;
		B = C
	}
	return `overscroll-behavior${dim}: ${B}`
}

export const position = p => `position: ${p.A}`

export const sticky = p => 'position: -webkit-sticky; ' + position(p)

export const edge = ({ A, B, neg }) => {
	let value =
		{ full: '100%', auto: B, px: '1px' }[B] ||
		getFraction(B) ||
		getSize(B) ||
		B
	return `${A}: ${isNegative(neg, value)}`
}

export const inset = ({ B, C, neg }) => {
	let edges;
	if (B === 'x') {
		edges = 'right|left'
		B = C
	} else if (B === 'y') {
		edges = 'top|bottom'
		B = C
	} else {
		edges = 'top|right|bottom|left'
	}
	return edges.split('|').map(e => edge({ A: e, B, neg })).join('; ')
}

export const visibility = ({ A }) => `visibility: ${A === "visible" ? A : "hidden"}`

export const z = p => `z-index: ${p.B}`

export const grid = ({ B, C, D }) => {
	if (!B) {
		return 'display: grid'
	} else if (B === 'flow') {
		if (C === 'col') C = 'column'
		return `grid-auto-flow: ${C + (D ? ' ' + D : '')}`
	} else {
		if (B === 'cols') B = 'columns'
		let value
		if (C === 'none') {
			value = C
		} else {
			value = `repeat(${C}, minmax(0, 1fr))`
		}
		return `grid-template-${B}: ${value}`
	}
}

export const rowcol = ({ A, B, C }) => {
	const type = A === 'col' ? 'column' : A
	if (B === 'auto') {
		return `grid-${type}: auto`
	} else if (B === 'span') {
		return C === 'full' ? `grid-${type}: 1 / -1` : `grid-${type}: span ${C} / span ${C}`
	}
	return isIn(B, 'start|end', `grid-${type}-${B}: ${C}`)
}

export const auto = ({ B, C }) => {
	const type = B === 'cols' ? 'columns' : B
	let value
	if (C === 'auto') {
		value = C
	} else if (hasItem('min|max', C)) {
		value = `-webkit-${C}-content; grid-auto-${type}: ${C}-content`
	} else {
		value = 'minmax(0, 1fr)'
	}
	return `grid-auto-${type}: ${value}`
}

export const gap = ({ B, C }) => `${{ x: 'column-gap', y: 'row-gap' }[B] || 'gap'}: ${getSize(C || B)}`

// spacing for margins, padding, etc
const spacing = (prop, { A, B, neg }) => {
	// format value
	B = getSize(B, neg) || B

	const modifier = A[1]
	if (modifier) {
		let propMod = { t: 'top', r: 'right', b: 'bottom', l: 'left', y: ['top', 'bottom'], x: ['left', 'right'] }[modifier]
		if (Array.isArray(propMod)) {
			return `${prop}-${propMod[0]}: ${B}; ${prop}-${propMod[1]}: ${B}`
		}
		prop += '-' + propMod
	}
	return `${prop}: ${B}`
}

export const margin = p => spacing('margin', p)

export const padding = p => spacing('padding', p)

// background color, opacity
export const background = ({ B, C, D, BC }) => {
	if (B === 'gradient') {
		const map = {
			t: 'top',
			tr: 'top right',
			r: 'right',
			br: 'bottom right',
			b: 'bottom',
			bl: 'bottom left',
			l: 'left',
			tl: 'top left'
		}
		return `background-image: linear-gradient(to ${map[D]}, var(--tw-gradient-stops))`
	}
	if (B === 'repeat' || C === 'repeat') {
		let value = C ? (hasItem('round|space', C) ? C : BC) : B
		return `background-repeat: ${value}`
	}
	return isEqual(B, 'clip', isEqual(C, 'text', '-webkit-background-clip: text; background-clip: text', `background-clip: ${C}-box`))
		|| isEqual(B, 'none', 'background-image: none')
		|| isIn(B, 'fixed|local|scroll', `background-attachment: ${B}`)
		|| isIn(B, 'top|bottom|left|right|center', `background-position: ${C ? `${B} ${C}` : B}`)
		|| isIn(B, 'auto|cover|contain', `background-size: ${B}`)
		|| isColor({ type: 'bg', prop: 'background-color', B, C, D })
		|| isOpacity({ type: 'bg', B, C })
}

// text color, opacity, alignment, size
export const text = ({ B, C, D }) => {
	// size
	const textSizeMap = {
		xs: [0.75, 1],
		sm: [0.875, 1.25],
		base: [1, 1.5],
		lg: [1.125, 1.75],
		xl: [1.25, 1.75],
		'2xl': [1.5, 2],
		'3xl': [1.875, 2.25],
		'4xl': [2.25, 2.5],
		'5xl': [3, 0],
		'6xl': [3.75, 0],
		'7xl': [4.5, 0],
		'8xl': [6, 0],
		'9xl': [8, 0],
	}
	const sizeInfo = textSizeMap[B]
	if (sizeInfo) {
		const [fs, lh] = sizeInfo
		return `font-size: ${fs}rem; line-height: ${lh ? (lh + 'rem') : 1}`
	}

	return isInMap(B, textSizeMap, ([fs, lh]) => `font-size: ${fs}rem; line-height: ${lh ? (lh + 'rem') : 1}`)
		|| isIn(B, 'left|right|center|justify', `text-align: ${B}`)
		|| isColor({ type: 'text', prop: 'color', B, C, D })
		|| isOpacity({ type: 'text', B, C })
}

export const font = p => {
	const typeMap = {
		'sans': 'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
		'serif': 'font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
		'mono': 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
	}
	const weightMap = {
		'thin': '100',
		'extralight': '200',
		'light': '300',
		'normal': '400',
		'medium': '500',
		'semibold': '600',
		'bold': '700',
		'extrabold': '800',
		'black': '900',
	}
	return isInMap(p.B, typeMap)
		|| isInMap(p.B, weightMap, weight => `font-weight: ${weight}`)
}

export const typo = ({ cls, A, B, C, BC }) => {
	const styleMap = {
		'italic': 'font-style: italic',
		'underline': 'text-decoration: underline',
		'line-through': 'text-decoration: line-through',
		'no-underline': 'text-decoration: none',
		'uppercase': 'text-transform: uppercase',
		'lowercase': 'text-transform: lowercase',
		'capitalize': 'text-transform: capitalize',
		'normal-case': 'text-transform: none',
		'truncate': 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap',
		'break-normal': 'overflow-wrap: normal; word-break: normal',
		'break-words': 'overflow-wrap: break-word',
		'break-all': 'word-break: break-all',
	}

	const numVarMap = {
		'ordinal': 'ordinal',
		'slashed-zero': 'slashed-zero',
		'lining-nums': 'numeric-figure',
		'oldstyle-nums': 'numeric-figure',
		'proportional-nums': 'numeric-spacing',
		'tabular-nums': 'numeric-spacing',
		'diagonal-fractions': 'numeric-fraction',
		'stacked-fractions': 'numeric-fraction',
	}

	const value = C ? BC : B
	if (value) {
		if (A === 'align') {
			return `vertical-align: ${value}`
		} else if (A === 'whitespace') {
			return `white-space: ${value}`
		}
	}

	if ([A, B].includes('antialiased')) {
		const [v1, v2] = B ? ['auto', 'auto'] : ['antialiased', 'grayscale']
		return `-webkit-font-smoothing: ${v1}; -moz-osx-font-smoothing: ${v2}`
	}

	return isInMap(cls, styleMap)
		|| isInMap(cls, numVarMap, numvar => ({
			initrule: '.ordinal, .slashed-zero, .lining-nums, .oldstyle-nums, .proportional-nums, .tabular-nums, .diagonal-fractions, .stacked-fractions {--tw-ordinal: var(--tw-empty,/*!*/ /*!*/); --tw-slashed-zero: var(--tw-empty,/*!*/ /*!*/); --tw-numeric-figure: var(--tw-empty,/*!*/ /*!*/); --tw-numeric-spacing: var(--tw-empty,/*!*/ /*!*/); --tw-numeric-fraction: var(--tw-empty,/*!*/ /*!*/); font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}',
			initgroup: 'numvar',
			declarations: `--tw-${numvar}: ${cls}`
		}))
		|| isEqual(cls, 'normal-nums', 'font-variant-numeric: normal')

}

export const not = p => ({ 'italic': 'font-style: normal', 'sr-only': 'position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal' })[p.BC]

export const strokeFill = ({ A, B }) => isEqual(B, 'current', `${A}: currentColor`, `stroke-width: ${B}`)

export const tracking = p => {
	const map = {
		tighter: -0.05,
		tight: -0.025,
		normal: 0,
		wide: 0.025,
		wider: 0.05,
		widest: 0.1,
	}
	return isInMap(p.B, map, trk => `letter-spacing: ${trk}em`)
}

export const leading = p => {
	const map = {
		'none': 1,
		'tight': 1.25,
		'snug': 1.375,
		'normal': 1.5,
		'relaxed': 1.625,
		'loose': 2,
		'3': '.75rem',
	}
	return isInMap(p.B, map, ldg => `line-height: ${ldg}`)
		|| isSize(p.B, false, size => `line-height: ${size}`)
}

export const list = ({ B }) => `list-style-${hasItem('inside|outside', B) ? 'position' : 'type'}: ${B}`

export const placeholder = p => ({ postclass: '::placeholder', declarations: isOpacity({ type: p.A, ...p }) || isColor({ type: p.A, prop: 'color', ...p }) })

export const rounded = ({ B, C }) => {
	const edge = { t: ['tl', 'tr'], r: ['tr', 'br'], b: ['br', 'bl'], l: ['tl', 'bl'] }[B];
	if (edge) {
		// do two corners
		return `${rounded({ B: edge[0], C })}; ${rounded({ B: edge[1], C })}`
	}

	const corner = { tl: 'top-left', tr: 'top-right', br: 'bottom-right', bl: 'bottom-left' }[B];
	if (corner) {
		B = C
	}

	let formatValue = { none: '0px', sm: '0.125rem', [undefined]: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem', full: '9999px' }[B]
	return corner ? `border-${corner}-radius: ${formatValue}` : `border-radius: ${formatValue}`
}

// border width, color, opacity, and style
export const border = ({ B, C, D }) => {
	// width
	let edge = { t: 'top', r: 'right', b: 'bottom', l: 'left' }[B]
	if (!B || edge || !isNaN(B)) {
		if (edge) {
			B = C
			edge += '-'
		} else {
			edge = ''
		}
		if (!B) {
			B = 1
		}
		return `border-${edge}width: ${B}px`
	}

	return isIn(B, 'collapse|separate', `border-collapse: ${B}`)
		|| isColor({ type: 'border', prop: 'border-color', B, C, D })
		|| isOpacity({ type: 'border', B, C })
		|| isIn(B, 'solid|dashed|dotted|double|none', `border-style: ${B}`)
}

// flex
export const flex = ({ BC }) => {
	const map = {
		// display
		undefined: 'display: flex',
		// flex direction
		'row': 'flex-direction: row',
		'row-reverse': 'flex-direction: row-reverse',
		'col': 'flex-direction: column',
		'col-reverse': 'flex-direction: column-reverse',
		// flex wrap
		'wrap': 'flex-wrap: wrap',
		'wrap-reverse': 'flex-wrap: wrap-reverse',
		'nowrap': 'flex-wrap: nowrap',
		// flex
		'1': 'flex: 1 1 0%',
		'auto': 'flex: 1 1 auto',
		'initial': 'flex: 0 1 auto',
		'none': 'flex: none',
		// flex grow
		'grow': 'flex-grow: 1',
		'grow-0': 'flex-grow: 0',
		// flex shrink
		'shrink': 'flex-shrink: 1',
		'shrink-0': 'flex-shrink: 0',
	}
	return map[BC];
}

export const order = ({ B }) => `order: ${{ first: -9999, last: 9999, none: '0' }[B] || B}`

export const transition = ({ B }) => {
	const map = {
		[undefined]: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
		colors: 'background-color, border-color, color, fill, stroke',
		shadow: 'box-shadow',
	}
	let value = `transition-property: ${map[B] || B}`
	if (B !== 'none') {
		value += '; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms'
	}
	return value
}

export const duration = p => `transition-duration: ${p.B}ms`

export const ease = ({ BC }) => {
	const map = {
		in: 'cubic-bezier(0.4, 0, 1, 1)',
		out: 'cubic-bezier(0, 0, 0.2, 1)',
		'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
	}
	const value = map[BC] || BC
	return `transition-timing-function: ${value}`
}

export const delay = p => `transition-delay: ${p.B}ms`

export const animate = ({ B }) => {
	const map = {
		spin: ['spin 1s linear infinite', '@keyframes spin {to{transform: rotate(360deg)}}'],
		ping: ['ping 1s cubic-bezier(0, 0, 0.2, 1) infinite', '@keyframes ping {75%, 100% {transform: scale(2); opacity: 0}}'],
		pulse: ['pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', '@keyframes pulse {50% {opacity: .5}}'],
		bounce: ['bounce 1s infinite', '@keyframes bounce { 0%, 100% {transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1)} 50% {transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1)}}'],
	}
	return isInMap(B, map, ([decl, rule]) => ({
		initrule: rule,
		initgroup: 'animate' + B,
		declarations: `animation: ${decl}`
	}))
		|| isEqual(B, 'none', 'animation: none')
}

export const shadow = ({ B }) => {
	const p1 = {
		'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		'reg': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
		'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
		'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
		'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
		'none': '0 0 #0000',
	}[B || 'reg']
	return `--tw-shadow: ${p1}; box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)`
}

export const opacity = p => `opacity: ${p.B / 100.0}`

export const size = ({ A, B }) => {
	const dim = A === 'w' ? 0 : 1
	const dimString = ['width', 'height'][dim]
	let map = {
		auto: ['width: auto', 'height: auto'],
		px: ['width: 1px', 'height: 1px'],
		full: ['width: 100%', 'height: 100%'],
		screen: ['width: 100vw', 'height: 100vh'],
		min: ['width: -webkit-min-content; width: min-content'],
		max: ['width: -webkit-max-content; width: max-content'],
	}

	return isInMap(B, map, item => item[dim])
		|| isFraction(B, false, frac => `${dimString}: ${frac}`)
		|| isSize(B, false, size => `${dimString}: ${size}`)
}

export const minSize = ({ cls }) => {
	const map = {
		'min-w-0': 'min-width: 0px',
		'min-w-full': 'min-width: 100%',
		'min-w-min': 'min-width: -webkit-min-content; min-width: min-content',
		'min-w-max': 'min-width: -webkit-max-content; min-width: max-content',
		'min-h-0': 'min-height: 0px',
		'min-h-full': 'min-height: 100%',
		'min-h-screen': 'min-height: 100vh',
	}
	return map[cls];
}

export const maxSize = ({ B, C, D }) => {
	const wMap = {
		'0': '0rem',
		'xs': '20rem',
		'sm': '24rem',
		'md': '28rem',
		'lg': '32rem',
		'xl': '36rem',
		'2xl': '42rem',
		'3xl': '48rem',
		'4xl': '56rem',
		'5xl': '64rem',
		'6xl': '72rem',
		'7xl': '80rem',
		'full': '100%',
		'none': 'none',
		'min': '-webkit-min-content; max-width: min-content',
		'max': '-webkit-max-content; max-width: max-content',
		'prose': '65ch',
		'screen-sm': '640px',
		'screen-md': '768px',
		'screen-lg': '1024px',
		'screen-xl': '1280px',
		'screen-2xl': '1536px',
	}
	if (B === 'w') {
		// width
		const key = D ? C + '-' + D : C
		return `max-width: ${wMap[key]}`
	}

	const hMap = {
		'px': '1px',
		'full': '100%',
		'screen': '100vh',
	}
	return (C in hMap) ? `max-height: ${hMap[C]}` : `max-height: ${getSize(C)}`
}

export const align = p => `align-${p.A}: ${flexJustify(p.B)}`

export const justify = ({ B, C }) =>
	isIn(B, 'items|self', C && `justify-${B}: ${C}`, `justify-content: ${flexJustify(B)}`)

export const place = ({ B, C }) => {
	if (hasItem('content|items|self', B)) {
		const map = {
			between: 'space-between',
			around: 'space-around',
			evenly: 'space-evenly',
		}
		return `place-${B}: ${map[C] || C}`
	}
}

export const scale = ({ B, C }) => {
	// removing leading zero
	const scaleItem = (dim, prop) => `--tw-scale-${dim}: ${(prop / 100).toString().replace('0.', '.')}`
	return isIn(B, 'x|y', scaleItem(B, C), `${scaleItem('x', B)}; ${scaleItem('y', B)}`)
}

export const rotate = p => `--tw-rotate: ${isNegative(p.neg, p.B)}deg`

export const translate = ({ B, C, neg }) => isFraction(C, neg, frac => `--tw-translate-${B}: ${frac}`)
	|| isSize(C, neg, size => `--tw-translate-${B}: ${size}`)

export const skew = ({ B, C, neg }) => `--tw-skew-${B}: ${neg ? -C : C}deg`

export const origin = p => `transform-origin: ${p.BC.replace('-', ' ')}`

export const transform = ({ B }) => {
	if (B === 'none') {
		return 'transform: none'
	}

	const varX = 'var(--tw-translate-x)'
	const varY = 'var(--tw-translate-y)'
	return `--tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; transform: ${B !== 'gpu' ? `translateX(${varX}) translateY(${varY})` : `translate3d(${varX}, ${varY}, 0)`} rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`
}

export const appearance = () => '-webkit-appearance: none; appearance: none'

export const outline = p => `outline: 2px ${p.B === 'none' ? 'solid transparent' : `dotted ${p.B}`}; outline-offset: 2px`

export const pointer = p => `pointer-events: ${p.C}`

export const resize = p => `resize: ${p.B ? ({ y: 'vertical', x: 'horizontal', }[p.B] || 'none') : 'both'}`

export const select = p => `-webkit-user-select: ${p.B}; user-select: ${p.B}`

export const sr = () => 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0'

export const gradient = ({ A, B, C, D }) => {
	let color = getColor(B, C, D)
	if (!color) {
		return
	}
	let rgba = 'rgba(0, 0, 0, 0)';
	if (B === 'current') {
		rgba = 'rgba(255, 255, 255, 0)'
	} else if (color.startsWith('#')) {
		rgba = rgbaColor(color, 0)
	}

	switch (A) {
		case 'from':
			return `--tw-gradient-from: ${color}; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, ${rgba})`
		case 'via':
			return `--tw-gradient-stops: var(--tw-gradient-from), ${color}, var(--tw-gradient-to, ${rgba})`
		case 'to':
			return `--tw-gradient-to: ${color}`
	}
}

export const ring = ({ A, B, C, D }) => {
	switch (B) {
		case 'opacity': return `--tw-ring-opacity: ${C / 100}`
		case 'inset': return `--tw-ring-inset: inset`
		case 'transparent': return `--tw-ring-color: transparent`
		case 'current': return `--tw-ring-color: currentColor`
	}

	let offset = false;
	if (B === 'offset') {
		offset = true;
		B = C
		C = D
		D = undefined
	}
	let color = getColor(B, C, D);
	if (color) {
		return offset ? `--tw-ring-offset-color: ${color}` : `--tw-ring-opacity: 1; --tw-ring-color: ${rgbaColor(color, 'var(--tw-ring-opacity)')}`
	}
	// number value
	if (!B) {
		B = 3
	}
	return offset ? `--tw-ring-offset-width: ${B}px` : `--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(${B}px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`
}

export const divide = ({ A, B, C, D }) => {
	const getDivide = () => {
		if (B === 'opacity') {
			return `--tw-divide-opacity: ${C / 100}`
		}
		if (hasItem('x|y', B)) {
			// width
			if (C === 'reverse') {
				return `--tw-divide-${B}-reverse: 1`
			}
			if (!C) {
				C = 1
			}
			if (B === 'x') {
				return `--tw-divide-x-reverse: 0; border-right-width: calc(${C}px * var(--tw-divide-x-reverse)); border-left-width: calc(${C}px * calc(1 - var(--tw-divide-x-reverse)))`
			} else {
				return `--tw-divide-y-reverse: 0; border-top-width: calc(${C}px * calc(1 - var(--tw-divide-y-reverse))); border-bottom-width: calc(${C}px * var(--tw-divide-y-reverse))`
			}
		}

		return isColor({ B, C, D }, color => isIn(B, 'transparent|current', `border-color: ${color}`, `--tw-divide-opacity: 1; border-color: ${rgbaColor(color, 'var(--tw-divide-opacity)')}`))
			|| isIn(B, 'solid|dashed|dotted|double|none', `border-style: ${B}`)
	}

	return {
		postclass: ' > :not([hidden]) ~ :not([hidden])',
		declarations: getDivide()
	}
}

export const space = ({ B, C, neg }) => {
	const getSpaceDeclaration = () => {
		const size = getSize(C, neg)
		if (size) {
			if (C === 'reverse') {
				return `--tw-space-${B}-reverse: 1`
			}
			if (B === 'x') {
				return `--tw-space-x-reverse: 0; margin-right: calc(${size} * var(--tw-space-x-reverse)); margin-left: calc(${size} * calc(1 - var(--tw-space-x-reverse)))`
			} else {
				return `--tw-space-y-reverse: 0; margin-top: calc(${size} * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(${size} * var(--tw-space-y-reverse))`
			}
		}
		if (C === 'reverse') {
			return `--tw-space-${B}-reverse: 1`
		}
	}
	return {
		postclass: ' > :not([hidden]) ~ :not([hidden])',
		declarations: getSpaceDeclaration()
	}
}

