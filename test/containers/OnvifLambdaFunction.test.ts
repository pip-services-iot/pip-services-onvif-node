const assert = require('chai').assert;
const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { OnvifLambdaFunction } from '../../src/containers/OnvifLambdaFunction';

suite('OnvifLambdaFunction', () => {
    let lambda: OnvifLambdaFunction;

    let ONVIF_DEVICE_HOST = process.env["ONVIF_DEVICE_HOST"] || "192.168.86.134";
    let ONVIF_DEVICE_USER = process.env["ONVIF_DEVICE_USER"] || "admin";
    let ONVIF_DEVICE_PASS = process.env["ONVIF_DEVICE_PASS"] || "admin";
    let ONVIF_DEVICE_URL = process.env["ONVIF_DEVICE_URL"] || "http://" + ONVIF_DEVICE_HOST + "/onvif/device_service";

    if (ONVIF_DEVICE_HOST == "") return;    

    setup(async () => {
        lambda = new OnvifLambdaFunction();
        lambda.configure(ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'controller.descriptor', 'pip-services-onvif:controller:default:default:1.0',
            'service.descriptor', 'pip-services-onvif:service:lambda:default:1.0'
        ));

        await lambda.open(null);
    });

    teardown(async () => {
        await lambda.close(null);
    });

    test('Get Device Info', async () => {
        let info = await lambda.act({
            cmd: 'v1.onvif.get_device_info',
            device_url: ONVIF_DEVICE_URL,
            username: ONVIF_DEVICE_USER,
            password: ONVIF_DEVICE_PASS
        });
        assert.isObject(info);
        assert.isNotNull(info.id);
        assert.isNotNull(info.manufacturer);
        assert.isNotNull(info.model);
        assert.isNotNull(info.serial);

        let url = await lambda.act({
            cmd: 'v1.onvif.get_udp_stream_url',
            device_url: ONVIF_DEVICE_URL,
            username: ONVIF_DEVICE_USER,
            password: ONVIF_DEVICE_PASS
        });
        assert.isString(url);

        let encodedData = await lambda.act({
            cmd: 'v1.onvif.fetch_snapshot',
            device_url: ONVIF_DEVICE_URL,
            username: ONVIF_DEVICE_USER,
            password: ONVIF_DEVICE_PASS
        });
        assert.isString(encodedData);
        assert.isTrue(encodedData.length > 0);
    });
    
});