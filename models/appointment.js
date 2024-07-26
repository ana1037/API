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
    type: DataTypes.DATE
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

class Appointment extends Model {}
Appointment.init(schema, { sequelize: db });

export default Appointment
