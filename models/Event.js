const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    nom: String,
    description: String,
    date: Date,
    lieu: String,
    affiche: String
  });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;