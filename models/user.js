import { Model, DataTypes } from "sequelize";
import db from "../database_config.js"

const schema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    unique: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes. STRING
  },
  idn: {
    type: DataTypes.STRING
  },
  procedure:{
    type: DataTypes.STRING
  }
}

class Users extends Model {}
Users.init(schema, { sequelize: db });

export default Users
