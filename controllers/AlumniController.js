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


  //controller create
  async create(req, res) {
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

  //controller update
  async update(req, res) {
    const { id } = req.params;
    //cari id alumni yang ingin diupdate
    const alumni = await Alumni.find(id);
    //cek apakah ada
    if (alumni) {
    //melakukan update data
    const alumni = await Alumni.update(id, req.body);
    const data = {
      message: "Resource is update successfully",
      data: alumni,
    };
    res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  }

  //controller delete
  async destroy(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);
    //cek apakah ada
    if (!alumni) {
      await Alumni.delete(id);
      const data = {
        message: "Resource is delete successfully",
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  }

  //controller find
  async find(req, res) {
    const alumni = await Alumni.find();
      //cek apakah ada
    if (alumni) {
      const data = {
        message: "Get Detail resource",
        data: alumni,
      };
    res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
    res.status(404).json(data);
    }
  }

  //controller search
  async search(req, res) {
    const { name } = req.params;
    const alumni = await Alumni.search({ name });
    //cek apakah ada
    if (alumni) {
      const data = {
        message: "Get searched resource",
        data: alumni,
      };
    res.status(200).json(data);
    } else {
        const data = {
        message: "Resource not found",
      };
    res.status(404).json(data);
    }
  }

  //controller get fresh graduate resource
  async freshGraduate(req, res) {
    const alumni = await Alumni.findByStatus({ freshGraduate: true });
    //cek apakah ada
    if (alumni) {
      const data = {
        message: "Get fresh graduate resource",
        data: alumni,
      };
    res.status(200).json(data);
    } else {
        const data = {
        message: "Resource not found",
      };
    res.status(404).json(data);
    }
  }

  //controller Employed resource
  async employed(req, res) {
    const alumni = await Alumni.findByStatus({ employed: true });
    //cek apakah ada
    if (alumni) {
      const data = {
        message: "Get employed resource",
        data: alumni,
      };
    res.status(200).json(data);
    } else {
        const data = {
        message: "Resource not found",
      };
    res.status(404).json(data);
    }
  }

  //controller unemployed resource
  async unemployed(req, res) {
    const alumni = await Alumni.findByStatus({ employed: false });
    //cek apakah ada
    if (alumni) {
      const data = {
        message: "Get unemployed resource",
        data: alumni,
      };
    res.status(200).json(data);
      } else {
        const data = {
        message: "Resource not found",
      };
    res.status(404).json(data);
    }
  } 
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;
