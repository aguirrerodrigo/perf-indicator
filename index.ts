import * as express from "express";
const app = express();
app.route('/RestServices/WorkManagement/WorkOrders/:WorkOrderId/PerformanceIndicators')
    .get((req, res, next) => {
       res.send('Hello World!');
    });

app.listen(3000, () => console.log('Listening to port 3000...'));