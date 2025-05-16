import { DataTypes } from "sequelize";
import { sequelize } from "../config/delivery.js";

const Categories = sequelize.define(
    "categories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
            unique: true, 
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    
    }
);

export default Categories;
