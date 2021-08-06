module.exports = ({ resetPasswordURL }) => ({
    subject: 'Reset your password',
    body: `
    <div style="width: 100%; padding: 40px 40px; border-top: 1px solid #ECE7DF; color: #060C3B; box-sizing: border-box;">
        <p style="font-weight: normal; font-size: 18px; line-height: 39px; color: #060C3B; margin-bottom: 50px;">Dear
            Customer,</br> You have reset your password and an email has been sent to reset your password. Please click the
            button below to finish resetting your password.</p>
        <table class="container hero-subheader" border="0" cellpadding="0" cellspacing="0" width="100%"
            style="width: 100%; padding: 10px 40px 50px 40px;">
            <tbody>
                <tr>
                    <td style="font-size: 16px; line-height: 27px; color: #060C3B; font-weight: 700; padding: 0 0 0px 0;"
                        align="center"><a class="primery_button" href="${resetPasswordURL}" style="background:
                            #00D184; border-radius: 30px; border: 0; outline: 0; padding: 12px 26px; font-weight: 400;
                            color: #fff; font-size: 16px; display: inline-block; min-width: 120px; text-align: center;
                            line-height: 1.42857143; cursor: pointer; margin-bottom: 20px;">Reset Password</a></td>
                </tr>
            </tbody>
        </table>
    </div>
`,
});
