import * as dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import router from "./app/http/routes";
import {debug} from "util";
import {exceptionHandler} from "./app/http/middlewares";
import storage from './app/storage'
import bcrypt from 'bcryptjs';

const PORT = process.env.PORT || 3001;
const TEST_USER_LOGIN = process.env.USER_LOGIN || 'test';
const TEST_USER_PASSWORD = process.env.USER_PASSWORD || 'test';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.use(router);
app.use(exceptionHandler);

async function initTestUser() {
    const password = await bcrypt.hash(TEST_USER_PASSWORD, 10);

    storage.set(TEST_USER_LOGIN, {
        login: TEST_USER_LOGIN,
        name: 'admin',
        id: 1,
        password
    });
}

const server = app.listen(PORT, async () => {
    debug(`Server is running on port ${PORT}`)

    await initTestUser()

    debug('User initialized')
});



process.on('SIGTERM', () => {
    debug('Stopping HTTP server')
    server.close(() => debug('HTTP server stopped'))
})