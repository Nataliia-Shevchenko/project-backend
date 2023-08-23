import fs from "fs/promises";
import path from "path";
import { ctrlWrapper } from "../../decorators/index.js";
import User from "../../models/user-model.js";

const avatarPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id, avatarURL: oldAvatarURL } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.unlink(oldAvatarURL);
    await fs.rename(oldPath, newPath);

    const avatarURL = path.join("public", "avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } 
  catch (error) {
    await fs.unlink(oldPath);
    throw error;
  }
};

export default ctrlWrapper(updateAvatar);
