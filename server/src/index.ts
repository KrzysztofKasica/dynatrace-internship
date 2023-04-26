import express from 'express';
import cors from "cors";
import { avgExchangeRate } from './controllers/avgExchangeRate';
import { maxMinValue } from './controllers/maxMinValue';
import { buyAskDiff } from './controllers/buyAskDiff';

const main = async() => {
    const app = express();

    app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
    app.get('/avg-exchange-rate/:currency/:date', avgExchangeRate);
    app.get('/max-min-value/:currency/:quotations', maxMinValue);
    app.get('/buy-ask-diff/:currency/:quotations', buyAskDiff);

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    })
}

main().catch((err) => {
    console.error(err);
});