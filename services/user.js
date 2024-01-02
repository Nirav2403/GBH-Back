const User = require("../models/user");

class UserServices {
  createUser = async (user) => {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      role,
      token,
    } = user || {};
    console.log(token);
    const data = User.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      role,
      token,
    });
    console.log(data);
    return data;
  };

  isValidPassword = (user) => {
    const { email, password } = user || {};
    return User.findOne({ email })
      .select("password")
      .then((user) => user.correctPassword(password, user.password));
  };

  updateUser = (user) => {
    const { id } = user || {};
    const data = User.findByIdAndUpdate(id, user, {
      runValidators: true,
    });
    return data;
  };

  deleteUser = (id) => {
    const data = User.findByIdAndDelete(id);
    return data;
  };

  getUsers = (user) => {
    const data = User.find(user);
    return data;
  };

  getUserById = (id) => {
    const data = User.findById(id);
    return data;
  };

  getUser = (user) => {
    const data = User.findOne(user);
    return data;
  };
}

module.exports = new UserServices();
