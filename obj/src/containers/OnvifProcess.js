"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvifProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const OnvifServiceFactory_1 = require("../build/OnvifServiceFactory");
class OnvifProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super('onvif', 'Onvif microservice');
        this._factories.add(new OnvifServiceFactory_1.OnvifServiceFactory());
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
    }
}
exports.OnvifProcess = OnvifProcess;
//# sourceMappingURL=OnvifProcess.js.map