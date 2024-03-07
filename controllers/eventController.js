const Event=require('../models/Event')



//create new event
const createEvent=async(req,res)=>{
    try{
        const { nom, description, date, lieu, affiche } = req.body;
      const newEvent = new Event({ nom, description, date, lieu, affiche });
      await newEvent.save();
      const allEvents = await Event.find();
      res.status(201).send({allEvents});
    }catch(error) {
        res.status(400).send({ error: error.message });
      }
};

//get all events : 
const getAllEvents=async(req,res)=>{
    try{
        const events=await Event.find();
        res.send(events)
    }catch(error){
        res.status(500).send({error:error.message});

    }
};

//get event by id
const getEventById = async(req,res)=>{
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).send({ error: 'Event not found' });
        }
        res.send(event);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    };

//update Events
const updateEvent = async (req, res) => {
    try {
      const { nom, description, date, lieu, affiche } = req.body;
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        { nom, description, date, lieu, affiche },
        { new: true }
      );
      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

//delete Event :
const deleteEvent = async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
      const allEvents = await Event.find();
      res.send({allEvents});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports={
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent

}
