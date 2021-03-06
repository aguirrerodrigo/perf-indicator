import * as Express from "express";
import * as BodyParser from "body-parser";
import AssetPerformanceIndicatorService from "./services/asset-performance-indicator-service";
import HistoricalPerformanceIndicatorService from "./services/historical-performance-indicator-service";
import Service from "./services/service";

const app = Express();
app.use(BodyParser.json());

const services: Service[] = [
    new AssetPerformanceIndicatorService(app),
    new HistoricalPerformanceIndicatorService(app)
];

for(let i = 0; i < services.length; i++) {
    services[i].start();
}

app.listen(3000, () => console.log('Listening to port 3000...'));