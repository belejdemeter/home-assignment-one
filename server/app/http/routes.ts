import { Router } from 'express';
import {statusController, questionController, userController} from "./controllers";
import {auth} from "./middlewares";

const router = Router();

router.get('/', statusController.status);
router.get('/question', auth, questionController.ask);
router.post('/login', userController.login);

export default router