var express = require('express');
var router = express.Router();
const multer = require('multer');
var JournalController = require("../../App/controllers/Journal");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './Public/Journal/CoverBanner')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({
//     storage: storage
// })

router.post('/saveJournal', JournalController.saveJournal);
router.get('/App/controllers/Journal/getAllJournals', JournalController.getAllJournals);
router.get('/App/controllers/Journal/:JournalId', JournalController.findJournalById);

module.exports = router;