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
exports.OnvifCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
class OnvifCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(controller) {
        super();
        this._controller = controller;
        this.addCommand(this.makeDiscoverDevicesCommand());
        this.addCommand(this.makeGetDeviceInfoCommand());
        this.addCommand(this.makeGetUdpStreamUrlCommand());
        this.addCommand(this.makeFetchSnapshotCommand());
    }
    makeDiscoverDevicesCommand() {
        return new pip_services3_commons_nodex_2.Command('discover_devices', new pip_services3_commons_nodex_3.ObjectSchema(true), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            return yield this._controller.discoverDevices(correlationId);
        }));
    }
    makeGetDeviceInfoCommand() {
        return new pip_services3_commons_nodex_2.Command('get_device_info', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('device_url', pip_services3_commons_nodex_4.TypeCode.String)
            .withOptionalProperty('username', pip_services3_commons_nodex_4.TypeCode.String)
            .withOptionalProperty('password', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let deviceUrl = args.getAsString('device_url');
            let username = args.getAsString('username');
            let password = args.getAsString('password');
            return yield this._controller.getDeviceInfo(correlationId, deviceUrl, username, password);
        }));
    }
    makeGetUdpStreamUrlCommand() {
        return new pip_services3_commons_nodex_2.Command('get_udp_stream_url', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('device_url', pip_services3_commons_nodex_4.TypeCode.String)
            .withOptionalProperty('username', pip_services3_commons_nodex_4.TypeCode.String)
            .withOptionalProperty('password', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let deviceUrl = args.getAsString('device_url');
            let username = args.getAsString('username');
            let password = args.getAsString('password');
            return yield this._controller.getUdpStreamUrl(correlationId, deviceUrl, username, password);
        }));
    }
    makeFetchSnapshotCommand() {
        return new pip_services3_commons_nodex_2.Command('fetch_snapshot', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('device_url', pip_services3_commons_nodex_4.TypeCode.String)
            .withOptionalProperty('username', pip_services3_commons_nodex_4.TypeCode.String)
            .withOptionalProperty('password', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let deviceUrl = args.getAsString('device_url');
            let username = args.getAsString('username');
            let password = args.getAsString('password');
            let data = yield this._controller.fetchSnapshot(correlationId, deviceUrl, username, password);
            if (data == null)
                return null;
            let encodedData = data.toString("base64");
            return encodedData;
        }));
    }
}
exports.OnvifCommandSet = OnvifCommandSet;
//# sourceMappingURL=OnvifCommandSet.js.map