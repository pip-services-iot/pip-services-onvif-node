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
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const OnvifController_1 = require("../../../src/logic/OnvifController");
const OnvifHttpServiceV1_1 = require("../../../src/services/version1/OnvifHttpServiceV1");
suite('OnvifHttpServiceV1', () => {
    let controller;
    let service;
    let client;
    let ONVIF_DEVICE_HOST = process.env["ONVIF_DEVICE_HOST"] || "192.168.86.134";
    let ONVIF_DEVICE_USER = process.env["ONVIF_DEVICE_USER"] || "admin";
    let ONVIF_DEVICE_PASS = process.env["ONVIF_DEVICE_PASS"] || "admin";
    let ONVIF_DEVICE_URL = process.env["ONVIF_DEVICE_URL"] || "http://" + ONVIF_DEVICE_HOST + "/onvif/device_service";
    if (ONVIF_DEVICE_HOST == "")
        return;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let httpConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('connection.protocol', 'http', 'connection.host', 'localhost', 'connection.port', 3000);
        controller = new OnvifController_1.OnvifController();
        service = new OnvifHttpServiceV1_1.OnvifHttpServiceV1();
        service.configure(httpConfig);
        client = new pip_services3_rpc_nodex_1.TestCommandableHttpClient("v1/onvif");
        client.configure(httpConfig);
        let references = pip_services3_commons_nodex_2.References.fromTuples(new pip_services3_commons_nodex_3.Descriptor('pip-services-onvif', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_nodex_3.Descriptor('pip-services-onvif', 'service', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        yield service.open(null);
        yield client.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close(null);
        yield service.close(null);
    }));
    test('Get Device Info', () => __awaiter(void 0, void 0, void 0, function* () {
        let info = yield yield client.callCommand("get_device_info", null, {
            device_url: ONVIF_DEVICE_URL,
            username: ONVIF_DEVICE_USER,
            password: ONVIF_DEVICE_PASS
        });
        assert.isObject(info);
        assert.isNotNull(info.id);
        assert.isNotNull(info.manufacturer);
        assert.isNotNull(info.model);
        assert.isNotNull(info.serial);
        let url = yield yield client.callCommand("get_udp_stream_url", null, {
            device_url: ONVIF_DEVICE_URL,
            username: ONVIF_DEVICE_USER,
            password: ONVIF_DEVICE_PASS
        });
        assert.isString(url);
        let encodedData = yield yield client.callCommand("fetch_snapshot", null, {
            device_url: ONVIF_DEVICE_URL,
            username: ONVIF_DEVICE_USER,
            password: ONVIF_DEVICE_PASS
        });
        assert.isString(encodedData);
        assert.isTrue(encodedData.length > 0);
    }));
});
//# sourceMappingURL=OnvifHttpServiceV1.test.js.map