const { getField, createField, updateField, deleteField } = require('../controllers/field')
const router = require('express').Router()

router.route('/').get(getField).post(createField)
router.route('/:id').put(updateField).delete(deleteField)

module.exports = router