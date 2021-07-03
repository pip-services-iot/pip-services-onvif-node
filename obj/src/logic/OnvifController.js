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
exports.OnvifController = void 0;
const onvif = require('node-onvif');
const OnvifCommandSet_1 = require("./OnvifCommandSet");
class OnvifController {
    configure(config) {
        // Todo:
    }
    setReferences(references) {
        // Todo: 
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new OnvifCommandSet_1.OnvifCommandSet(this);
        }
        return this._commandSet;
    }
    convertToOnvifDevice(device) {
        if (device == null)
            return null;
        let result = {
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
    discoverDevices(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let devices = yield onvif.startProbe();
            devices = devices || [];
            let onvifDevices = devices.map(this.convertToOnvifDevice);
            return onvifDevices;
        });
    }
    getDeviceInfo(correlationId, deviceUrl, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = new onvif.OnvifDevice({
                xaddr: deviceUrl,
                user: username,
                pass: password
            });
            // Initialize the OnvifDevice object
            let info = yield device.init();
            if (info == null)
                return null;
            let result = {
                id: info.HardwareId,
                manufacturer: info.Manufacturer,
                model: info.Model,
                firmware: info.FirmwareVersion,
                serial: info.SerialNumber
            };
            return result;
        });
    }
    getUdpStreamUrl(correlationId, deviceUrl, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = new onvif.OnvifDevice({
                xaddr: deviceUrl,
                user: username,
                pass: password
            });
            // Initialize the OnvifDevice object
            let info = yield device.init();
            if (info == null)
                return null;
            // Get the UDP stream URL
            let url = device.getUdpStreamUrl();
            return url;
        });
    }
    fetchSnapshot(correlationId, deviceUrl, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = new onvif.OnvifDevice({
                xaddr: deviceUrl,
                user: username,
                pass: password
            });
            // Initialize the OnvifDevice object
            let info = yield device.init();
            if (info == null)
                return null;
            // Get the UDP stream URL
            let res = yield device.fetchSnapshot();
            if (res == null)
                return null;
            return res.body;
        });
    }
}
exports.OnvifController = OnvifController;
//# sourceMappingURL=OnvifController.js.map