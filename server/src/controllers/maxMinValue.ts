import { Request, Response } from "express";

interface maxMinHolder {
    maxMid: number;
    minMid: number;
}

interface Rate {
    no: string;
    effectiveDate: string;
    mid: number;
}

export const maxMinValue = async (req: Request, res: Response) => {
    if (req.params.currency.length !== 3) return res.status(400).json({error: "Wrong currency code length"});
    if (Number(req.params.quotations) > 255) return res.status(400).json({error: "Exceeded quotations limit (255)"});
    try {
        const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${req.params.currency}/last/${req.params.quotations}`, {
            method: 'get',
            headers: {'Accept': 'application/json'}});
        const data = await response.json();
        const { maxMid, minMid } = data.rates.reduce((maxMinHolder: maxMinHolder, rate: Rate) => {
            const mid = rate.mid;
            return {
              maxMid: Math.max(maxMinHolder.maxMid, mid),
              minMid: Math.min(maxMinHolder.minMid, mid)
            };
            }, { maxMid: Number.NEGATIVE_INFINITY, minMid: Number.POSITIVE_INFINITY });
        return res.status(200).json({"max": maxMid, "min": minMid});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "An error occured while fetching data from API"})
    }
};