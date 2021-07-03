import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { OnvifController } from '../logic/OnvifController';
import { OnvifHttpServiceV1 } from '../services/version1/OnvifHttpServiceV1';
import { OnvifLambdaServiceV1 } from '../services/version1/OnvifLambdaServiceV1';
import { OnvifGrpcServiceV1 } from '../services/version1/OnvifGrpcServiceV1';

export class OnvifServiceFactory extends Factory {
    public static ControllerDescriptor = new Descriptor('pip-services-onvif', 'controller', 'default', '*', '1.0');
    public static HttpServiceDescriptor = new Descriptor('pip-services-onvif', 'service', 'http', '*', '1.0');
    public static LambdaServiceDescriptor = new Descriptor('pip-services-onvif', 'service', 'lambda', '*', '1.0');
    public static GrpcServiceDescriptor = new Descriptor('pip-services-onvif', 'service', 'grpc', '*', '1.0');

    constructor() {
        super();
        this.registerAsType(OnvifServiceFactory.ControllerDescriptor, OnvifController);
        this.registerAsType(OnvifServiceFactory.HttpServiceDescriptor, OnvifHttpServiceV1);
        this.registerAsType(OnvifServiceFactory.LambdaServiceDescriptor, OnvifLambdaServiceV1);
        this.registerAsType(OnvifServiceFactory.GrpcServiceDescriptor, OnvifGrpcServiceV1);
    }
}