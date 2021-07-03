"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvifHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class OnvifHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/onvif');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-services-onvif', 'controller', 'default', '*', '1.0'));
    }
}
exports.OnvifHttpServiceV1 = OnvifHttpServiceV1;
//# sourceMappingURL=OnvifHttpServiceV1.js.map