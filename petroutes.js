const express = require('express');
const router = express.Router();
const { getPets, createPet, updatePet, deletePet } = require('../controllers/petController');
const auth = require('../middleware/auth');

router.get('/', getPets);
router.post('/', auth, createPet);
router.put('/:id', auth, updatePet);
router.delete('/:id', auth, deletePet);

module.exports = router;
