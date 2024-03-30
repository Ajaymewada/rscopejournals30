const Journal = require("../Modals/Journal");

// Function to save a new journal
async function saveJournal(req, res) {
  let journalData = req.body;
  journalData = await formateObject(journalData, req);
  console.log("journalData : ", journalData);
  try {
    const journal = new Journal(journalData);
    const savedJournal = await journal.save();
    console.log("savedJournal : ", savedJournal);
    res.status(201).json({
      message: "Journal created successfully",
      savedJournal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed To Create Journal",
    });
  }
}

function formateObject(journalData, req) {
  return new Promise((resolve, reject) => {
    try {
      if (journalData && journalData.keywords) {
        journalData.metadata = {
          title: journalData.JournalName,
          keywords: JSON.parse(journalData.keywords),
          description: journalData.description,
        };
        journalData.isActive = true;
      }
      // if (req.file) {
      //     journalData.CoverBanner = {
      //         filename: req.file.filename,
      //         path: `Journal/CoverBanner/${req.file.filename}`,
      //         uploadDate: new Date()
      //     };
      // }
      delete journalData.keywords;
      delete journalData.description;
      resolve(journalData);
    } catch (error) {
      resolve(null);
    }
  });
}

async function findJournalById(req, res) {
  const { JournalId } = req.params;
  if (JournalId) {
    try {
      let journalDoc = await Journal.findById(JournalId);
      if (journalDoc) {
        res.status(200).json({
          status: true,
          msg: "Found Journal!",
          journal: journalDoc,
        });
      } else {
        res.status(500).json({
          status: false,
          msg: "Failed in Finding The Journal!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: "Failed in Finding The Journal!",
      });
    }
  }
}

async function getAllJournals(req, res) {
  try {
    let JournalDocs = await Journal.find({});
    if (JournalDocs) {
      res.status(200).json({
        status: true,
        msg: "data found!",
        data: JournalDocs,
      });
    } else {
      res.status(500).json({
        status: false,
        msg: "data not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "data not found!",
      error,
    });
  }
}

module.exports = { saveJournal, findJournalById, getAllJournals };
