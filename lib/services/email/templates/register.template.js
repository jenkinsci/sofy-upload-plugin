module.exports = ({ emailVerificationURL }) => ({
    subject: 'Welcome to Sofy',
    body: `
    <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; padding:
    20px 40px; border-bottom: 1px solid #ECE7DF;">
    <tr>
    <td style="padding: 0px 0 30px 0;" colspan="2">
    <p style="font-weight: normal; font-size: 18px; line-height: 39px; color: #060C3B; margin-bottom: 50px;">Thank
    you for signing up for the Sofy Trial. During your 14-day trial, we hope you enjoy your tour of all that Sofy
    has to offer.</p>
    <ul class="custom-bullet">
    <li>Test your app using real devices.</li>
    <li>Perform manual testing and get automatic reports emailed to you instantly.</li>
    <li>Record a no-code automated test without writing a single line of code and run it on hundreds of devices.
    </li>
    </ul>
    <p style="font-weight: normal; font-size: 18px; line-height: 39px; color: #060C3B; margin-bottom: 10px;">You can
    either take a product tour to understand the various capabilities of Sofy or start creating your first test to
    see for yourself how simple testing your app with Sofy can be.</p>
    <p style="font-weight: normal; font-size: 18px; line-height: 39px; color: #060C3B; margin-bottom: 10px;">But
    first, we need you to confirm your email address with us.</p><a
    href="${emailVerificationURL}" 
    style="background: #00D184; padding: 18px 53px;
          box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12); border-radius: 30px; margin: 20px 0; display: inline-block; color:
          #FFF; text-decoration: none;">Confirm my email</a>
    </td>
    </tr>
    </table>
    <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; padding:
    20px 40px;">
    <tr>
    <td class="hero-subheader__title" style="font-size: 26px; font-weight: 700; color: #3b465a; padding: 10px 0 0px
        0;" align="center">
    <h4 style="font-weight: 800; font-size: 19px; line-height: 26px; text-align: center; color: #6EBBFD;
          margin-bottom: 0;">Make the most of your 14-day trial</h4>
    </td>
    </tr>
    <tr>
    <td class="hero-subheader__content" style="font-size: 16px; line-height: 27px; color: #696969; padding: 0 0 10px
        0;" align="center">
    <p style="font-weight: normal; font-size: 18px; line-height: 36px; text-align: center; color: #060C3B;">Sofy is
    a modern no-code automation platform that uses AI to enable “create once and run anywhere” tests without writing
    a single line of code. Using our library of real devices, you can run manual, automated and exploratory tests on
    your mobile applications and websites.</p><a href="https://sofy.ai/" style="font-weight: 800; font-size:
          15px; line-height: 34px; color: #00B975; text-decoration: none;"><img alt="Embedded Image" width="13"
      height="9"
      src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/action-arrow-icon.png" /></a>
    </td>
    </tr>
    </table>
    <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; padding:
    20px 40px 56px 40px;">
    <tr>
    <td>
    <!-- empty td -->
    </td>
    <td style="text-align: right;"> <img width="328" height="185"
    src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/manual-test.png" alt=""></td>
    </tr>
    <tr>
    <td colspan="2">
    <div style="width: 60%; margin-top: 20px; margin-bottom: 40px;">
    <h5 style="font-weight: 900; font-size: 14px; line-height: 20px; text-transform: uppercase; color: #060C3B;
            margin-bottom: 10px;">Create your first Test</h5>
    <p style="font-weight: normal; font-size: 14px; line-height: 27px; color: #01041C;">Get a guided experience on
      how to run your first manual test with a real device using Sofy. We’ll take you through the manual testing
      process, show you some auto generated test results, and then convert everything with a single click so you can
      see it run automatically without writing any code or making changes to your script.</p>
    </div>
    </td>
    </tr>
    <tr>
    <td> <img width="325" height="273"
    src="http://portalvhdsld5gs9t7pkkvf.blob.core.windows.net/sofyimgassets/dashboard-tour-icon.png" alt="">
    </td>
    <td style="padding: 0 0px 0 20px; text-align: right;">
    <h5 style="font-weight: 900; font-size: 14px; line-height: 20px; text-transform: uppercase; color: #060C3B;
          margin-bottom: 10px;">Take a guided tour of Sofy</h5>
    <p style="font-weight: normal; font-size: 14px; line-height: 27px; color: #01041C;">We’ll show you around Sofy
    so you can get a bird’s-eye view at what it does and how it works. You’ll get a quick understanding of all the
    key concepts so you can start testing your app in minutes.</p>
    </td>
    </tr>
    </table>
`,
});
