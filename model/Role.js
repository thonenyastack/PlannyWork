import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  roles: {
    type: String,
    enum: ["user", "admin", "moderator"],
  },
});

export default mongoose.model("Role", RoleSchema);
