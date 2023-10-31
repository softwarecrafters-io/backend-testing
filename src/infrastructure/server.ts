import express, {Express, Request, Response} from "express";

export function createServer(): Express {
    const server = express();
    server.use(express.json());
    server.get('/status', (req:Request, res: Response)=> res.status(200).json({ status:'OK' }));
    return server;
}
