// import Model Alumni
const Alumni = require("../models/Alumni");
//import express validator
const { validationResult } = require('express-validator');
// buat class AlumniController
class AlumniController {
  // Mendapatkan seluruh resource
  async index(req, res) {
    const alumni = await Alumni.all();
    //cek apakah kosong
    if (!alumni || alumni.length === 0) {
      return res.status(200).json({
          message: "Data is empty",
          data: []
      });
    }

    // Jika data tidak kosong, tampilkan data
    const data = {
        message: "Get All Resource",
        data: alumni
    };
    res.status(200).json(data);
  }

  async store(req, res) {
    // Validasi data request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "All data must be filled correctly",
            errors: errors.array()
        });
    }
    // Ambil data dari request
    const alumni = await Alumni.create(req.body);
    // Tampilkan data
    const data = {
      message: "Resource is added successfully",
      data: alumni
    };
    res.status(201).json(data);
  }

  
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;
