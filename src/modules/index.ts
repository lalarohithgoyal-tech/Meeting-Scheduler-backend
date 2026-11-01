import User from "./user/model/user.model";
import Meeting from "./meeting/module/meeting.model";

// One user can have multiple meetings
User.hasMany(Meeting, {
  foreignKey: "userId",
  as: "meetings"
});

// Each meeting belongs to one user
Meeting.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

export { User, Meeting };