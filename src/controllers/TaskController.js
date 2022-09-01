const express = require('express');

const router = express.Router();

router.get('/tasks', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tasks', (err, tasks) => {
            if(err) {
                res.json(err);
            }
            res.render('tasks/index', {tasks});
        })
    })
    
});


router.get('/create',(req, res) => {
    res.render('tasks/create');
});

router.post('/create',(req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO tasks SET ?', [data], (err, rows) => {
        res.redirect('/tasks');
        })
    });
    
});

router.post('/tasks/delete',(req, res) => {
    const id = req.body.id;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM tasks WHERE id = ?', [id], (err, rows) => {
            res.redirect('/tasks');
        })
        conn.query('SELECT * FROM tasks', (err, tasks) => {
            if(tasks.length == 0) {
                conn.query('TRUNCATE TABLE tasks')
            }
            
        })
    });

});

router.get('/tasks/edit/:id',(req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tasks WHERE id = ?', [id], (err, tasks) => {
            if(err) {
                res.json(err);
            }
            res.render('tasks/edit', {tasks});
        })
    })
    
});

router.post('/tasks/edit/:id',(req, res) => {
    const id = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE tasks SET ? WHERE id = ?', [data, id], (err, rows) => {
            res.redirect('/tasks')
        })
    })
});

module.exports = router;