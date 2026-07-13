import express from "express";
import morgan from "morgan";
import user from "./api/modules/user/network.js";

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user',user);
app.get('/',(req,res)=>{
    res.send({
        sist:'appnote',
        description:'',
    });
});

export default app;

