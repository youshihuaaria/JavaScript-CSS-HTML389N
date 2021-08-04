/* In this file you will define all the routes for your api.
You will need to define the following routes:
1) /api/v1/contacts
  This route will need to respond to 2 requests:
  1) GET: it will respond with the serialized form of all the
  contacts in your application and a response code of 200
  2) POST: it will respond to a POST request that will generate a 
  new instance of a contact and add it to the in memory collection
  and a response code 201
2) /api/v1/contacts/:id
  This route will need to responde to 3 requests:
  1) GET: it will respond with the serialized form of the requested
  resource and a response code of 200. You will receive the :id from 
  the req.params.id property
  2) PUT: it will update the resource with the information attached in
  the req.query property. Note: query params end at the end of the route,
  and all come after the ? character and are combined with a &.
  For example, if you wanted to update the firstName and lastName properties
  of the contact with an id of 3, the url would be (assuming your server is runing
  on port 3000):
  localhost:3000/api/v1/contacts/3?firstName=NewFirstName&lastName=NewLastName   
  Your route should respond with a 201 response code along with the updated
  resource otherwise 404 with an error message of "unable to update resource".
  3) DELETE: it will remove the contact from the collection with the matching id 
  in the request.params object and respond with a status code of 201 alone with 
  the deleted resource in the response. If the resource is not found the route should
  respond with a 404 error and message "resource not found".  

  Hint: when sending your response you should follow the following examples:
  res.status(404).json({error: 'Contact not found'})  
  res.status(200).json(contacts)
  res.status(201).json(data)  
  */

let express = require('express');
let contactsRouter = express.Router();
var Contact = require('../../../models/contact')
let contacts = [];

/* Define your routes/endpoints here */
contactsRouter.use('/api/v1/contacts', (req, res, next) => {
  next()
})

contactsRouter.use('/api/v1/contacts/:id', (req, res, next) => {
  next()
})

contactsRouter.route('/')
  .get((req, res) => {
    res.status(200).json(contacts)
  })
  .post((req, res) => {
    if (contacts.find(c => c.id == req.body.id)) {
      res.status(403).json({ error: "repeat ID" });
    }
    if (!req.body.firstName || !req.body.lastName || !req.body.phoneNumber || !req.body.email || !req.body.id) {
      res.status(403).json({ error: "Invalid Input" });
    }
    let contact = new Contact(req.body.firstName, req.body.lastName, 
      req.body.phoneNumber, req.body.email, req.body.id);
    contacts.push(contact);
    res.status(201).json(contacts)
  });

/*GET: it will respond with the serialized form of the requested
  resource and a response code of 200. You will receive the :id from 
  the req.params.id property */
contactsRouter.route('/:id')
  .get((req, res) => {
    let contact = contacts.find(c => c.id == req.params.id);
    let index = contacts.indexOf(contact);
    if (!contact) {
      res.status(404).json({ error: "resource not found" });
    } else {
      res.status(200).json(contacts[index]);
    }
  })
  /*it will update the resource with the information attached in
  the req.query property. Note: query params end at the end of the route,
  and all come after the ? character and are combined with a &.
  For example, if you wanted to update the firstName and lastName properties
  of the contact with an id of 3, the url would be (assuming your server is runing
  on port 3000):
  localhost:3000/api/v1/contacts/3?firstName=NewFirstName&lastName=NewLastName   
  Your route should respond with a 201 response code along with the updated
  resource otherwise 404 with an error message of "unable to update resource". */
  .put((req, res) => {
    let contact = contacts.find(c => c.id == req.params.id);
    if (!contact) {
      res.status(404).json({ error: 'unable to update resource' });
    } else {
      contact.firstName = req.body.firstName;
      contact.lastName = req.body.lastName;
      contact.phoneNumber = req.body.phoneNumber;
      contact.email = req.body.email;
      contact.id = req.body.id;
      res.json(contact);
    }
  })
  /*DELETE: it will remove the contact from the collection with the matching id 
  in the request.params object and respond with a status code of 201 alone with 
  the deleted resource in the response. If the resource is not found the route should
  respond with a 404 error and message "resource not found".  */
  .delete((req, res) => {
    let contact = contacts.find(c => c.id == req.params.id);
    if (!contact) {
      res.status(404).json({ error: "resource not found" });
    } else {
      let index = contacts.indexOf(contact);
      contacts.splice(index, 1);
      res.status(201).json(contact)
    }
  })

module.exports = contactsRouter;