import { Router } from "express";
import { pool } from '../helper/db';
import { emptyOrRows } from '..helpers/utils,js'
import { getTasks, postTask } from '../controllers/TaskController'

const router = Router();

router.get('/', getTasks);

