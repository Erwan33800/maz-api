const nodemailer = require("nodemailer");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PWD,
  },
});

module.exports.sendEmails = (req, res) => {
  const users = req.body.users; // Récupérez les utilisateurs envoyés depuis le front-end

  // Préparez l'objet mailOptions avec les options de l'e-mail
  const mailOptions = {
    from: "Maz Festival",
    to: users.map((user) => user.email).join(","),
    subject: "Confirmation de paiement",
    text: "Bien ouej mon pôte, tu viens de valider ta place pour le MAZ Festival 3e édition !",
  };

  // Envoyez l'e-mail en utilisant nodemailer
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      res.status(500).send(error);
    } else {
      await User.updateMany(
        { email: { $in: users.map((user) => user.email) } },
        { $set: { hasPayed: true } }
      );

      res.send({ message: "Emails sent" });
    }
  });
};
