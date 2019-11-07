const conn = require('./db');
const path = require('path');

module.exports = {
    getBanners() {
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT * FROM tb_banners ORDER BY title
            `, (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        });
    },

    save(fields, files) {
        return new Promise((resolve, reject) => {
            fields.photo = `images/${path.parse(files.photo.path).base}`;

            let query, queryPhoto = '', params = [
                fields.title,
                fields.subtitle,
                fields.href
            ];

            if (files.photo.name) {
                queryPhoto = ', photo = ?';
                params.push(fields.photo);
            }

            if(fields.id > 0) {
                params.push(fields.id);

                query = `
                    UPDATE tb_banners
                    SET title = ?,
                        subtitle = ?,
                        href = ?
                        ${queryPhoto}
                    WHERE id = ?
                `;
            } else {
                if(!files.photo.name) {
                    reject('É necessário enviar uma foto.');
                }

                query = `
                    INSERT INTO tb_banners(title, subtitle, href, photo)
                    VALUES (?, ?, ?, ?)
                `;
            }

            conn.query(query, params, (err, results) => {
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
                DELETE FROM tb_banners WHERE id = ?
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