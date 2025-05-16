import { DataTypes } from "sequelize";
import { sequelize } from "../config/delivery.js";

const Cupoms = sequelize.define(
    "cupoms",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
            unique: true, 
        },
        code: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        value: {
            type: DataTypes.NUMERIC,
            allowNull: false, 
        },
        uses: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // usedByUser: {
        //     type: DataTypes.ARRAY(DataTypes.INTEGER),
        //     allowNull: true,
        //     defaultValue: [],
        // },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Cupoms;
