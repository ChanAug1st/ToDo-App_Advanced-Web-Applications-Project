import { pool } from "../helper/db.js"
import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const { sign } = jwt;

const router = Router();


router.post("/register", async (req, res, next) => {
    hash(req.body.password, 10, (error, hashedPassword) => {
        if (error) {
            return next(error);
        }
        try {
            pool.query(
                "INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *",
                [req.body.email, hashedPassword],
                (error, result) => {
                    if (error) {
                        return next(error);
                    }
                    res.status(201).json({ id: result.rows[0].id, email: result.rows[0].email });

                }
            );
        } catch (error) {
            return next(error);
        }
    });
});