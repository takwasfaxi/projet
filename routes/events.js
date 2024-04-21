const express=require('express');
const eventController = require('../controllers/eventController')
const authenticate=require('../middleware/authenticate')
const router=express.Router();

// Create (POST)
router.post('/create', eventController.createEvent);

// GET all
router.get('/all', eventController.getAllEvents);

// Read (GET by ID)
router.get('/:id', eventController.getEventById);

//update Event
router.put('/:id',authenticate,eventController.updateEvent);


//delete Event:
router.delete('/:id',authenticate,eventController.deleteEvent);
//participer à un event (citoyen)
router.post('/events/:id/users/:id')

module.exports=router;