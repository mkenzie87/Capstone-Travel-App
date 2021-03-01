// Help from : https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
import {allAPIData, expect} from '@jest/globals';


const request = require("supertest");
const app = require("../server/app");

describe("Test the root path", () => {
    test("It should response the GET method", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});
