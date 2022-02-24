const AddressSchema = require("../model/userAddressSchema");
const ProfileSchema = require("../model/userProfileSchema");
const UserData = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      user_name,
      email,
      password,
      confirm_password,
    } = req.body;

    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (emailRegexp.test(email) == false) {
      throw new Error("email is not valid");
    }

    if (password !== confirm_password) {
      throw new Error("password is not matching");
    }
    if (!email) {
      throw new Error("email is required");
    }
    if (!first_name) {
      throw new Error("first_name is required");
    }
    if (!password) {
      throw new Error("password is required");
    }
    if (!last_name) {
      throw new Error("last_name is required");
    }
    if (!user_name) {
      throw new Error("user_name is required");
    }
    if (!(email && password && first_name && last_name && user_name)) {
      throw new Error("All input is required");
    }
    const oldUser = await UserData.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UserData.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    const data = await user.save();
    const response = {
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      token: data.token,
    };
    res.status(201).json(response);
  } catch (err) {
    res.send(err.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await UserData.findOne({ email });
    if (await UserData.findOne({ email: req.body.email })) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

//Get Method for user.
const getUserData = async (req, res) => {
  try {
    const getUser = await UserData.find({}).sort({ id: 1 });
    res.send(getUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Here is the patch Method for user.
const patchUserData = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      res.json({ success: false, message: "Parameter required" });
      return;
    }
    const update = await UserData.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(update);
  } catch (error) {
    res.status(400).send(error);
  }
};
//Here is the post method for profile.
const postProfile = async (req, res) => {
  try {
    const addProfile = new ProfileSchema(req.body);
    console.log(req.body);
    const data = await addProfile.save();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
};

//Here we are  getting user and address Data with both using populate.
const userDataAndAddress = async (req, res, next) => {
  const data = await UserData.find().populate("address");

  res.send(data).catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
};
var ObjectID = require("mongodb").ObjectID;

const userAddress = async (req, res) => {
  try {
    const data = await UserData.find().populate("address");
    const { user_id, address, city, state, mobile_no, pin } = req.body;
    const addressInfo = new AddressSchema(req.body);

    // in curlybrace we will  assecc user_id after that address id
    const userData = await UserData.findOneAndUpdate(
      { _id: ObjectID(user_id) },
      { address: addressInfo._id }
    );
    const addressData = await addressInfo.save();
    res.send(addressData);
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  userAddress,
  userDataAndAddress,
  userLogin,
  userRegister,
  patchUserData,
  getUserData,
  postProfile,
};
