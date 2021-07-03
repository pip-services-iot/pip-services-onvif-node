"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvifLambdaServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
class OnvifLambdaServiceV1 extends pip_services3_aws_nodex_1.CommandableLambdaService {
    constructor() {
        super('v1.onvif');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-services-onvif', 'controller', 'default', '*', '1.0'));
    }
}
exports.OnvifLambdaServiceV1 = OnvifLambdaServiceV1;
//# sourceMappingURL=OnvifLambdaServiceV1.js.map