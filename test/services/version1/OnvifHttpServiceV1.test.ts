const assert = require('chai').assert;
const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { TestCommandableHttpClient } from 'pip-services3-rpc-nodex';

import { OnvifDeviceInfoV1 } from '../../../src/data/version1/OnvifDeviceInfoV1';
import { OnvifController } from '../../../src/logic/OnvifController';
import { OnvifHttpServiceV1 } from '../../../src/services/version1/OnvifHttpServiceV1';

suite('OnvifHttpServiceV1', () => {
    let controller: OnvifController;
    let service: OnvifHttpServiceV1;
    let client: TestCommandableHttpClient;

    let ONVIF_DEVICE_HOST = process.env["ONVIF_DEVICE_HOST"] || "192.168.86.134";
    let ONVIF_DEVICE_USER = process.env["ONVIF_DEVICE_USER"] || "admin";
    let ONVIF_DEVICE_PASS = process.env["ONVIF_DEVICE_PASS"] || "admin";
    let ONVIF_DEVICE_URL = process.env["ONVIF_DEVICE_URL"] || "http://" + ONVIF_DEVICE_HOST + "/onvif/device_service";

    if (ONVIF_DEVICE_HOST == "") return;    

    suiteSetup(async () => {
        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.host', 'localhost',
            'connection.port', 3000
        );

        controller = new OnvifController();

        service = new OnvifHttpServiceV1();
        service.configure(httpConfig);

        client = new TestCommandableHttpClient("v1/onvif");
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('pip-services-onvif', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-onvif', 'service', 'http', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
        await client.open(null);
    });

    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('Get Device Info', async () => {
        let info = await await client.callCommand<OnvifDeviceInfoV1>(
            "get_device_info",
            null, 
            {
                device_url: ONVIF_DEVICE_URL,
                username: ONVIF_DEVICE_USER,
                password: ONVIF_DEVICE_PASS    
            }
        );
        assert.isObject(info);
        assert.isNotNull(info.id);
        assert.isNotNull(info.manufacturer);
        assert.isNotNull(info.model);
        assert.isNotNull(info.serial);

        let url = await await client.callCommand<string>(
            "get_udp_stream_url",
            null, 
            {
                device_url: ONVIF_DEVICE_URL,
                username: ONVIF_DEVICE_USER,
                password: ONVIF_DEVICE_PASS    
            }
        );
        assert.isString(url);

        let encodedData = await await client.callCommand<string>(
            "fetch_snapshot",
            null, 
            {
                device_url: ONVIF_DEVICE_URL,
                username: ONVIF_DEVICE_USER,
                password: ONVIF_DEVICE_PASS    
            }
        );
        assert.isString(encodedData);
        assert.isTrue(encodedData.length > 0);
    });

});