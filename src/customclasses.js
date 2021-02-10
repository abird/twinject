import { hasItem, isColor, isOpacity, getSize, flexJustify, isIn, isEqual, getFraction, isNegative, isInMap, isSize, isFraction, getColor, rgbaColor } from './util.js'

// bg-stripes
export const bg = ({ B, C, D, E }) => {
	if (B !== 'stripes') return

	if (!C) {
		// just bg-stripes
		return 'background-image: linear-gradient(45deg, var(--stripes-color) 12.50%, transparent 12.50%, transparent 50%, var(--stripes-color) 50%, var(--stripes-color) 62.50%, transparent 62.50%, transparent 100%); background-size: 5.66px 5.66px'
	}

	const color = getColor(C, D, E)
	if (color) {
		return `--stripes-color: ${rgbaColor(color, 0.4)}`
	}
}
