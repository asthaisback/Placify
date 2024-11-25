import express from "express";
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connection} from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js";
import { newLetterCron } from "./automation/newsLetterCron.js";

const app=express();
// config is a function
config({path:"./config/config.env"});
    app.use(cors({             // app.use mtlb cors ko as a middleware use kr rahe
        origin:[process.env.FRONTEND_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);
app.use(cookieParser());  // store user preferances, use to track the logged in user across multiple req
app.use(express.json());  //  makes this data available as req.body for use in your server-side code.
app.use(express.urlencoded({extended:true})); // when we submit the html form, data is in the form of url and "urlencode parces the data so that it can access in the req.body"
// Parsing the data means reading and converting the incoming data into a usable format 
// for ex: convert the string (data of username and pswd ) into object 

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
);

app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);

newLetterCron()
connection();
app.use(errorMiddleware);


export default app;