import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

import { IOnvifController } from './IOnvifController';

export class OnvifCommandSet extends CommandSet {
    private _controller: IOnvifController;

    constructor(controller: IOnvifController) {
        super();

        this._controller = controller;

        this.addCommand(this.makeDiscoverDevicesCommand());
        this.addCommand(this.makeGetDeviceInfoCommand());
        this.addCommand(this.makeGetUdpStreamUrlCommand());
        this.addCommand(this.makeFetchSnapshotCommand());
    }

    private makeDiscoverDevicesCommand(): ICommand {
        return new Command(
            'discover_devices',
            new ObjectSchema(true),
            async (correlationId: string, args: Parameters) => {
                return await this._controller.discoverDevices(correlationId);
            }
        );
    }

    private makeGetDeviceInfoCommand(): ICommand {
        return new Command(
            'get_device_info',
            new ObjectSchema(true)
                .withRequiredProperty('device_url', TypeCode.String)
                .withOptionalProperty('username', TypeCode.String)
                .withOptionalProperty('password', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let deviceUrl = args.getAsString('device_url');
                let username = args.getAsString('username');
                let password = args.getAsString('password');
                return await this._controller.getDeviceInfo(correlationId, deviceUrl, username, password);
            }
        );
    }

    private makeGetUdpStreamUrlCommand(): ICommand {
        return new Command(
            'get_udp_stream_url',
            new ObjectSchema(true)
                .withRequiredProperty('device_url', TypeCode.String)
                .withOptionalProperty('username', TypeCode.String)
                .withOptionalProperty('password', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let deviceUrl = args.getAsString('device_url');
                let username = args.getAsString('username');
                let password = args.getAsString('password');
                return await this._controller.getUdpStreamUrl(correlationId, deviceUrl, username, password);
            }
        );
    }

    private makeFetchSnapshotCommand(): ICommand {
        return new Command(
            'fetch_snapshot',
            new ObjectSchema(true)
                .withRequiredProperty('device_url', TypeCode.String)
                .withOptionalProperty('username', TypeCode.String)
                .withOptionalProperty('password', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let deviceUrl = args.getAsString('device_url');
                let username = args.getAsString('username');
                let password = args.getAsString('password');

                let data = await this._controller.fetchSnapshot(correlationId, deviceUrl, username, password);
                if (data == null) return null;

                let encodedData = data.toString("base64");
                return encodedData;
            }
        );
    }
    
}