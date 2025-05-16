import { DataTypes } from "sequelize";
import { sequelize } from "../config/delivery.js";

const Products = sequelize.define(
    "products",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, // Não pode ser nulo
            unique: true, // Deve ser único
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false, // Não pode ser nulo
        },
        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false, // Não pode ser nulo
        },
        image: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false, // Não pode ser nulo
            references: {
                model: "categories", // Nome da tabela referenciada
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        freezeTableName: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
          }
          
);

export default Products;