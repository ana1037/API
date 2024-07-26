import { Model, DataTypes } from "sequelize";
import db from "../database_config.js"

const schema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    unique: true,
    primaryKey: true
  },
  complete_name: {
    type: DataTypes.DATE
  },
  idn: {
    type: DataTypes.STRING
  },
  cellphone: {
    type: DataTypes.INTEGER
  }
}

class Patient extends Model {}
Patient.init(schema, { sequelize: db });

export default Patient
