import express, { Application } from 'express'
import path from 'path'
import { CategoryRoute} from '../Routes/CategoryRoute';
import { ProductRoute} from '../Routes/ProductRoute';
// const cor = require('cor)
import { UserRoute } from '../Routes/UsersRoute';

export default async (app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use('/assets', express.static('assets'))
    app.use('/category', CategoryRoute)
    app.use('/product', ProductRoute)
    // app.use(cors());
    app.use("/user", UserRoute);

    return app;
}