import { CommandSet } from 'pip-services3-commons-nodex';
import { IOnvifController } from './IOnvifController';
export declare class OnvifCommandSet extends CommandSet {
    private _controller;
    constructor(controller: IOnvifController);
    private makeDiscoverDevicesCommand;
    private makeGetDeviceInfoCommand;
    private makeGetUdpStreamUrlCommand;
    private makeFetchSnapshotCommand;
}
