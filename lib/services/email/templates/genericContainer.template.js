/* eslint-disable max-len */
module.exports = ({ body, subject }) => (`
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sofy</title>
    <style type="text/css">
      /* ----- Custom Font Import ----- */
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,200&display=swap');

      .logo {
        margin: 38px auto 45px auto;
      }

      table {
        font-family: 'Noto Sans TC', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
      }

      * {
        font-family: 'Noto Sans TC', sans-serif;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Nunito Sans', sans-serif;
      }

      .full-width-container {
        padding: 0 !important;
      }

      .custom-bullet li {
        margin-bottom: 14px;
        float: none;
        font-size: 18px;
        line-height: 26px;
        color: #060C3B;
      }
    </style>

  </head>

  <body style="padding: 0; margin: 0; background: #00D184; font-family: 'Noto Sans TC', Arial, sans-serif !important;">
    <!-- <span style="color:transparent !important; overflow:hidden !important; display:none !important; line-height:0px !important; height:0 !important; opacity:0 !important; visibility:hidden !important; width:0 !important; mso-hide:all;">This is your preheader text for this email (Read more about email preheaders here - https://goo.gl/e60hyK)</span> -->
    <!-- / Full width container -->
    <table class="full-width-container" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"
      bgcolor="#00D184" style="width: 100%; height: 100%; padding: 30px 0 30px 0;">
      <tr>
        <td align="center" valign="top">
          <div class="logo">

            <img alt="Embedded Image" width="86" height="38"
              src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/logo-sofy-white.png" />
          </div>
        </td>
      </tr>
      <tr>
        <td align="center" valign="top">
          <!-- / 580 container -->
          <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#FCFAF8"
            style="width: 100%; max-width: 620px; border-radius: 8px; box-shadow: 0 35px 50px -30px rgba(0,0,0,0.3);">
            <tr>
              <td align="center" valign="top">
                <!-- / Header -->
                <table class="container header" border="0" cellpadding="0" cellspacing="0" width="100%"
                  style="width: 100%; padding: 20px 40px;">
                  <tr>
                    <td>
                      <h2
                        style="font-weight: 800; font-size: 42px; line-height: 52px; color: #060C3B; margin: 52px 0 10px 0;">
                        ${subject}</h2>
                    </td>
                    <td style="text-align: right;">

                      <img width="85" height="100"
                        src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/sofy-icon.png" alt="">
                    </td>
                  </tr>
                </table>
                <!-- /// Header -->
                <!-- / Content -->
                <div>
                  ${body}

                </div>

                <!-- /// Content -->
                <!-- / Footer -->
                <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                  <tr>
                    <td align="center">
                      <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
                        style="border-top: 1px solid #ECE7DF; width: 100%; padding: 20px 40px;">
                        <tr>
                          <td style="text-align: center;">
                            <h6
                              style="font-weight: 600; font-size: 18px; line-height: 26px; text-align: center; color: #060C3B; margin: 30px 0 0px 0; font-family: Noto Sans TC;">
                              Need help? Check out
                              <a href="https://docs.sofy.ai/"
                                style="font-family: Noto Sans TC; font-weight: 600; font-size: 18px; line-height: 26px; text-align: center; color: #00B975; text-decoration: none;">our
                                documentation</a>.
                            </h6>
                          </td>
                        </tr>

                        <tr>
                          <td style="text-align: center; padding: 10px 0 10px 0;">
                            <p
                              style="font-weight: 300; font-size: 16px; line-height: 28px; text-align: center; color: #060C3B; mix-blend-mode: normal; opacity: 0.7;">
                              Sofy: The modern no-code testing platform for engineers.</p>
                          </td>
                        </tr>

                        <tr>
                          <td align="middle">
                            <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%"
                              align="center" style="width: 100%;">
                              <tr>
                                <td align="center" style="padding: 10px 0 30px 0; text-align: center;">
                                  <a href="https://twitter.com/sofydotai"
                                    style="display: inline-block; margin-right: 12px; margin-left: 12px;">
                                    <img alt="Embedded Image" width="16" height="13"
                                      src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/twitter-icon.png" />
                                  </a>
                                  <a href="https://www.linkedin.com/company/quantyzd.com"
                                    style="display: inline-block; margin-right: 12px; margin-left: 12px;">
                                    <img alt="Embedded Image" width="16" height="16"
                                      src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/linkedin-icon.png" />
                                  </a>
                                  <a href="https://www.facebook.com/sofydotai"
                                    style="display: inline-block; margin-right: 12px; margin-left: 12px;">
                                    <img alt="Embedded Image" width="16" height="16"
                                      src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/facebook-icon.png" />
                                  </a>
                                  <a href="https://www.youtube.com/channel/UCf3u5M-VRFHNpMLMnPI1xTA"
                                    style="display: inline-block; margin-right: 12px; margin-left: 12px;">
                                    <img alt="Embedded Image" width="19" height="15"
                                      src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/youtube-icon.png" />
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- /// Footer -->
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" valign="top">
          <div class="footer" style="margin: 60px 20px 50px 20px;">
            <p
              style="font-weight: 300; font-size: 16px; line-height: 19px; text-align: center; color: #FCFAF8; margin: 8px 0;">
              Copyright © Sofy.AI 2021. All right reserved.</p>
            <!-- <p style="font-weight: 300; font-size: 16px; line-height: 19px; text-align: center; color: #FCFAF8; margin: 6px 0;">Don't want to receive further emails from us? <a href="https://sofy.ai/" style="color: #FFF;">Opt out here</a>.</p> -->
          </div>
        </td>
      </tr>
    </table>
  </body>

  </html>`
);
