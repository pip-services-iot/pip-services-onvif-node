import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaService } from 'pip-services3-aws-nodex';

export class OnvifLambdaServiceV1 extends CommandableLambdaService {
    public constructor() {
        super('v1.onvif');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-onvif', 'controller', 'default', '*', '1.0'));
    }
}