// import database

// membuat class Alumni
class Alumni {
  //model index
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM alumni";

      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  //model store
  static async store(data) {
    //insert data ke database
    const id = await new Promise((resolve, reject) => {
      const query = "INSERT INTO alumni SET ?";
      db.query(query, data, (err, results) => {
        resolve(results);
      });
    });

    //melakukan query berdasarkan id
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM alumni WHERE id = ?";
      db.query(query, id, (err, results) => {
        resolve(results);
      });
    });
  }
}

// export class Alumni
module.exports = Alumni;
