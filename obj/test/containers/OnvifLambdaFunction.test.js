"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('chai').assert;
const process = require('process');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const OnvifLambdaFunction_1 = require("../../src/containers/OnvifLambdaFunction");
suite('OnvifLambdaFunction', () => {
    let lambda;
    let ONVIF_DEVICE_HOST = process.env["ONVIF_DEVICE_HOST"] || "192.168.86.134";
    let ONVIF_DEVICE_USER = process.env["ONVIF_DEVICE_USER"] || "admin";
    let ONVIF_DEVICE_PASS = process.env["ONVIF_DEVICE_PASS"] || "admin";
    let ONVIF_DEVICE_URL = process.env["ONVIF_DEVICE_URL"] || "http://" + ONVIF_DEVICE_HOST + "/onvif/device_service";
    if (ONVIF_DEVICE_HOST == "")
        return;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        lambda = new OnvifLambdaFunction_1.OnvifLambdaFunction();
        lambda.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples('logger.descriptor', 'pip-services:logger:console:default:1.0', 'controller.descriptor', 'pip-services-onvif:controller:default:default:1.0', 'service.descriptor', 'pip-services-onvif:service:lambda:default:1.0'));
        yield lambda.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield lambda.close(null);
    }));
    test('Get Device Info', () => __awaiter(void 0, void 0, void 0, function* () {
        let info = yield lambda.act({
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
        let url = yield lambda.act({
            cmd: 'v1.onvif.get_udp_stream_url',
            device_url: ONVIF_DEVICE_URL,
            username: ONVIF_DEVICE_USER,
            password: ONVIF_DEVICE_PASS
        });
        assert.isString(url);
        let encodedData = yield lambda.act({
            cmd: 'v1.onvif.fetch_snapshot',
            device_url: ONVIF_DEVICE_URL,
            username: ONVIF_DEVICE_USER,
            password: ONVIF_DEVICE_PASS
        });
        assert.isString(encodedData);
        assert.isTrue(encodedData.length > 0);
    }));
});
//# sourceMappingURL=OnvifLambdaFunction.test.js.map