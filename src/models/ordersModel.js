import { DataTypes } from "sequelize";
import { sequelize } from "../config/delivery.js";

const Orders = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, 
      unique: true, 
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    total: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    total_discount: {
      type: DataTypes.NUMERIC,
      allowNull: true,
    },
    id_user_costumer: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: "usuarios", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_user_deliver: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "usuarios", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    id_address: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "adresses", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_payment: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: "payments", 
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
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default Orders;
