import pkg from "./package.json" with {type:"json"};

import express from "express";
import morgan from "morgan";
import user from "./api/modules/user/network.js";
import auth from "./api/modules/auth/network.js";
import note from "./api/modules/note/network.js";
import security from "./api/middlewares/security.js";
import config from "./config.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/api/v1',auth);
app.use('/api/v1/note',
    security.validToken
    ,note);
app.use('/api/v1/user',
    security.validToken,
    security.verifyRoles(config.API.ROLE_ADMIN,config.API.ROLE_SOPORTE),user);
app.get('/',(req,res)=>{
    res.send({
        sist: pkg.name,
        description: pkg.description,
        version: pkg.version
    });
});

export default app;

