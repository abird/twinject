import { addClasses, disableAutoInstall, enableAutoInstall, insertRule } from './inject.js'
import { getRule } from './getrule.js'

const twinject = { addClasses, getRule, disableAutoInstall, enableAutoInstall }

if (typeof window !== 'undefined') {
	window.twinject = twinject
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = twinject;
}
