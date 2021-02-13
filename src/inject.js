import { getRule } from './getrule.js'
import { preflight } from './config.js'

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

function addClass(cls) {
	// see if class is already installed
	// console.log("Adding classes:", cls)
	if (classesInstalled.has(cls)) {
		// already installed
		// console.log('Already installed:', cls)
		return;
	}

	installClass(cls)
	classesInstalled.add(cls)
}


function installClass(cls) {
	const { rule, initrule, initgroup, variant, screenSize } = getRule(cls)
	if (initrule) {
		// has an init for a group
		if (!initsInstalled.has(initgroup)) {
			// console.log('Install init rule:', cls, rule)
			insertRule(initrule)
			initsInstalled.add(initgroup)
		}
	}

	if (rule) {
		// console.log('Install rule:', rule)
		insertRule(rule, screenSize, variant)
	}
}

let styleSheet;
function getStyleSheet() {
	if (!styleSheet) {
		// see if we've already installed a style sheet
		if (typeof window !== 'undefined') {
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
			style.title = ssTitle
			// WebKit hack :(
			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);
			styleSheet = style.sheet;

			addBaseStyles()
		}
	}
	return styleSheet;
}

export function insertRule(rule, screenSize, variant) {
	const ss = getStyleSheet()
	// console.log('Install rule:', rule)

	// prioritize screensize before variant before class, higher priority goes last in stylesheet
	const rules = ss.cssRules
	const count = rules.length
	let position = 0	// default to lowest priority
	if (screenSize) {
		// larger screen sizes are higher priority
		for (position = count; position; position--) {
			const rule = rules[position - 1]
			if (rule.media) {
				const match = rule.media.mediaText.match(/\d+/)
				if (match && screenSize >= +match[0]) {
					break
				}
			} else {
				break
			}
		}
	} else if (variant) {
		// variant goes past any screensizes
		for (position = count; position; position--) {
			if (!rules[position - 1].media) {
				break
			}
		}
	}

	try {
		ss.insertRule(rule, position)
	}
	catch (err) {
		if (!/moz/.test(rule)) {
			console.log(err, "inserting:", rule)
		}
	}
}

export const insertClass = (className, declarations) => {
	// replace @apply function
	function replaceApply(match, classes) {
		return classes.split(/\s+/).map(cls => {
			const { declarations, variant } = getRule(cls)
			if (variant) {
				// add class for variant
				insertRule(`.${className}:${variant}{${declarations}}`, null, variant)
				return null
			}
			return declarations + ';';
		}).filter(decl => decl).join(';')
	}

	// process any @apply directives
	declarations = declarations.replace(/@apply\s+(.*?)(;|$)/g, replaceApply)

	// console.log("Insert:", className, declarations)
	return insertRule(`.${className}{${declarations}}`);
}

function addBaseStyles() {
	preflight.forEach(rule => insertRule(rule))
}

/* 
	Use MutationObserver to get notified when nodes are added to DOM
	Get classes and inject
*/

let observer;

function observeClasses() {
	if (typeof window !== 'undefined') {
		observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.addedNodes.length) {
					mutation.addedNodes.forEach(node => {
						const processNode = node => {
							const className = node.getAttribute && node.getAttribute('class')
							if (className) {
								addClasses(className)
							}
							// process any children
							const children = node.children
							if (children) {
								for (let i = 0; i < children.length; i++) {
									processNode(children[i])
								}
							}
						}
						processNode(node)
					})
				}
				if (mutation.attributeName === 'class') {
					addClasses(mutation.target.className)
				}
			});
		});
	}
	observer && observer.observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
}

export function disableAutoInstall() {
	observer && observer.disconnect()
}

export function enableAutoInstall() {
	if (!observer) {
		observeClasses()
	}
}

// start observing...
enableAutoInstall()
