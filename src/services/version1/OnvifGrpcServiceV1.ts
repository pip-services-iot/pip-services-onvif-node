import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class OnvifGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1.onvif');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-onvif', 'controller', 'default', '*', '1.0'));
    }
}