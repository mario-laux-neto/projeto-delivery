import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";
import Order from "./ordersModel.js"; // Import atualizado
import Product from "./productsModel.js"; // Import atualizado

const OrderProduct = sequelize.define(
    'orders_products',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        priceProducts: {
            field: 'price_products',
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
)

OrderProduct.belongsTo(Order, {
    as: 'order',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
      name: 'idOrder',
      allowNull: false,
      field: 'id_order',
      unique: true,
    }
});

OrderProduct.belongsTo(Product, {
    as: 'product',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
      name: 'idProduct',
      allowNull: false,
      field: 'id_product',
      unique: true,
    }
}); 

export default OrderProduct;