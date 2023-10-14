import User from "../Schemas/User.js";
import { ROLES } from "../Schemas/Role.js";

export const checkExistingUser = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ username: req.body.username });
    if (userFound)
      return res.status(400).json({ message: "The user already exists" });

    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const checkExistingRole = (req, res, next) => {

  if (!req.body.admin || req.body.admin.length === 0) {
      req.body.admin = ["user"]
  }

  for (let i = 0; i < req.body.admin.length; i++) {
      if (!ROLES.includes(req.body.admin[i])) {
          return res.status(400).json({
              message: `Role ${req.body.admin[i]} does not exist`});
      }
  }

  next();
}

