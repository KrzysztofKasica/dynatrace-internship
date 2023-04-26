import { Request, Response } from "express";

export const avgExchangeRate = async (req: Request, res: Response) => {
    const date = new Date(req.params.date);
    const minDate = new Date("2002-01-02");
    
    if (date < minDate) return res.status(400).json({error: "Invalid date"});
    if (req.params.currency.length !== 3) return res.status(400).json({error: "Wrong currency code length"});

    try {
        const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${req.params.currency}/${req.params.date}`, {
            method: 'get',
            headers: {'Accept': 'application/json'}});
        const data = await response.json();
        return res.status(200).json({"rate": data.rates[0].mid});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "An error occured while fetching data from API"})
    }
};