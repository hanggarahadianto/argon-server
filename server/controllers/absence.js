const db = require("../models/index");

const { sequelize, absence } = require("../models");

// ----------------------------------------------------

exports.getAbsence = async (req, res) => {
  const absenceData = await absence.findAll();
  res.status(200).json(absenceData);
};

exports.addAbsence = async (req, res) => {
  try {
    const absenceData = req.body;
    const newAbsence = await absence.create(absenceData);
    res.status(200).json({
      message: "success",
      data: newAbsence,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAbsenceId = async (req, res) => {
  try {
    const id = req.params.id;
    const getAbsenceId = await absence.findOne({
      where: { id: id },
    });
    if (getAbsenceId) {
      res.json({
        message: "success",
        data: getAbsenceId,
      });
    } else {
      res.json({
        message: "absence not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
