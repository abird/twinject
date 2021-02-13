import { colors, colorAliases } from './colors.js'

export const hasItem = (container, item) => container.split('|').includes(item)

export const isColor = ({ type, prop, B, C, D }, cb) => {
	let color = getColor(B, C, D);
	if (color) {
		if (cb) {
			return cb(color)
		}
		if (color.startsWith('#') && type) {
			// deal with opacity
			const opacityVar = `--tw-${type}-opacity`
			let opacityRule = `${opacityVar}: 1;`
			// convert color to rgb with opacity
			color = rgbaColor(color, `var(${opacityVar})`)
			return `${opacityRule} ${prop}: ${color}`
		} else {
			return `${prop}: ${color}`
		}
	}
}

export const isOpacity = ({ type, B, C }) =>
	B === 'opacity' && `--tw-${type}-opacity: ${C / 100.0}`

export const flexJustify = justify => ({
	start: 'flex-start',
	end: 'flex-end',
	between: 'space-between',
	around: 'space-around',
	evenly: 'space-evenly',
}[justify] || justify)

export const isVar = value => /^(@|\$)/.test(value) && `var(--tw-var-${value.slice(1)})`

export const getSize = (value, neg) => {
	let result = isInMap(value, { px: '1px', full: '100%' }, v => neg ? '-' + v : v)
		|| isVar(value)
	if (result) {
		return result
	}
	const num = +value
	if (!isNaN(num)) {
		return num ? `${num / 4 * (neg ? -1 : 1)}rem` : '0px'
	}
}

export const fractionToPercent = (num, div) => Math.round((num / div * 100 + Number.EPSILON) * 1000000) / 1000000 + '%'

// A: BC
export const propDecl = ({ A, BC }) => `${A}: ${BC}`

export const isIn = (item, container, yes, no) => hasItem(container, item) ? yes : no

export const isEqual = (item, value, yes, no) => item === value ? yes : no

export const getFraction = (value, neg) => {
	const [num, den] = value.split('/')
	if (den) {
		// fraction
		const frac = fractionToPercent(num, den)
		return neg ? '-' + frac : frac
	}
}

export const isNegative = (neg, value) => (neg && (value !== 0 && value !== '0px')) ? '-' + value : value

export const isInMap = (item, map, cb) => item in map && (cb ? cb(map[item]) : map[item])

export const isSize = (value, neg, cb) => {
	const size = getSize(value, neg)
	return size && (cb ? cb(size) : size)
}

export const isFraction = (value, neg, cb) => {
	const frac = getFraction(value, neg)
	return frac && (cb ? cb(frac) : frac)
}

export function getColor(B, C, D) {
	let name = D ? `${B}-${C}` : B
	let level = D || C
	let color = colors[colorAliases[name] || name];
	if (color) {
		const parts = color.split(',')
		if (parts.length > 1) {
			const index = Math.trunc(level / 100)
			color = "#" + parts[index]
		}
		return color
	}
	return isVar(B)
}

export function rgbaColor(color, opacity) {
	let c = color.replace('#', '')
	c = c.length === 3 ? c + c : c	// #000 => #000000 and #fff => #ffffff
	return `rgba(${[0, 2, 4].map(idx => parseInt(c.substr(idx, 2), 16)).join(', ')}, ${opacity})`
}
