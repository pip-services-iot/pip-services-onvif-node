"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvifServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const OnvifController_1 = require("../logic/OnvifController");
const OnvifHttpServiceV1_1 = require("../services/version1/OnvifHttpServiceV1");
const OnvifLambdaServiceV1_1 = require("../services/version1/OnvifLambdaServiceV1");
const OnvifGrpcServiceV1_1 = require("../services/version1/OnvifGrpcServiceV1");
class OnvifServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(OnvifServiceFactory.ControllerDescriptor, OnvifController_1.OnvifController);
        this.registerAsType(OnvifServiceFactory.HttpServiceDescriptor, OnvifHttpServiceV1_1.OnvifHttpServiceV1);
        this.registerAsType(OnvifServiceFactory.LambdaServiceDescriptor, OnvifLambdaServiceV1_1.OnvifLambdaServiceV1);
        this.registerAsType(OnvifServiceFactory.GrpcServiceDescriptor, OnvifGrpcServiceV1_1.OnvifGrpcServiceV1);
    }
}
exports.OnvifServiceFactory = OnvifServiceFactory;
OnvifServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-onvif', 'controller', 'default', '*', '1.0');
OnvifServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-onvif', 'service', 'http', '*', '1.0');
OnvifServiceFactory.LambdaServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-onvif', 'service', 'lambda', '*', '1.0');
OnvifServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-onvif', 'service', 'grpc', '*', '1.0');
//# sourceMappingURL=OnvifServiceFactory.js.map