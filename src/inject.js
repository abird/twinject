import { classMap } from './classmap.js'
import { hasItem } from './util.js'

const ssTitle = 'twinject'
const classesInstalled = new Set();
const initsInstalled = new Set();

export function addClasses(classProps) {
	for (const name of classProps.split(' ')) {
		if (name) {
			addClass(name);
		}
	}
}

export function addClass(cls) {
	// see if class is already installed
	if (classesInstalled.has(cls)) {
		// already installed
		// console.log('Already installed:', cls)
		return;
	}

	installClass(cls)
	classesInstalled.add(cls)
}

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
		// fix '/' for fractions and '.' for decimal numbers and ':' for breakpoints
		fullClass = fullClass.replace(/\//g, '\\/').replace(/\./g, '\\.').replace(/:/g, '\\:')
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
		if (part) {
			const map = {
				sm: '640',
				md: '768',
				lg: '1024',
				xl: '1280',
				'2xl': '1536',
				'32xl': '1536',
			}
			if (map[part]) {
				rule = `@media (min-width: ${map[part]}px) {${rule}}`
			}
		}
	}
	return { rule, declarations, initrule, initgroup, postclass }
}

function installClass(cls) {
	const { rule, initrule, initgroup, postclass } = getRule(cls)
	if (initrule) {
		// has an init for a group
		if (!initsInstalled.has(initgroup)) {
			insertRule(initrule)
			initsInstalled.add(initgroup)
		}
	}

	if (rule) {
		if (typeof window !== 'undefined') {
			insertRule(rule)
		}
	}
}


export function getDeclarations(cls) {
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

let styleSheet;
function getStyleSheet() {
	if (typeof window !== 'undefined') {
		if (!styleSheet) {
			// see if we've already installed a style sheet
			for (let ss of document.styleSheets) {
				if (ss.title === ssTitle) {
					// cache all selectors
					let rules = ss.rules || ss.cssRules;
					for (let rule in rules) {
						classesInstalled.add(rule.selectorText)
					}
					return ss;
				}
			}

			// create stylesheet from style element
			const style = document.createElement("style");
			// console.log("Adding stylesheet:", ssTitle)
			style.title = ssTitle
			// WebKit hack :(
			// console.log("WebKit hack")
			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);
			// console.log('style:', style, 'stylesheet:', style.sheet, 'stylesheets:', document.styleSheets.length, document.styleSheets)
			styleSheet = style.sheet;

			addBaseStyles()
		}
	}
	return styleSheet;
}

function insertRule(rule) {
	if (typeof window !== 'undefined') {
		const ss = getStyleSheet()
		console.log('Install rule:', rule)
		try {
			ss.insertRule(rule, ss.cssRules.length)
		}
		catch (err) {
			console.log("Error:", err, "inserting:", rule)
		}
	}
}

function addBaseStyles() {
	const preflight = [
		'blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}',
		'button{background-color:transparent;background-image:none}',
		'button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}',
		'fieldset{margin:0;padding:0}',
		'ol,ul{list-style:none;margin:0;padding:0}',
		'html{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height:1.5}',
		'body{font-family:inherit;line-height:inherit}',
		'*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e4e4e7 currentColor}',
		'hr{border-top-width:1px}',
		'img{border-style:solid}',
		'textarea{resize:vertical}',
		'input::placeholder,textarea::placeholder{opacity:1;color:#a1a1aa}',
		'[role=button],button{cursor:pointer}',
		'table{border-collapse:collapse}',
		'h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}',
		'a{color:inherit;text-decoration:inherit}',
		'button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}',
		'code,kbd,pre,samp{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace}',
		'audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}',
		'img,video{max-width:100%;height:auto}',
	]
	preflight.forEach(rule => insertRule(rule))
}

/* 
	Use MutationObserver to get notified when nodes are added to DOM
	Get classes and inject
*/

function observeClasses() {
	if (typeof window !== 'undefined') {
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.addedNodes) {
					mutation.addedNodes.forEach(node => {
						if (node.getAttribute) {
							const className = node.getAttribute('class')
							if (className) {
								console.log('Add class', className)
								addClasses(className)
							}
						}
					})
				}
			});
		});

		observer && observer.observe(document, { subtree: true, childList: true, attributes: true });
	}
}

// start observing...
observeClasses()
