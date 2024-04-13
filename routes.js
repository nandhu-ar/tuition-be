import { Router } from "express";
import { insertToDB, getAllStudents } from "./mongo.js";

const router = Router();

router.post('/student', async (req, res) => {
    console.log(req.body);
    await insertToDB(req.body);
    res.send('Your details are saved successfully.');
});

// router.get('/student', async (req, res) => {
//     const students = await getAllStudents();
//     res.send(students);
// });

router.get('/ping', (req, res) => {
    res.send('I am up :)');
})
export default router;