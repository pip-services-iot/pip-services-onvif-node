"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.OnvifLambdaFunction = void 0;
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const OnvifServiceFactory_1 = require("../build/OnvifServiceFactory");
class OnvifLambdaFunction extends pip_services3_aws_nodex_1.LambdaFunction {
    constructor() {
        super('onvif', 'Onvif function');
        this._factories.add(new OnvifServiceFactory_1.OnvifServiceFactory());
    }
}
exports.OnvifLambdaFunction = OnvifLambdaFunction;
exports.handler = new OnvifLambdaFunction().getHandler();
//# sourceMappingURL=OnvifLambdaFunction.js.map