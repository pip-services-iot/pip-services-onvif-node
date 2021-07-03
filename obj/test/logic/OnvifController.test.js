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
const OnvifController_1 = require("../../src/logic/OnvifController");
suite('OnvifController', () => {
    let device;
    let controller;
    let ONVIF_DEVICE_HOST = process.env["ONVIF_DEVICE_HOST"] || "192.168.86.134";
    let ONVIF_DEVICE_USER = process.env["ONVIF_DEVICE_USER"] || "admin";
    let ONVIF_DEVICE_PASS = process.env["ONVIF_DEVICE_PASS"] || "admin";
    let ONVIF_DEVICE_URL = process.env["ONVIF_DEVICE_URL"] || "http://" + ONVIF_DEVICE_HOST + "/onvif/device_service";
    if (ONVIF_DEVICE_HOST == "")
        return;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let devices = yield new OnvifController_1.OnvifController().discoverDevices(null);
        device = devices[0];
    }));
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        controller = new OnvifController_1.OnvifController();
        let references = pip_services3_commons_nodex_1.References.fromTuples(new pip_services3_commons_nodex_2.Descriptor('pip-services-onvif', 'controller', 'default', 'default', '1.0'), controller);
        controller.setReferences(references);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
    }));
    test('Discover Devices', () => __awaiter(void 0, void 0, void 0, function* () {
        let devices = yield controller.discoverDevices(null);
        console.log(devices);
    }));
    test('Get Device Info', () => __awaiter(void 0, void 0, void 0, function* () {
        let info = yield controller.getDeviceInfo(null, ONVIF_DEVICE_URL, ONVIF_DEVICE_USER, ONVIF_DEVICE_PASS);
        assert.isObject(info);
        assert.isNotNull(info.id);
        assert.isNotNull(info.manufacturer);
        assert.isNotNull(info.model);
        assert.isNotNull(info.serial);
        let url = yield controller.getUdpStreamUrl(null, ONVIF_DEVICE_URL, ONVIF_DEVICE_USER, ONVIF_DEVICE_PASS);
        assert.isString(url);
        let data = yield controller.fetchSnapshot(null, ONVIF_DEVICE_URL, ONVIF_DEVICE_USER, ONVIF_DEVICE_PASS);
        assert.isNotNull(data);
        assert.isTrue(data.length > 0);
    }));
});
//# sourceMappingURL=OnvifController.test.js.map