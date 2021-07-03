import { IStringIdentifiable } from "pip-services3-commons-nodex";
export declare class OnvifDeviceV1 implements IStringIdentifiable {
    id: string;
    ip_address?: string;
    name: string;
    model: string;
    location?: string;
    types?: string[];
    urls?: string[];
    scopes?: string[];
    profiles?: string[];
}
