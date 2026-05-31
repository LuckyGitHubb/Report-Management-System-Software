import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import {prisma,connectDB,disconnectDB} from './config/db.js';
import reportRouter from './routes/report-router.js';
import reportTemplateRouter from './routes/report-template-router.js';

dotenv.config();
connectDB();
const PORT = process.env.PORT_NO

const app = express();

app.use(
    cors({
        origin: 'https://reportmanagementsystem.vercel.app/', // cors means Backend allows requests FROM frontend running on port 5173 ex:request: POST.GET,PUT etc
        credentials: true
    })
)

app.use(express.json())  // when we send the data from frontend (headers: application/json) sending json string express.json converts into object
app.use(express.urlencoded({ extended:true })) // this is for form data converts into JSON object

app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use('/report',reportRouter)
app.use('/report-template',reportTemplateRouter)
        
app.listen(PORT,()=>{
    try {
        console.log(`Database is running on Port No: ${PORT}`)
    } catch (error) {
        console.log(`Database crashed due to this error: ${error}`)
    }
})