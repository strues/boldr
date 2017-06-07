import config from '../.boldr/config'
import Compiler from '../../bin/compile'

;(async function () {
    await new Compiler.compile(config)
})()
