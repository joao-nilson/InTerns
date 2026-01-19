const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['mandatory', 'desirable'],
    required: true
  }
});

const jobSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contactEmail: String, 
  regime: {
    type: String,
    enum: ['Presencial', 'Remoto', 'Híbrido'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  tags: [tagSchema],
  postedBy: {
    type: Number,
    ref: 'User',
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

jobSchema.virtual('postedAtRelative').get(function() {
  const now = new Date();
  const diffMs = now - this.postedAt;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Agora mesmo";
  if (diffDays === 1) return "Há 1 dia";
  if (diffDays < 7) return `Há ${diffDays} dias`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "Há 1 semana" : `Há ${weeks} semanas`;
  }
  return `Há ${Math.floor(diffDays / 30)} meses`;
});

module.exports = mongoose.model('Job', jobSchema);