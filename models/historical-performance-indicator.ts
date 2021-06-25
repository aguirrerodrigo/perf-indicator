import AssetPerformanceIndicator from "./asset-performance-indicator";

export default interface HistoricalPerformanceIndicator {
    id?: number;
    assetPerformanceIndicator?: AssetPerformanceIndicator;
    value?: number;
    readingDate?: Date;
    workOrder?: number;
}