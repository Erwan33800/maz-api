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
</mj-body>
</mjml>`;

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
    html: `
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

  </style>
  <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
  <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css2?family=Satisfy&display=swap);

  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }

  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }

  </style>
  <style type="text/css">
  </style>
  <style type="text/css">
  </style>
</head>

<body style="word-spacing:normal;background-color:#F4F4F4;">
  <div style="background-color:#F4F4F4;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#02054B" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#02054B;background-color:#02054B;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#02054B;background-color:#02054B;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:0px 25px 0px 25px;word-break:break-word;">
                        <div style="font-family:Arial, sans-serif;font-size:14px;line-height:28px;text-align:center;color:white;">Maz Festival</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="white" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:white;background-color:white;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:white;background-color:white;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:30px 0 20px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Satisfy', sans-serif;font-size:28px;line-height:1;text-align:center;color:#000000;">Confirmation de Paiement</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;word-break:break-word;">
                        <div style="font-family:Arial, sans-serif;font-size:14px;line-height:28px;text-align:left;color:#55575d;">Cher(e) Maziste, <br />
                          <br /> Ton paiement pour l'achat de ton billet pour le Maz Festival a bien été reçu. Nous sommes super heureux et fiers de la confiance que tu places en nous pour préparer un week-end de zinzin !<br />
                          <br /> Tu peux aussi nous suivre sur les réseaux sociaux pour être au courant de toutes les dernières informations, la timetable, les activités. Si t'as des questions ou des préoccupations, n'hésites pas à nous contacter sur cette adresse mail. <br />
                          <br /> Le Maz reste un festival participatif, alors si tu as des idées, des envies, des compétences, n'hésites pas à nous contacter. <br />
                          <br /> Merci encore pour ton soutien au Maz Festival. Nous espérons te voir bientôt !<br />
                          <br />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Satisfy', sans-serif;font-size:28px;line-height:1;text-align:center;color:#000000;">Maz Festival</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#02054B" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#02054B;background-color:#02054B;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#02054B;background-color:#02054B;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>`,
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
