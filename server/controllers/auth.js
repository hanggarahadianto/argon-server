const bcrypt = require("bcryptjs");
const { sequelize, auth, employee } = require("../models");
const jwt = require("jsonwebtoken");
// ----------------------------------------------------

exports.getAuth = async (req, res) => {
  const authData = await auth.findAll();
  res.json(authData);
};

exports.login = async (req, res) => {
  try {
    const userExist = await auth.findOne({
      where: { email: req.body.email },
    });
    if (!userExist) {
      return res.send({
        message: "email not found",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "email or password doesn't match",
      });
    }

    const accessToken = jwt.sign(
      { id: userExist.id, email: userExist.email, name: userExist.name },
      process.env.TOKEN_KEY
    );

    const employeeData = await employee.findOne({
      where: {
        auth_id: userExist.id,
      },
    });
    res.json({
      status: "success",
      data: userExist,
      token: accessToken,
      employeeData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.authProfile = async (req, res) => {
  res.json(req.auth);
};

exports.addAuth = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newAuth = await auth.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "success",
      data: newAuth,
    });
  } catch (err) {
    console.log(err);
  }
};
