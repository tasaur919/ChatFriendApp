import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//signUp
export const signUp = async (req, res) => {
  try {
    const { name, username, email, password, image, mobile } = req.body;
    const checkUserName = await User.findOne({ username });
    if (checkUserName) {
      return res
        .status(400)
        .json({ message: "UserName allready exist!", sts: 1 });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email allready exist!", sts: 2 });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 Characters!", sts: 3 });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    //main logic

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPass,
      image,
      mobile,
    });
    
    const token = await genToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false, //true when deploy the project.
    });
     res
      .status(200)
      .json({ message: "SignUp successful!", sts: 0, newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!", sts: 5 });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found", sts: 1 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Password is not match!", sts: 2 });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false, //true when deploy the project.
    });
    return res
      .status(200)
      .json({ message: "login successful!", sts: 0, user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//logout

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logOut Succcessful!" });
  } catch (error) {
    return res.status(500).json({ message: "log out error!" });
  }
};
