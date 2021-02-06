import { addClasses, disableAutoInstall, enableAutoInstall } from './inject'
import { getRule } from './getrule'

const twinject = { addClasses, getRule, disableAutoInstall, enableAutoInstall }

if (typeof window !== 'undefined') {
	window.twinject = twinject
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = twinject;
}
