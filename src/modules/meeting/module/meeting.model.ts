import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";

class Meeting extends Model {
  declare id: number;
  declare title: string;
  declare startTime: Date;
  declare endTime: Date;
  declare userId: number;
}

Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },

    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    }
  },
  {
    sequelize,
    tableName: "meetings",
    modelName: "Meeting",
    timestamps: true
  }
);

export default Meeting;