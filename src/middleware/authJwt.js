import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import User from "../Schemas/User.js";
import Role from "../Schemas/Role.js";
import Publication from "../Schemas/Publication.js"

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;


    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: {msg: error.message}});
  }
};


//Admin Or Author
export const isAdminOrAuthor = async (req, res, next) => {
  const userIdFromToken = req.userId;
  const { id } = req.params;

  try {
    const publication = await Publication.findById(id);

    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    const user = await User.findById(userIdFromToken);
    const roles = await Role.find({ _id: { $in: user.roles } });

    const isAdmin = roles.some(role => role.name === "admin");

    if (user && (isAdmin || publication.author.toString() === userIdFromToken)) {
      // El usuario es administrador o el autor de la publicación, permitir la acción
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: {msg: error.message} });
  }
};

//Admin Or User
export const isAdminOrOwner = async (req, res, next) => {
  const userIdFromToken = req.userId;
  const { id } = req.params;

  try {
    const user = await User.findById(userIdFromToken);
    const roles = await Role.find({ _id: { $in: user.roles } });

    const isAdmin = roles.some(role => role.name === "admin");

    if (user && (isAdmin || id.toString() === userIdFromToken)) {
      // El usuario es administrador o el propietario de la cuenta, permitir la acción
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: { msg: error.message } });
  }
};
