const db = require("../models/index");
const bcrypt = require("bcryptjs");
const { sequelize, employee, auth } = require("../models");
const path = require("path");
// ----------------------------------------------------

exports.getEmployee = async (req, res) => {
  const employeeData = await employee.findAll();

  res.status(200).json(employeeData);
};

exports.addEmployee = async (req, res) => {
  const transaction = await sequelize.transaction();
  const { auth_id } = req.body;
  try {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(auth_id.password, salt);

    // const newAuth = await auth.create(
    //   {
    //     email: auth_id.email,
    //     password: hashedPassword,
    //   }
    //   // { transaction }
    // );

    const newEmployee = await employee.create(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        position: req.body.position,
        // photo: req.file.path,
        // auth_id: newAuth.id,
      }
      // { transaction }
    );
    res.status(200).json({
      message: "success",
      data: newEmployee,
      photo: "http://localhost:9000/uploads/" + newEmployee.photo,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getEmployeeId = async (req, res) => {
  try {
    const id = req.params.id;
    const getEmployeeId = await employee.findOne({
      where: { id: id },
    });
    if (getEmployeeId) {
      res.json({
        message: "success",
        data: getEmployeeId,
      });
    } else {
      res.json({
        message: "employee not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeData = await employee.findOne({
      where: { id: id },
    });
    if (employeeData) {
      await employee.destroy({
        where: { id: employeeData.id },
      });
      res.send({
        message: "success",
      });
    } else {
      res.json({
        message: "employee not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
