import express from "express";
import morgan from "morgan";
import notes from "./components/notes/network.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/v1/notes',notes);

app.use('/',(req,res)=>{
    res.json({
        sist:'aplicacion de notas',
        description:'aplicacion para guardar notas personales.',
        version:'1.0.0',
    });
})


export default app;
