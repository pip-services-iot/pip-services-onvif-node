const assert = require('chai').assert;
const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { OnvifDeviceV1 } from '../../src/data/version1/OnvifDeviceV1';
import { OnvifController } from '../../src/logic/OnvifController';

suite('OnvifController', () => {
    let device: OnvifDeviceV1;
    let controller: OnvifController;

    let ONVIF_DEVICE_HOST = process.env["ONVIF_DEVICE_HOST"] || "192.168.86.134";
    let ONVIF_DEVICE_USER = process.env["ONVIF_DEVICE_USER"] || "admin";
    let ONVIF_DEVICE_PASS = process.env["ONVIF_DEVICE_PASS"] || "admin";
    let ONVIF_DEVICE_URL = process.env["ONVIF_DEVICE_URL"] || "http://" + ONVIF_DEVICE_HOST + "/onvif/device_service";

    if (ONVIF_DEVICE_HOST == "") return;    

    suiteSetup(async () => {
        let devices = await new OnvifController().discoverDevices(null);
        device = devices[0];
    });

    setup(async () => {
        controller = new OnvifController();

        let references = References.fromTuples(
            new Descriptor('pip-services-onvif', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);
    });

    teardown(async () => {
    });

    test('Discover Devices', async () => {
        let devices = await controller.discoverDevices(null);
        console.log(devices);
    });

    test('Get Device Info', async () => {
        let info = await controller.getDeviceInfo(null, ONVIF_DEVICE_URL, ONVIF_DEVICE_USER, ONVIF_DEVICE_PASS);
        assert.isObject(info);
        assert.isNotNull(info.id);
        assert.isNotNull(info.manufacturer);
        assert.isNotNull(info.model);
        assert.isNotNull(info.serial);

        let url = await controller.getUdpStreamUrl(null, ONVIF_DEVICE_URL, ONVIF_DEVICE_USER, ONVIF_DEVICE_PASS);
        assert.isString(url);

        let data = await controller.fetchSnapshot(null, ONVIF_DEVICE_URL, ONVIF_DEVICE_USER, ONVIF_DEVICE_PASS);
        assert.isNotNull(data);
        assert.isTrue(data.length > 0);
    });

});