let OnvifProcess = require('../obj/src/containers/OnvifProcess').OnvifProcess;

try {
    new OnvifProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}