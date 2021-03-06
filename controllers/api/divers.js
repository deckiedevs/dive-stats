const router = require('express').Router();
const { Diver } = require('../../models');

router.get('/', async (req, res) => {
    const { rows } = await Diver.getAll();
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const { rows } = await Diver.getOne({
        id: req.params.id
    });

    res.json(rows[0] || {});
});

router.get('/:id/stats', async (req, res) => {
    if (req.query.data != 'total_dives') {
        return res.status(400).end();
    }

    const { rows } = await Diver.getTotalDives({
        id: req.params.id
    });

    res.json(rows[0] || {});
});

router.post('/', async (req, res) => {
    try {
        const { rows } = await Diver.create(req.body);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;