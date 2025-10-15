import express from 'express';
import path from 'path';
import router from './router';
import routerAdmin from './routerAdmin';

/* 1- ENTRANCE */
const app = express();
console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* 2- SESSION */

/* 3- VIEWS */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* 4- ROUTERS */
app.use('/admin', routerAdmin); // SSR => Single Page Application  EJS
app.use('/', router); // SPA => Single Page Application REACT

export default app;