const express = require('express');
const addNote = require('../controllers/notes/AddNote');
// const deleteBlog = require('../controllers/notes/deleteBlog');
const editNote = require('../controllers/notes/editNote');
const getNotes = require('../controllers/notes/getAllNote');
// const getAllCategory = require('../controllers/notes/getAllCategory');
const getNoteById = require('../controllers/notes/getNoteById');
const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

router.get('/', ensureToken, getNotes);
router.post('/add', ensureToken, addNote);
router.put('/:id', ensureToken, editNote);
router.get('/:id', ensureToken, getNoteById);

module.exports = router;
