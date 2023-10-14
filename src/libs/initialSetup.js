import Role from "../Schemas/Role.js";
import User from "../Schemas/User.js";
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from "../config.js";

export const createRoles = async () => {
  try {
    //counts the documents in the role collection
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: ADMIN_EMAIL });
  console.log(userFound);
  if (userFound) return;

  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin"] } });

  // create a new admin user
  const newUser = await User.create({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: roles.map((role) => role._id),
  });

  console.log(`new user created: ${newUser.email}`);
};

createRoles();
createAdmin();
