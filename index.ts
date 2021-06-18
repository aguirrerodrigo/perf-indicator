import * as Express from "express";
import * as BodyParser from "body-parser";
import { WorkOrderPerformanceIndicatorService } from "./services/work-order-performance-indicator-service";
import { Service } from "./services/service";

const app = Express();
app.use(BodyParser.json());

const services: Service[] = [
    new WorkOrderPerformanceIndicatorService(app)
];

for(let i = 0; i < services.length; i++) {
    services[i].start();
}

app.listen(3000, () => console.log('Listening to port 3000...'));