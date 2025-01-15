// import database

// membuat class Alumni
class Alumni {
  //model index
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM alumni";

      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  //model store
  static async create(data) {
    //insert data ke database
    const id = await new Promise((resolve, reject) => {
      const query = "INSERT INTO alumni SET ?";
      db.query(query, data, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });

    //melakukan query berdasarkan id
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM alumni WHERE id = ?";
      db.query(query, id, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  //model update
  static async update(id, data) {
    //update data ke database
    await new Promise((resolve, reject) => {
      const query = "UPDATE alumni SET ? WHERE id = ?";
      db.query(query, [data, id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
    //ambil data yang diperbarui
    const alumni = await this.find(id);
    return alumni;
  }

  //model delete
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  //model find
  static async find(id) {
    //melakukan query berdasarkan id
    await new Promise((resolve, reject) => {
      const query = "SELECT * FROM alumni WHERE id = ?";
      db.query(query, id, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  //model search
  static async search(keyword) {
    //melakukan query berdasarkan keyword
    await new Promise((resolve, reject) => {
      const query = "SELECT * FROM alumni WHERE nama LIKE ?";
      db.query(query, `%${keyword}%`, (err, results) => {
        if (err) {
          return reject(err);
          }
        resolve(results);
      });
    });
  }
  
  //model findbystatus, menampilkan data alumni yang tergolong dalam status tertentu: Freshgraduate, unemployed, dan employed
  static async findByStatus(status) {
    //melakukan query berdasarkan status
    await new Promise((resolve, reject) => {
      const query = "SELECT * FROM alumni WHERE status = ?";
      db.query(query, status, (err, results) => {
        if (err) {
          return reject(err);
          }
        resolve(results);
      });
    });
  }
}

// export class Alumni
module.exports = Alumni;
