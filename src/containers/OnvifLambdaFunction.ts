import { LambdaFunction } from 'pip-services3-aws-nodex';

import { OnvifServiceFactory } from '../build/OnvifServiceFactory';

export class OnvifLambdaFunction extends LambdaFunction {
    public constructor() {
        super('onvif', 'Onvif function');
        this._factories.add(new OnvifServiceFactory());
    }
}

export const handler = new OnvifLambdaFunction().getHandler();