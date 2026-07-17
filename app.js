import express from "express";
import morgan from "morgan";
import user from "./api/modules/user/network.js";
import auth from "./api/modules/auth/network.js";
import note from "./api/modules/note/network.js";
import security from "./api/middlewares/security.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/api/v1',auth);
app.use('/api/v1/note',
    security.validToken
    ,note);
app.use('/api/v1/user',
    security.validToken,
    security.verifyRoles(4,5),user);
app.get('/',(req,res)=>{
    res.send({
        sist:'appnote',
        description:'',
    });
});

export default app;

