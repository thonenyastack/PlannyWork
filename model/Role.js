import mongoose from "mongoose";

const Role = new mongoose.Schema({
  roles: {
    enum: ["user", "admin", "moderator"],
  },
});
