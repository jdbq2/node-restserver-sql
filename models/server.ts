import express, { Application } from "express";
import cors from "cors";
import db from "../db/connection";
import userRoutes from "../routes/usuario";

class Server {
    private app: Application;
    private port: string;
    private apiPaths: {
        usuarios: string;
    } = {
        usuarios: "/api/usuarios",
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log("base de datos online");
        } catch (error) {
            throw new Error("Error al conectar la base de datos");
        }
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }
    listen() {
        this.app.listen(this.port, () =>
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        );
    }
    middlewares() {
        //activacion del cors
        this.app.use(cors());
        //lectura del body
        this.app.use(express.json());
        // Servir archivos de la carpeta publica (HTML)
        this.app.use(express.static("public"));
    }
}

export default Server;
