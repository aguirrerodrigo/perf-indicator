import { Application } from "express";
import AssetPerformanceIndicator from "../models/asset-performance-indicator";
import Service from "./service";

export default class AssetPerformanceIndicatorService implements Service
{
    private readonly _data: AssetPerformanceIndicator[] = [
        { id: 1000,  activity: 1010, asset: 1002, code: 'Perf-1', createWorkOrder: 'Always', highestValue: 100, lowestValue: 0 },
        { id: 1001,  activity: 1011, asset: 1002, code: 'Perf-2', createWorkOrder: 'Always', highestValue: 1000, lowestValue: 500, standardWorkOrder: 1000, unitOfMeasure: 'UOM-1' },
        { id: 1002,  asset: 1002, code: 'Perf-3', createWorkOrder: 'UponConfirmation', highestValue: 10, lowestValue: 1, unitOfMeasure: 'UOM-1' },
        { id: 1003,  asset: 1002, code: 'Perf-4', createWorkOrder: 'Never', highestValue: 9, lowestValue: 0, unitOfMeasure: 'UOM-1' },
        { id: 1004,  activity: 1010, asset: 1001, code: 'Perf-1', createWorkOrder: 'Always', highestValue: 100, lowestValue: 0 },
        { id: 1005,  activity: 1011, asset: 1001, code: 'Perf-2', createWorkOrder: 'Always', highestValue: 1000, lowestValue: 500, standardWorkOrder: 1000, unitOfMeasure: 'UOM-1' },
    ]

    constructor(public app: Application) {
    }

    start(): void {
        this.app.route('/RestServices/api/AssetManagement/Assets/:AssetId/AssetPerformanceIndicators')
            .get((req, res) => {
                const result = this._data.filter(pi => pi.asset == Number(req.params.AssetId));
                res.send({ data: result });
            });

        this.app.route('/RestServices/api/AssetManagement/AssetPerformanceIndicators')
            .get((req, res) => {
                res.send({ data: this._data });
            });
    }
}