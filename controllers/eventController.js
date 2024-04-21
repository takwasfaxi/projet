const Event=require('../models/Event')



//create new event(admin)
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

//consulter liste des evenements (citoyen/admin): 
const getAllEvents=async(req,res)=>{
    try{
        const events=await Event.find();
        res.send(events)
    }catch(error){
        res.status(500).send({error:error.message});

    }
};

//consulter les details d'un evenements (citoyen/admin):
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

//modifier un evenement(admin)
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

//delete Event (admin) :
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

  //participer à un evènement (citoyen)
  const addUserToEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.params.id);
    if (!event || !user) return res.status(404).json({ message: 'Event or user not found' });

    event.participants.push(user._id);
    user.events.push(event._id);

    await event.save();
    await user.save();

    res.json({ message: 'User added to event successfully' });
};

module.exports={
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    addUserToEvent

}
