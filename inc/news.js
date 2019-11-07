const conn = require('./db');
const path = require('path');

module.exports = {
    getNews() {
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT tb_news.id, tb_news.title, tb_news.subtitle, tb_news.text, tb_news.photo, tb_users.name AS author 
                FROM tb_news INNER JOIN tb_users ON tb_news.author = tb_users.id
                ORDER BY title
            `, (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        });
    },

    getNewsById(id) {
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT tb_news.id, tb_news.title, tb_news.subtitle, tb_news.text, tb_news.photo, tb_news.register, tb_users.name AS author 
                FROM tb_news INNER JOIN tb_users ON tb_news.author = tb_users.id
                WHERE tb_news.id = ?;
            `, [
                id
            ], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        });
    },

    getNewsRelated(id) {
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT id, title, photo FROM tb_news WHERE NOT id = ? ORDER BY register DESC LIMIT 3 
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
    },

    save(fields, files) {
        return new Promise((resolve, reject) => {
            fields.photo = `images/${path.parse(files.photo.path).base}`;

            let query, queryPhoto = '', params = [
                fields.title,
                fields.subtitle,
                fields.text,
                fields.author
            ];

            if(files.photo.name) {
                queryPhoto = ', photo = ?';
                params.push(fields.photo);
            }

            if(fields.id > 0) {
                params.push(fields.id);

                query = `
                    UPDATE tb_news
                    SET title = ?,
                        subtitle = ?,
                        text = ?,
                        author = ?
                        ${queryPhoto}
                    WHERE id = ?
                `;
            } else {
                if(!files.photo.name) {
                    reject('É necessário enviar uma foto.');
                }

                query = `
                    INSERT INTO tb_news(title, subtitle, text, author, photo)
                    VALUES (?, ?, ?, ?, ?)
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
                DELETE FROM tb_news WHERE id = ?
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