import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class OnvifHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/onvif');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-onvif', 'controller', 'default', '*', '1.0'));
    }
}