const express = require('express')
const router = express.Router()
const Testimonial = require('../models/Testimonial')

// GET all approved testimonials (newest first)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(20)
    
    // Calculate average rating
    const allTestimonials = await Testimonial.find({ approved: true })
    const avgRating = allTestimonials.length > 0
      ? (allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length).toFixed(1)
      : 0
    
    res.json({
      success: true,
      data: testimonials,
      meta: {
        total: allTestimonials.length,
        averageRating: parseFloat(avgRating),
      },
    })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch testimonials' })
  }
})

// POST a new testimonial
router.post('/', async (req, res) => {
  try {
    const { name, role, message, rating } = req.body

    if (!name || !message || !rating) {
      return res.status(400).json({ success: false, error: 'Name, message, and rating are required' })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, error: 'Rating must be between 1 and 5' })
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      role: role ? role.trim() : '',
      message: message.trim(),
      rating: Math.round(rating),
    })

    res.status(201).json({ success: true, data: testimonial })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message)
      return res.status(400).json({ success: false, error: messages.join(', ') })
    }
    res.status(500).json({ success: false, error: 'Failed to submit testimonial' })
  }
})

module.exports = router
