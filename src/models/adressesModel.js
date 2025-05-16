import { DataTypes } from "sequelize";
import { sequelize } from "../config/delivery.js";

const Adresses = sequelize.define(
    "adresses",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
            unique: true, 
        },
        zip_code: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        district: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        number_forgot: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "usuarios",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        id_cupom: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "cupoms", 
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Adresses;