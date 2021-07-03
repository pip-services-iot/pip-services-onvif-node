import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { OnvifDeviceV1 } from '../data/version1/OnvifDeviceV1';
import { OnvifDeviceInfoV1 } from '../data/version1/OnvifDeviceInfoV1';

export interface IOnvifController {
    discoverDevices(correlationId: string): Promise<OnvifDeviceV1[]>;
    getDeviceInfo(correlationId: string, deviceUrl: string, username: string, password: string): Promise<OnvifDeviceInfoV1>;
    getUdpStreamUrl(correlationId: string, deviceUrl: string, username: string, password: string): Promise<string>;
    fetchSnapshot(correlationId: string, deviceUrl: string, username: string, password: string): Promise<Buffer>;
}