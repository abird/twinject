import { hasItem } from './util'
import { classMap, screenSizes } from './config'

const isVariant = name => hasItem('hover|focus|active|group-hover|group-focus|focus-within|focus-visible|motion-safe|motion-reduce|disabled|visited|checked|first|last|odd|even', name)

export function getRule(cls) {
	const fixedClass = cls.replace(/\\/g, '')
	let [baseClass, class2] = fixedClass.split(' ')	// get first class
	baseClass = baseClass.split('::')[0]	// odd "placeholder" format
	const parts = baseClass.split(':');
	baseClass = parts.pop()
	if (isVariant(baseClass)) {
		baseClass = parts.pop()
	}
	let declarations = getDeclarations(baseClass)
	let initrule, initdecl, postclass, initgroup
	if (typeof declarations === 'object') {
		// include 'init'
		({ initrule, initgroup, declarations, postclass } = declarations)
	}
	let rule
	if (declarations) {
		let fullClass = cls;
		let part = parts.pop()
		// fix '/' for fractions and '.' for decimal numbers and ':' for breakpoints and initial digit
		fullClass = fullClass
			.replace(/\//g, '\\/')
			.replace(/\./g, '\\.')
			.replace(/:/g, '\\:')
			.replace(/^(\d)/, '\\3$1')
		let preclass = ''
		if (isVariant(part)) {
			if (part.startsWith('group')) {
				// group-hover or group-focus
				preclass = `.${part.replace('-', ':')} `
			} else {
				const map = { first: 'first-child', last: 'last-child', odd: 'nth-child(odd)', even: 'nth-child(2n)' }
				const child = map[part]
				if (child) {
					part = child
				}
				fullClass += ':' + part
			}
			part = parts.pop()
		}
		rule = `${preclass}.${fullClass}${postclass || ''} {${declarations}}`
		if (part && screenSizes[part]) {
			rule = `@media (min-width: ${screenSizes[part]}px) {${rule}}`
		}
	}
	return { rule, declarations, initrule, initgroup, postclass }
}

function getDeclarations(cls) {
	cls = cls.replace(/\\/g, '')	// remove any '\'

	const parts = cls.split('-');
	if (!parts[0]) {
		parts.shift()
	}
	let [type, value, ...rest] = parts
	const getValue = classMap[type]
	if (!getValue) {
		// console.log("Unknown class:", cls)
		return
	}

	const
		A = type,
		B = value,
		C = rest[0],
		D = rest[1],
		BC = C ? `${B}-${C}` : B,
		neg = cls.startsWith('-')
	let declarations = getValue({ cls, A, B, C, BC, D, neg });
	return declarations;
}
