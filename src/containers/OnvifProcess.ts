import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';

import { OnvifServiceFactory } from '../build/OnvifServiceFactory';

export class OnvifProcess extends ProcessContainer {
    public constructor() {
        super('onvif', 'Onvif microservice');
        this._factories.add(new OnvifServiceFactory());
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
        this._factories.add(new DefaultGrpcFactory);
    }
}