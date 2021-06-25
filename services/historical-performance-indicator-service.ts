import { Application } from "express";
import WorkOrderPerformanceIndicator from "../models/historical-performance-indicator";
import Service from "./service";

export default class HistoricalPerformanceIndicatorService implements Service
{
    private readonly _data: { [id: number]: WorkOrderPerformanceIndicator } = {
        // 1000: { assetPerformanceIndicator: {id: 1000}, id: 1000, readingDate: new Date(Date.UTC(2021, 1, 1)), value: 50, workOrder: 1000 }
    }

    constructor(public app: Application) {
    }

    start(): void {
        this.app.route('/RestServices/api/WorkManagement/WorkOrders/:WorkOrderId/HistoricalPerformanceIndicators')
            .get((req, res) => {
                const arr = this.getArray();
                const result = arr.filter(pi => pi.workOrder == Number(req.params.WorkOrderId));
                res.send({ data: result });
            })
            .post ((req, res) => {
                const keys = Object.keys(this._data)
                const id = Number(keys.length > 0 ? keys[keys.length - 1] : 1000) + 1;

                const data = req.body;
                const assetPerformanceIndicator = data.assetPerformanceIndicator || data.AssetPerformanceIndicator;
                const workOrder = data.workOrder || data.WorkOrder;

                if(!assetPerformanceIndicator && !(assetPerformanceIndicator.id || assetPerformanceIndicator.Id)) {
                    res.status(400).send('AssetPerformanceIndicator is required.');
                    return;
                } else if (!workOrder) {
                    res.status(400).send('WorkOrder is required.');
                }

                var pi: WorkOrderPerformanceIndicator = {
                    id: id,
                    assetPerformanceIndicator: assetPerformanceIndicator,
                    workOrder: workOrder,
                    value: data.value || data.Value,
                    readingDate: data.readingDate || data.ReadingDate
                };

                this._data[id] = pi;
                res.send({data: pi});
            });

        this.app.route('/RestServices/api/WorkManagement/WorkOrders/:WorkOrderId/HistoricalPerformanceIndicators/:Id')
            .put((req, res) => {
                const id = Number(req.params.Id);
                const pi = this._data[id];
        
                if(!pi) {
                    res.status(404).send('Could not find performance indicator.');
                }        
                else {
                    const update = req.body
                    if(update) {
                        const value = update.value || update.Value;
                        const readingDate = update.readingDate || update.ReadingDate;
        
                        if(value != null && !isNaN(value)) pi.value = Number(value);
                        if(readingDate != null) pi.readingDate = new Date(readingDate);
                    }
                    res.send({data: pi});
                }
            });
    }

    private getArray(): WorkOrderPerformanceIndicator[] {
        const result: WorkOrderPerformanceIndicator[] = [];
        Object.keys(this._data).map((index) => {
            result.push(this._data[index]);
        });

        return result;
    }
}