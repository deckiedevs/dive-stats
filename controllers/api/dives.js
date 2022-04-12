const router = require('express').Router();
const { Dive } = require('../../models/');

router.get('/', async (req, res) => {
    const { rows } = await Dive.getLatest();
    res.json(rows);
});

router.get('/stats', async (req, res) => {
    if (req.query.data != 'most_active_month') {
        return res.status(404).end();
    }
    const { rows } = await Dive.getActiveMonth();
    res.json(rows[0]);
});

router.post('/', async (req, res) => {
    try {
        const { rows } = await Dive.create(req.body);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;