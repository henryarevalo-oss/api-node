import express from 'express';

import usersRouter from './routes/users.js';

import dotenv from 'dotenv'
dotenv.config();

const app= express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hola, mundo UNIACES! El servidor esta funcionando correctamente ');

});

app.use('/users', usersRouter);


app.listen(process.env.PORT || 3306, ()=>{
    console.log(`Servidor corrriendo en htttp://localhost:${process.env.PORT || 3000}`);
});
