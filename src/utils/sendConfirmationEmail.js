import axios from 'axios';

export const sendConfirmation = async (dest, username) => {
  await axios.post('/api/sendEmail', {
    dest,
    title: 'OMS Invoicer registration succeed!',
    body: `
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="x_bodyTable" style="border-collapse:collapse; height:100%; margin:0; padding:0; width:100%; background-color:#FAFAFA">
  <tbody>
    <tr>
      <td align="center" valign="top" id="x_bodyCell" style="height:100%; margin:0; padding:10px; width:100%; border-top:0">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; border:0; max-width:600px!important">
          <tbody>
            <tr>
              <td valign="top" id="x_templatePreheader" style="background:#FAFAFA none no-repeat center/cover; background-color:#FAFAFA; background-image:none; background-repeat:no-repeat; background-position:center; background-size:cover; border-top:0; border-bottom:0; padding-top:9px; padding-bottom:9px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%; border-collapse:collapse">
                  <tbody>
                    <tr>
                      <td valign="top" style="padding-top:9px">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%; min-width:100%; border-collapse:collapse"></table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td valign="top" id="x_templateHeader" style="background:#FFFFFF none no-repeat center/cover; background-color:#FFFFFF; background-image:none; background-repeat:no-repeat; background-position:center; background-size:cover; border-top:0; border-bottom:0; padding-top:9px;  padding-bottom:0">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%; border-collapse:collapse">
                  <tbody>
                    <tr>
                      <td valign="top" style="padding:9px">
                        <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" style="min-width:100%; border-collapse:collapse">
                          <tbody>
                            <tr>
                              <td valign="top" style="padding-right:9px; padding-left:9px; padding-top:0; padding-bottom:0; text-align:center"><img data-imagetype="External" src="https://omsinvoicer.netlify.app/logo192.png" align="center" alt="" width="100" style="max-width:1182px; padding-bottom:0; display:inline!important; vertical-align:bottom; border:0; height:auto; outline:none; text-decoration:none"> </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td valign="top" id="x_templateBody" style="background:#FFFFFF none no-repeat center/cover; background-color:#FFFFFF; background-image:none; background-repeat:no-repeat; background-position:center; background-size:cover; border-top:0; border-bottom:2px solid #EAEAEA; padding-top:0; padding-bottom:9px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%; border-collapse:collapse">
                  <tbody>
                    <tr>
                      <td valign="top" style="padding-top:9px">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%; min-width:100%; border-collapse:collapse">
                          <tbody>
                            <tr>
                              <td valign="top" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px; word-break:break-word; color:#202020; font-family:Helvetica; font-size:16px; line-height:150%; text-align:left">
                                <h1 style="text-align:center; display:block; margin:0; padding:0; color:#202020; font-family:Helvetica; font-size:26px; font-style:normal; font-weight:bold; line-height:125%; letter-spacing:normal">HELLO ${username}!&nbsp;</h1>
                                <p style="text-align:center; margin:10px 0; padding:0; color:#202020; font-family:Helvetica; font-size:16px; line-height:150%">You just have created an account on <a href='https://omsinvoicer.netlify.app/'>OMS INVOICER</a>.
                                  Keep in mind that this app was created only for learning purposes and it SHOULD NOT be used for real life invoicing.
                                  Thank you for understanding ❤️&nbsp;</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%; border-collapse:collapse">
                  <tbody>
                    <tr>
                      <td valign="top" align="center" style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate!important; border-radius:4px; background-color:#446DF6; ">
                          <tbody>
                            <tr>
                              <td align="center" valign="middle" style="font-family:Arial; font-size:18px; padding:20px"><a href="https://omsinvoicer.netlify.app/" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" title="OMS INVOICER" style="font-weight:bold; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color: #ffffff; display:block">Visit OMS INVOICER</a> </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%; border-collapse:collapse; table-layout:fixed!important">
                  <tbody>
                    <tr>
                      <td style="min-width:100%; padding:18px">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%; border-top:2px solid #446df6; border-collapse:collapse">
                          <tbody>
                            <tr>
                              <td style=""><span></span></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%; border-collapse:collapse">
                  <tbody>
                    <tr>
                      <td valign="top" style="padding-top:9px">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%; min-width:100%; border-collapse:collapse">
                          <tbody>
                            <tr>
                              <td valign="top" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px; word-break:break-word; color:#202020; font-family:Helvetica; font-size:16px; line-height:150%; text-align:left">
                                <div style="text-align:center">
                                  <p>I would be really grateful for your feedback! You can catch me through my <a href='https://mateuszgruzla.pl/'>website</a>.</p>
                                  <p>Thank you for visiting! Have a wonderful day!</p>
                                  <p>Best regards,</p>
                                  <p>Mateusz Gruźla</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
    `,
  });
};
