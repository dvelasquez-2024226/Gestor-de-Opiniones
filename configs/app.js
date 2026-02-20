'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';
import { errorHandler } from '../middlewares/handle-errors.js';
import userRoutes from '../src/users/user.routes.js';

const BASE_PATH = '/control-de-opiniones/v1';

/* MIDDLEWARES GLOBALES */
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    app.use(requestLimit);
};


/* REGISTRO DE RUTAS */
const routes = (app) => {

    // Usuarios (registro, login, perfil)
    app.use(`${BASE_PATH}/users`, userRoutes);


    // Health Check
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            status: 'healthy',
            service: 'Control de Opiniones API'
        });
    });
};


/*INICIALIZAR SERVIDOR */
export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.set('trust proxy', 1);

    try {
        await dbConnection();

        middlewares(app);
        routes(app);

        // Manejo centralizado de errores (SIEMPRE AL FINAL)
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_PATH}`);
            console.log(`Health Check: http://localhost:${PORT}${BASE_PATH}/health`);
        });

    } catch (err) {
        console.error(`Error al iniciar el servidor: ${err.message}`);
        process.exit(1);
    }
};