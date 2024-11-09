import { pool } from "../helper/db.js"


const selectAllTasks = async () => {
    return pool.query('SELECT * FROM task');
}

const InsertTask = async (description) => {
    return pool.query('INSERT INTO task (description) VALUES ($1) returning *', [description]);
}

export { selectAllTasks, InsertTask, DeleteTask };