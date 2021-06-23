import { Application } from "express";
import WorkOrderPerformanceIndicator from "../models/work-order-performance-indicator";
import Service from "./service";

export default class WorkOrderPerformanceIndicatorService implements Service
{
    private readonly _data: { [id: number]: WorkOrderPerformanceIndicator } = {
        // 1001: { id: 1001, code: 'Perf-1', description: 'Perf-1 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: null, workOrder: 1111 },
        // 1002: { id: 1002, code: 'Perf-2', description: 'Perf-2 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: null, workOrder: 1111 },
        // 1003: { id: 1003, code: 'Perf-3', description: 'Perf-3 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 102, workOrder: 1111 },
        // 1004: { id: 1004, code: 'Perf-4', description: 'Perf-4 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 103, workOrder: 1111 },
        // 1005: { id: 1005, code: 'Perf-5', description: 'Perf-5 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 104, workOrder: 1111 },
        // 1006: { id: 1006, code: 'Perf-6', description: 'Perf-6 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 105, workOrder: 1111 }
    }

    constructor(public app: Application) {
    }

    start(): void {
        this.app.route('/RestServices/api/WorkManagement/WorkOrders/:WorkOrderId/PerformanceIndicators')
            .get((req, res) => {
                const arr = this.getArray();
                const result = arr.filter(pi => pi.workOrder == Number(req.params.WorkOrderId));
                res.send({ data: result });
            });

        this.app.route('/RestServices/api/WorkManagement/WorkOrders/:WorkOrderId/PerformanceIndicators/:PerformanceIndicatorId?')
            .post((req, res) => {
                const keys = Object.keys(this._data)
                const id = Number(keys.length > 0 ? keys[keys.length - 1] : 1000) + 1;

                const data = req.body;
                const code = data.code || data.Code;
                const workOrder = data.workOrder || data.WorkOrder;

                if(!code) {
                    res.status(400).send('Code is required.');
                    return;
                } else if (!workOrder) {
                    res.status(400).send('WorkOrder is required.');
                }

                var pi: WorkOrderPerformanceIndicator = {
                    id: id,
                    code: code,
                    workOrder: workOrder,
                    value: data.value || data.Value,
                    readDate: data.readDate || data.ReadDate
                };

                this._data[id] = pi;
                res.send({data: pi});
            })
            .put((req, res) => {
                const id = Number(req.params["PerformanceIndicatorId"]);
                const pi = this._data[id];
        
                if(!pi) {
                    res.status(404).send('Could not find performance indicator.');
                }        
                else {
                    const update = req.body
                    if(update) {
                        const value = update.value || update.Value;
                        const readDate = update.readDate || update.ReadDate;
        
                        if(value != null && !isNaN(value)) pi.value = Number(value);
                        if(readDate != null) pi.readDate = new Date(readDate);
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