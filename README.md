# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Onvif connectivity microservice

This microservice allows to collect basic information from ONVIF-compatible devices.

Supported functionality:
* Deployment platforms: Standalone Process, Docker, AWS Lambda
* External APIs: HTTP (Commandable), GRPC (Commandable)
* Health checks: Heartbeat, Status
* Consolidated logging: ElasticSearch, CloudWatch
* Consolidated metrics: Prometheus, CloudWatch

There are no dependencies on other microservices.

<a name="links"></a> Quick links:

* Client SDKs:
  - [Node.js SDK](https://github.com/pip-services-iot/pip-clients-onvif-node)
  - [Golang SDK](https://github.com/pip-services-iot/pip-clients-onvif-go)
* [API Reference](https://github.com/pip-services-iot/pip-services-onvif-node/pages/globals.html)
* [Change Log](CHANGELOG.md)

##  Contract

```typescript

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

export class OnvifDeviceInfoV1 {
    public id: string;
    public manufacturer: string;
    public model: string;
    public serial: string;
    public firmware: string;
}

interface IOnvifController {
    discoverDevices(correlationId: string): Promise<OnvifDeviceV1[]>;

    getDeviceInfo(correlationId: string, deviceUrl: string,
        username: string, password: string): Promise<OnvifDeviceInfoV1>;

    getUdpStreamUrl(correlationId: string, deviceUrl: string,
        username: string, password: string): Promise<string>;

    fetchSnapshot(correlationId: string, deviceUrl: string,
        username: string, password: string): Promise<Buffer>;
}

```

## Get

Get the microservice source from GitHub:
```bash
git clone git@github.com:pip-services-iot/pip-services-onvif-node.git
```

Install the microservice as a binary dependency:
```bash
npm install pip-services-onvif-node
```

Get docker image for the microservice:
```bash
docker pull pipdevs/pip-services-onvif-node:latest
```

## Run

The microservice can be configured using the environment variables:
* HTTP_ENABLED - turn on HTTP endpoint
* HTTP_PORT - HTTP port number (default: 8080)
* GRPC_ENABLED - turn on GRPC endpoint
* GRPC_PORT - GRPC port number (default: 8090)

Start the microservice as process:
```bash
node ./bin/main
```

Run the microservice in docker:
Then use the following command:
```bash
docker run pipdevs/pip-services-onvif-node:latest
```

Launch the microservice with all infrastructure services using docker-compose:
```bash
docker-compose -f ./docker/docker-compose.yml
```

## Use

Install the client NPM package as
```bash
npm install @NationalOilwellVarco/max-templates/client-idgenerator-node
```

Inside your code get the reference to the client SDK
```typescript
 import { OnvifHttpClientV1 } from 'pip-clients-devices-node';
```

Instantiate the client
```typescript
// Create the client instance
let client = new OnvifHttpClientV1();
```

Define client configuration parameters.
```typescript
// Client configuration
let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);
client.configure(httpConfig);
```

Connect to the microservice
```typescript
// Connect to the microservice
await client.open(null);
```

Discover ONVIF devices on the local network
```typescript 
let devices = await client.discoverDevices("123");
console.log(devices);
```

Get device hardware information
```typescript 
let deviceInfo = await client.getDeviceInfo(
    "http://192.168.1.1/onvif/device_service",
    "admin",
    "admin:
);
console.log(deviceInfo);
```

Fetch snapshot image from the device in JPEG format
```typescript 
let snapshot = await client.fetchSnapshot(
    "http://192.168.1.1/onvif/device_service",
    "admin",
    "admin:
);
fs.writeFileSync('snapshot.jpg', snapshot, {encoding: 'binary'});
```

## Develop

For development you shall install the following prerequisites:
* Node.js
* Visual Studio Code or another IDE of your choice
* Docker
* Typescript

Install dependencies:
```bash
npm install
```

Compile the microservice:
```bash
tsc
```

Before running tests launch infrastructure services and required microservices:
```bash
docker-compose -f ./docker-compose.dev.yml
```

Run automated tests:
```bash
npm test
```

Run automated benchmarks:
```bash
npm run benchmark
```

Generate API documentation:
```bash
./docgen.ps1
```

Before committing changes run dockerized build and test as:
```bash
./build.ps1
./test.ps1
./package.ps1
./run.ps1
./clean.ps1
```

## Contacts

This microservice was created and currently maintained by *Sergey Seroukhov*.