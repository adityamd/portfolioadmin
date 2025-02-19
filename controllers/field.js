const fieldModel = require('../models/field');
const asyncHandler = require('express-async-handler');

// @desc    Get the field
// @route   GET /api/field
// @access  Public
const getField = asyncHandler(async (req, res) => {
    try {
        const fields = await fieldModel.find()

        res.status(201).json(fields)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.message })
    }
})

// @desc    Create a field
// @route   POST /api/field
// @access  Private
const createField = asyncHandler(async (req, res) => {
    try {
        const createdField = fieldModel.create(req.body)

        res.status(201).json(createdField)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.message })
    }
})

// @desc    Update a field
// @route   PUT /api/field/:id
// @access  Private
const updateField = asyncHandler(async (req, res) => {
    try {
        const field = await fieldModel.findById(req.params.id)

        if (field) {
            field.allFields = req.body.allFields

            const updatedField = await field.save()
            res.status(201).json(updatedField)
        } else {
            res.status(404).json({ message: 'Field not found' })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.message })
    }
})

// @desc    Delete a field
// @route   DELETE /api/field/:id
// @access  Private
const deleteField = asyncHandler(async (req, res) => {
    try {
        const field = await fieldModel.findById(req.params.id)

        if (field) {
            await field.remove()
            res.status(201).json({ message: 'Field removed' })
        } else {
            res.status(404).json({ message: 'Field not found' })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.message })
    }
})

module.exports = { getField, createField, updateField, deleteField }