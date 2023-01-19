const nodemailer = require("nodemailer");
const User = require("../models/User");
const mjml2html = require("mjml");

const ticketsMail = `<mjml version="3.3.3">
<mj-head>
  <mj-font
    name="Satisfy"
    href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
  ></mj-font>
</mj-head>
<mj-body
  background-color="#F4F4F4"
  color="#55575d"
  font-family="Arial, sans-serif"
>
  <mj-section
    background-color="#02054B"
    background-repeat="repeat"
    padding="20px 0"
    text-align="center"
    vertical-align="top"
  >
    <mj-column>
      <mj-text
        align="center"
        color="white"
        font-family="Arial, sans-serif"
        font-size="14px"
        line-height="28px"
        padding="0px 25px 0px 25px"
      >
        Maz Festival
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="white" padding="30px 0 20px">
    <mj-column>
      <mj-text
        align="center"
        font-size="28px"
        font-family="'Satisfy', sans-serif"
        mj-class="headline-text"
      >
        Confirmation de Paiement
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section
    background-color="#ffffff"
    background-repeat="repeat"
    background-size="auto"
    padding="20px 0px 20px 0px"
    text-align="center"
    vertical-align="top"
  >
    <mj-column>
      <mj-text
        align="left"
        color="#55575d"
        font-family="Arial, sans-serif"
        font-size="14px"
        line-height="28px"
        padding="0px 25px 0px 25px"
      >
        Cher(e) Maziste, <br />
        <br />
        Ton paiement pour l'achat de ton billet pour le Maz Festival a bien été reçu. Nous sommes super heureux et fiers de la confiance que tu places en nous pour préparer un week-end de zinzin !<br />
        <br />          
        Tu peux aussi nous suivre sur les réseaux sociaux pour être au courant de toutes les dernières informations, la timetable, les activités. Si t'as des questions ou des préoccupations, n'hésites pas à nous contacter sur cette adresse mail.
        <br />
        <br />
        Le Maz reste un festival participatif, alors si tu as des idées, des envies, des compétences, n'hésites pas à nous contacter.
        <br />
        <br />
        Merci encore pour ton soutien au Maz Festival. Nous espérons te voir bientôt !<br />
        <br />
      </mj-text>
      <mj-text
        align="center"
        font-size="28px"
        font-family="'Satisfy', sans-serif"
        mj-class="headline-text"
      >
        Maz Festival
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section
    background-color="#02054B"
    background-repeat="repeat"
    padding="20px 0"
    text-align="center"
    vertical-align="top"
  ></mj-section>
</mj-body>
</mjml>;`;

const ticketsMailHtml = mjml2html(ticketsMail).html;

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
    html: ticketsMailHtml,
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