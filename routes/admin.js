const express = require('express');
const router = express.Router();

const admin = require('./../inc/admin');
const banners = require('./../inc/banners');
const news = require('./../inc/news');
const users = require('./../inc/users');
const contacts = require('./../inc/contacts');

router.use(function(req, res, next) {
    if(['/login'].indexOf(req.url) === -1 && !req.session.user) {
        res.redirect('/admin/login');
    } else {
        next();
    }
});

router.use(function(req, res, next) {
    req.menus = admin.getMenus(req);
    next();
});

router.get('/', function(req, res, next) {
    admin.dashboard().then(data => {
        res.render('admin/index', admin.getParams(req, {
            data
        }));
    }).catch(err => {
        console.error(err);
    });
});

router.post('/login', function(req, res, next) {
    if(!req.body.email) {
        users.render(req, res, 'Preencha o campo e-mail.');
    } else if(!req.body.password) {
        users.render(req, res, 'Preencha o campo senha.');
    } else {
        users.login(req.body.email, req.body.password).then(user => {
            req.session.user = user;
            res.redirect('/admin');
        }).catch(err => {
            users.render(req, res, err.message || err);
        })
    }
});

router.get('/login', function(req, res, next) {
    users.render(req, res, null);
});

router.get('/logout', function(req, res, next) {
    delete req.session.user;
    res.redirect('/admin/login');
});

router.post('/banners', function(req, res, next) {
    banners.save(req.fields, req.files).then(results => {
        res.send(results);
    }).catch(err => {
        res.send(err);
    }) 
});

router.delete('/banners/:id', function(req, res, next) {
    banners.delete(req.params.id).then(results => {
        res.send(results);
    }).catch(err => {
        res.send(err);
    });
});

router.get('/banners', function(req, res, next) {
    banners.getBanners().then(data => {
        res.render('admin/banners', admin.getParams(req, {
            data
        }));
    }).catch(err => {
        res.send(err);
    });
});

router.post('/noticias', function(req, res, next) {
    news.save(req.fields, req.files).then(results => {
        res.send(req.body);
    }).catch(err => {
        res.send(err);
    });
});

router.delete('/noticias/:id', function(req, res, next) {
    news.delete(req.params.id).then(results => {
        res.send(results);
    }).catch(err => {
        res.send(err);
    });
});

router.get('/noticias', function(req, res, next) {
    news.getNews().then(data => {
        res.render('admin/news', admin.getParams(req, {
            data
        }));
    }).catch(err => {
        res.send(err);
    })
});

router.post('/usuarios', function(req, res, next) {
    users.save(req.fields, req.files).then(results => {
        res.send(results);
    }).catch(err => {
        res.send(err);
    });
});

router.post('/usuarios/mudar-senha', function(req, res, next) {
    users.changePassword(req).then(results => {
        res.send(results);
    }).catch(err => {
        res.send({ error: err });
    });
});

router.delete('/usuarios/:id', function(req, res, next) {
    users.delete(req.params.id).then(results => {
        res.send(results);
    }).catch(err => {
        res.send(err);
    });
});

router.get('/usuarios', function(req, res, next) {
    users.getUsers().then(data => {
        res.render('admin/users', admin.getParams(req, {
            data
        }));
    }).catch(err => {
        res.send(err);
    });
});

router.delete('/emails/:id', function(req, res, next) {
    contacts.delete(req.params.id).then(results => {
        res.send(results);
    }).catch(err => {
        res.send(err);
    });
});

router.get('/emails', function(req, res, next) {
    contacts.getContacts().then(data => {
        res.render('admin/contacts', admin.getParams(req, {
            data
        }));
    }).catch(err => {
        res.send(err);
    });
});

module.exports = router;