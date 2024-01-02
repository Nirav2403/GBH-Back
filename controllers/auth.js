const UserServices = require("../services/user");
const { generateToken } = require("../utils/auth");

class AuthController {
  createUser = async (req, res, next) => {
    try {
      const data = req.body;

      const isExistUser = await UserServices.getUser({ email: data.email });

      if (isExistUser) {
        throw new Error("User already exist with this email");
      }

      if (data.password !== data.confirmPassword) {
        throw new Error(
          "Password and confirm password are not matched with each other"
        );
      }

      const token = generateToken(data);

      const user = await UserServices.createUser({ ...data, token });

      const resp = {
        message: "Signup successfully",
        data: user,
      };

      next(resp);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const data = req.body;

      const userDetails = await UserServices.getUser({ email: data.email });

      if (!userDetails) {
        throw new Error("Provided email or password was incorrect");
      }

      const isValid = await UserServices.isValidPassword(data);

      if (!isValid) {
        throw new Error("Provided email or password was incorrect");
      }

      const resp = {
        message: "Login successfully",
        data: userDetails,
      };

      next(resp);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
