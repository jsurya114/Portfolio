const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 80,
  },
  role: {
    type: String,
    trim: true,
    maxlength: 100,
    default: '',
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: 500,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Testimonial', testimonialSchema)
