import { Sequelize } from "sequelize";
import 'dotenv/config'

export const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        dialect: 'postgres'
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao banco!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
})();