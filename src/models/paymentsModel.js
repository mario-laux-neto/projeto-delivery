import { DataTypes } from "sequelize";
import { sequelize } from "../config/delivery.js";

const Payments = sequelize.define(
    "payments",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.ENUM('PIX', 'Cartão', 'Dinheiro',),
            allowNull: false,
            unique: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Payments;
