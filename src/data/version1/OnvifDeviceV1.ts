import { IStringIdentifiable } from "pip-services3-commons-nodex";

export class OnvifDeviceV1 implements IStringIdentifiable {
    public id: string;
    public ip_address?: string;
    public name: string;
    public model: string;
    public location?: string;
    public types?: string[];
    public urls?: string[];
    public scopes?: string[];
    public profiles?: string[];
}