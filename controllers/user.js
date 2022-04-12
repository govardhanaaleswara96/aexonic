const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
/**
 * user registration
 */
const createUser = async (req, res) => {
  const {firstName,lastName,email,mobile } = req.body;
  /**
   * find email id Exists or not
   */
  const findUser = await userModel.findOne({ email: email });
  if (findUser) {
    res.status(404).json({
      message: "Email Already Exists",
    });
  } else {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new userModel({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashPassword,
      mobile:mobile
    });
    try {
      const result = await user.save();
      res.status(201).json({
        message: "User Created Successfully",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(201).json({
        message: "User Creation Failed ",
      });
    }
  }
};
// get all users
const getUsers = async (req, res) => {
  try {
    const pageLimit = 10;
    const result = await userModel.find({}).select('-password');
    let rawData = JSON.stringify(result);
    let data = JSON.parse(rawData);
    const userList = data.map((ele) => ({
      ...ele,
      token:jwt.sign({ele},"h4d5fe5")
    }));
     res.status(201).json({
       message: "Users Details Fetched",
       //pagination
      "page": 1,
      "pageCount": Math.ceil(userList.length / 10),
      "userList": userList.slice(-pageLimit).reverse()
     });
   } catch (error) {
     console.log(error);
     res.status(404).json({
       message: "server error",
     });
   }
};
// get users by serach
const getSearchUser = async (req, res) => {
  try {
    const pageLimit = 10;
    const searchText = req.query;
    //console.log(searchText);
    const result = await userModel.find(searchText).select('-password');
    //console.log(result);
    if(!result || result.length === 0){
     return res.status(400).send({error : "No user was found"})
    } 
    let rawData = JSON.stringify(result);
    let data = JSON.parse(rawData);
    const userList = data.map((ele) => ({
      ...ele,
      token:jwt.sign({ele},"h4d5fe5")
    }));
     res.status(201).json({
       message: "Users Details Fetched",
       //pagination
      "page": 1,
      "pageCount": Math.ceil(userList.length / 10),
      "userList": userList.slice(-pageLimit).reverse()
     });
   } catch (error) {
     console.log(error);
     res.status(404).json({
       message: "server error",
     });
   }
};
 /**
   * update user details by id
   */
const updateUser = async (req, res) => {
  const {firstName,lastName,email,mobile } = req.body;
  const id = req.params.id;
 /**
   * find email id Exists or not
   */
  const findUser = await userModel.findOne({ _id: id });
  if (!findUser) {
    res.status(401).json({
      message: "User Not Exists",
    });
  } else {
    const user = {
        firstName:firstName,
        lastName:lastName,
        email:email,
        mobile:mobile
    };

    try {
      const userResult = await userModel.findOneAndUpdate(findUser.id, {
        $set: user,
      });
      res.status(201).json({
        message: "User Details Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(201).json({
        message: "User Update Failed ",
      });
    }
  }
};

/**
 * user login function
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    /**
     * find user exists or not
     */
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        message: "User Not Found !",
      });
    } else {
      /**
       * check password correct or not
       */
      bcrypt.compare(password, user.password, (err, data) => {
        if (data) {
          const token = jwt.sign({ user }, "h4d5fe5");
          res.status(200).json({
            message: "User Login successfully",
            accessToken: token,
          });
        } else {
          res.status(403).json({
            message: "Password Is Incorrect",
          });
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "User Login Failed",
    });
  }
};
module.exports = {
  createUser,
  getUsers,
  getSearchUser,
  updateUser,
  loginUser,
};
