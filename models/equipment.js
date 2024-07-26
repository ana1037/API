import { Model, DataTypes } from "sequelize";
import db from "../database_config.js"

const schema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    unique: true,
    primaryKey: true
  },
  model_name: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  serial_number: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  location:{
    type: DataTypes.STRING
  }
}

class Equipment extends Model {}
Equipment.init(schema, { sequelize: db });

export default Equipment