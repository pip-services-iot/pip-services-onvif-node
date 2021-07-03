"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvifGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class OnvifGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1.onvif');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-services-onvif', 'controller', 'default', '*', '1.0'));
    }
}
exports.OnvifGrpcServiceV1 = OnvifGrpcServiceV1;
//# sourceMappingURL=OnvifGrpcServiceV1.js.map