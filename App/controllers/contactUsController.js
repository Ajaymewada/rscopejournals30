const Contactinfo = require("../Modals/saveContactModel"); // Replace with the correct path to your Mongoose model

async function savecontact(req, res) {
  try {
    // console.log(req.body);
    // const savecontactData = req.body;
    let existingContact = await Contactinfo.findOne();

    if (existingContact) {
      existingContact.contactDetails = req.body.name;
      existingContact.description = req.body.description;
      existingContact.keywords = req.body.keywords;
      existingContact.metatitle = req.body.metatitle;
      await existingContact.save();
      res.json({ message: 'Contact Details Updated Successfully' });
    } else {
      const newDocument = new Contactinfo({
        contactDetails: req.body.name,
        description: req.body.description,
        keywords: req.body.keywords,
        metatitle: req.body.metatitle,
      });
      await newDocument.save();
      res.json({ message: 'New Contact Details Created Successfully' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the contact" });
  }
}

async function getsavecontact(req, res) {
  try {
    Contactinfo.findOne({}, (err, doc) => {
      if (err) {
        res.status(500).json({
          msg: "Data not found!",
          status: false,
        });
      } else {
        res.status(200).json({
          msg: "Data found!",
          data: doc,
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      msg: "Data not found!",
      status: false,
    });
  }
}

module.exports = {
  savecontact,
  getsavecontact,
};
