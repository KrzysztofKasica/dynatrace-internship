import { Request, Response } from "express";

interface Rate {
    bid: number;
    ask: number
}

export const buyAskDiff = async (req: Request, res: Response) => {  
    if (req.params.currency.length !== 3) return res.status(400).json({error: "Wrong currency code length"});
    if (Number(req.params.quotations) > 255) return res.status(400).json({error: "Exceeded quotations limit (255)"});
    try {
        const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/c/${req.params.currency}/last/${req.params.quotations}`, {
            method: 'get',
            headers: {'Accept': 'application/json'}});
        const data = await response.json();
        const majorDiff = data.rates.reduce((majorDiff: number, rate: Rate) => {
            const diff = rate.ask - rate.bid;
            return diff > majorDiff ? diff : majorDiff;
          }, 0);
        return res.status(200).json({"majorDiff": majorDiff.toFixed(4)});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "An error occured while fetching data from API"})
    }
};