import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
export declare class OnvifServiceFactory extends Factory {
    static ControllerDescriptor: Descriptor;
    static HttpServiceDescriptor: Descriptor;
    static LambdaServiceDescriptor: Descriptor;
    static GrpcServiceDescriptor: Descriptor;
    constructor();
}
