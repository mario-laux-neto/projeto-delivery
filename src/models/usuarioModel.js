import { DataTypes } from "sequelize";
import { sequelize } from "../config/delivery.js";

const Usuario = sequelize.define(
    'usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
            unique: true, 
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false, 
            unique: true, 
        },
        cpf: {
            type: DataTypes.STRING(14),
            allowNull: false, 
            unique: true, 
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false, 
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false, 
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        token: {
            type: DataTypes.STRING(255),
        },
        role: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        cart: {
            type: DataTypes.JSONB,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false, 
            unique: true, 
        },
        recuperation: {
            type: DataTypes.STRING(255),
        },
        codigoRecuperacao: {
            field: 'codigo_recuperacao',
            type: DataTypes.STRING(6),
            allowNull: true,
        },
        codigoExpira: {
            field: 'codigo_expiracao',
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
          
          
    }
);

export default Usuario;