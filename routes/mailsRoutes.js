const express = require("express");
const router = express.Router();
const mailsController = require("../controllers/mailBilletController");

router.post("/mails-billet", mailsController.sendEmails);

module.exports = router;
