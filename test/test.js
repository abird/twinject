import { getRule } from '../src/getrule'
import fs from 'fs'
import readline from 'readline'

const twPath = 'node_modules/tailwindcss/dist/utilities.css'

let goodCount = 0;
let badCount = 0;
let implementedCount = 0;
let notImplementedCount = 0;

function testClass(className, declarations) {
	let { declarations: genDecl, initrule } = getRule(className)
	if (genDecl) {
		let initdecl
		if (initrule) {
			const match = initrule.match(/.*?\{(.+)\}/)
			if (match) {
				initdecl = match[1]
			}
		}
		if (genDecl === declarations || initdecl === declarations) {
			// console.log(`GOOD: ${className} => ${genDecl}`)
			goodCount++;
		} else {
			console.log(`xxx ${className} => ${genDecl} (${declarations})`)
			badCount++
		}
		implementedCount++
	} else {
		// not implemented yet
		console.log(`--- ${className} => ${declarations}`)
		notImplementedCount++
	}

}

async function runTests() {
	// run tests
	console.log("Testing all Tailwind classes from", twPath)

	const fileStream = fs.createReadStream(twPath);

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	let selector
	let declarations;
	let level
	for await (const line of rl) {
		if (selector) {
			if (line.match(/}/)) {
				if (--level > 0) {
					declarations += (declarations.length ? ' ' : '') + line.trim();
					continue	// nested {}
				}
				// got selector and declarations, run test
				if (selector === '*') {
					// these are handled at init time, so ignore during tests
					if (declarations === '--tw-shadow: 0 0 #0000' || declarations === '--tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000') {
						selector = null;
						declarations = null;
						continue;
					}
				} else if (selector.startsWith('@keyframes') || selector.startsWith('group:hover')) {
					// ignore keyframes and group:hover
					selector = null;
					declarations = null;
					continue
				}

				// Some colors are mapped to others in utilities.css file
				selector = selector.replace('yellow', 'amber').replace('green', 'emerald').replace('purple', 'violet')

				if (/,/.test(selector)) {
					// multiple classes
					for (let className of selector.split(/,\s+/)) {
						className = className.replace(/^\./, '')
						testClass(className, declarations)
					}
				} else {
					testClass(selector, declarations)
				}

				// console.log(`${selector} => ${declarations}`)
				selector = null;
				declarations = null;
			} else {
				declarations += (declarations.length ? ' ' : '') + line.trim();
				if (line.match(/{/)) {
					level++
				}
			}
		} else {
			const match = line.match(/^\s*\.?(.*)\s+{/)
			if (match) {
				if (!match[1].startsWith('@media')) {
					selector = match[1];
					declarations = '';
					level = 1
				}
			} else if (line.match(/{/)) {
				console.log('line:', line)
			}
		}
	}
	console.log(`Implemented: ${implementedCount}`)
	console.log(`Not implemented: ${notImplementedCount}`)
	console.log(`Good: ${goodCount}`)
	console.log(`Bad: ${badCount}`)
}

runTests()
