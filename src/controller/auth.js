import jwt from "jsonwebtoken";
import User from "../Schemas/User.js";
import Role from "../Schemas/Role.js";
import { SECRET } from "../config.js";


export const signupHandler = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    if (roles && roles.length > 0) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      if (!foundRoles || foundRoles.length === 0) {
        return res.status(400).json({ message: "Roles not found" });
      }
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      newUser.roles = [defaultRole._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 604800 , // 24 hours
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


export const signinHandler = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate("roles");

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 604800 // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
