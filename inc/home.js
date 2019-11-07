const conn = require('./db');

module.exports = {
    render(req, res, error, success) {
        this.getData().then(data => {
            res.render('index', {
                title: 'Contábil Agnaldo Mendes',
                banners: data[0],
                news: data[1],
                body: req.body,
                error,
                success
            })
        }).catch(err => {
            res.send(err);
        });
    },

    getData() {
        return new Promise((resolve, reject) => {
            conn.query(`
            SELECT title AS bTitle, subtitle AS bSubtitle, href AS bHref, photo AS bPhoto FROM tb_banners ORDER BY title;

            SELECT id AS nId, title AS nTitle, subtitle AS nSubtitle, photo AS nPhoto FROM tb_news ORDER BY register;
            `, [1, 2], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}