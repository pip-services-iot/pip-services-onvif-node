/// <reference types="node" />
import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { OnvifDeviceV1 } from '../data/version1/OnvifDeviceV1';
import { OnvifDeviceInfoV1 } from '../data/version1/OnvifDeviceInfoV1';
import { IOnvifController } from './IOnvifController';
export declare class OnvifController implements IOnvifController, IConfigurable, IReferenceable, ICommandable {
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    private convertToOnvifDevice;
    discoverDevices(correlationId: string): Promise<OnvifDeviceV1[]>;
    getDeviceInfo(correlationId: string, deviceUrl: string, username: string, password: string): Promise<OnvifDeviceInfoV1>;
    getUdpStreamUrl(correlationId: string, deviceUrl: string, username: string, password: string): Promise<string>;
    fetchSnapshot(correlationId: string, deviceUrl: string, username: string, password: string): Promise<Buffer>;
}
