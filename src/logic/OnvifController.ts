const onvif = require('node-onvif');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';

import { OnvifDeviceV1 } from '../data/version1/OnvifDeviceV1';
import { OnvifDeviceInfoV1 } from '../data/version1/OnvifDeviceInfoV1';
import { IOnvifController } from './IOnvifController';
import { OnvifCommandSet } from './OnvifCommandSet';

export class OnvifController
    implements IOnvifController, IConfigurable, IReferenceable, ICommandable {
    private _commandSet: OnvifCommandSet;

    public configure(config: ConfigParams): void {
        // Todo:
    }

    public setReferences(references: IReferences): void {
        // Todo: 
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new OnvifCommandSet(this);
        }
        return this._commandSet;
    }

    private convertToOnvifDevice(device: any): OnvifDeviceV1 {
        if (device == null) return null;

        let result: OnvifDeviceV1 = {
            id: device.urn,
            ip_address: null,
            name: device.name,
            model: device.hardware,
            location: device.location,
            types: device.types || [],
            urls: device.xaddrs || [],
            scopes: device.scopes || [],
            profiles: null
        };

        if (result.urls.length > 0) {
            let url = new URL(result.urls[0]);
            result.ip_address = url.host;
        }

        let profiles = result.scopes.filter(s => s.indexOf("/Profile/") > 0);
        result.profiles = profiles.map((p) => { let pos = p.indexOf("/Profile/"); return p.substring(pos + 9); });

        return result;
    }

    public async discoverDevices(correlationId: string): Promise<OnvifDeviceV1[]> {
        let devices: any[] = await onvif.startProbe();
        devices = devices || [];
        let onvifDevices = devices.map(this.convertToOnvifDevice);
        return onvifDevices;
    }

    public async getDeviceInfo(correlationId: string, deviceUrl: string, username: string, password: string): Promise<OnvifDeviceInfoV1> {
        let device = new onvif.OnvifDevice({
            xaddr: deviceUrl,
            user : username,
            pass : password
        });
          
        // Initialize the OnvifDevice object
        let info = await device.init();

        if (info == null) return null;
          
        let result: OnvifDeviceInfoV1 = {
            id: info.HardwareId,
            manufacturer: info.Manufacturer,
            model: info.Model,
            firmware: info.FirmwareVersion,
            serial: info.SerialNumber
        };
        return result;
    }

    public async getUdpStreamUrl(correlationId: string, deviceUrl: string, username: string, password: string): Promise<string> {
        let device = new onvif.OnvifDevice({
            xaddr: deviceUrl,
            user : username,
            pass : password
        });
          
        // Initialize the OnvifDevice object
        let info = await device.init();

        if (info == null) return null;
          
        // Get the UDP stream URL
        let url = device.getUdpStreamUrl();
        return url;
    }

    public async fetchSnapshot(correlationId: string, deviceUrl: string, username: string, password: string): Promise<Buffer> {
        let device = new onvif.OnvifDevice({
            xaddr: deviceUrl,
            user : username,
            pass : password
        });
          
        // Initialize the OnvifDevice object
        let info = await device.init();

        if (info == null) return null;
          
        // Get the UDP stream URL
        let res = await device.fetchSnapshot();
        if (res == null) return null;
        return res.body;
    }

}