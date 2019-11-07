const conn = require('./db');

module.exports = {
    getContacts() {
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT * FROM tb_contacts ORDER BY register DESC
            `, (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    save(fields) {
        return new Promise((resolve, reject) => {
            conn.query(`
                INSERT INTO tb_contacts(name, email, telephone, subject, message)
                VALUES(?, ?, ?, ?, ?)
            `, [
                fields.name,
                fields.email,
                fields.telephone,
                fields.subject,
                fields.message
            ], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            conn.query(`
                DELETE FROM tb_contacts WHERE id = ?
            `, [
                id
            ], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};