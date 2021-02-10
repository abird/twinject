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
	if (classesInstalled.has(cls)) {
		// already installed
		// console.log('Already installed:', cls)
		return;
	}

	installClass(cls)
	classesInstalled.add(cls)
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
		insertRule(rule)
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
	const ss = getStyleSheet()
	// console.log('Install rule:', rule)
	try {
		ss.insertRule(rule, ss.cssRules.length)
	}
	catch (err) {
		console.log("Error:", err, "inserting:", rule)
	}
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
				if (mutation.addedNodes) {
					mutation.addedNodes.forEach(node => {
						if (node.getAttribute) {
							const className = node.getAttribute('class')
							if (className) {
								// console.log('Add class', className)
								addClasses(className)
							}
						}
					})
				}
			});
		});
	}
	observer && observer.observe(document, { subtree: true, childList: true });
}

export function disableAutoInstall() {
	observer && observer.disconnect()
}

export function enableAutoInstall() {
	if (!observer) {
		observeClasses()
	}
	observer && observer.observe(document, { subtree: true, childList: true });
}

// start observing...
observeClasses()
