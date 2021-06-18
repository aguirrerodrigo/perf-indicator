export default interface WorkOrderPerformanceIndicator {
    id?: number;
    code?: string;
    description?: string;
    value?: number;
    readDate?: Date;
    workOrder?: number;
}