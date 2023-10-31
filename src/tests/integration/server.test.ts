import request from "supertest";
import {Express} from "express";
import {createServer} from "../../infrastructure/server";

describe('The Server', ()=>{
    let server: Express;
    beforeEach(()=>{
        server = createServer();
    });

    it('works', async ()=>{
        const response = await request(server).get('/status');

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toEqual({status: 'OK'});
    });
});
