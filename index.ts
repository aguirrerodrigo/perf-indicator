import * as Express from "express";
import * as BodyParser from "body-parser";

const app = Express();
app.use(BodyParser.json());

const data: { [id: number]: PerformanceIndicator } = {
    1: { id: 1, code: 'Perf-1', description: 'Perf-1 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 100 },
    2: { id: 2, code: 'Perf-2', description: 'Perf-2 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 101 },
    3: { id: 3, code: 'Perf-3', description: 'Perf-3 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 102 },
    4: { id: 4, code: 'Perf-4', description: 'Perf-4 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 103 },
    5: { id: 5, code: 'Perf-5', description: 'Perf-5 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 104 },
    6: { id: 6, code: 'Perf-6', description: 'Perf-6 DESC', readDate: new Date(Date.UTC(2021, 1, 1)), value: 105 }
}

const getArray = () => {
    const result: PerformanceIndicator[] = [];
    Object.keys(data).map((index) => {
        result.push(data[index]);
    })

    return result;
}

app.route('/RestServices/WorkManagement/WorkOrders/:WorkOrderId/PerformanceIndicators')
    .get((req, res) => {
       res.send(getArray());
    });

app.route('/RestServices/WorkManagement/WorkOrders/:WorkOrderId/PerformanceIndicators/:PerformanceIndicatorId')
    .put((req, res) => {
        const id = Number(req.params.PerformanceIndicatorId);
        const pi = data[id];

        if(!pi) {
            res.status(404).send('Could not find performance indicator.');
        }
        else {
            const update = req.body
            if(update) {
                if(update.value) pi.value = update.value;
                if(update.readDate) pi.readDate = update.readDate;
            }
            res.send(pi);
        }
    });

app.listen(3000, () => console.log('Listening to port 3000...'));