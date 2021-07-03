import { IStringIdentifiable } from "pip-services3-commons-nodex";

export class OnvifDeviceInfoV1 {
    public id: string;
    public manufacturer: string;
    public model: string;
    public serial: string;
    public firmware: string;
}