import config from '../../config';

const welcomeEmail = verificationToken =>
  `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"     http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <body>
        <div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>
        <div style='background-color: #f2f2f2; padding: 45px;'>
        <div style='background-color: #ffffff; padding: 40px; text-align: center;'>
        <p style='color: #5f5f5f;'>Click the big button below to activate your account.</p>
        <a href="${config.siteUrl}/account/verify/${verificationToken}"
        style='background-color: #288feb; color: #fff;
        padding: 14px; text-decoration: none; border-radius: 5px;
        margin-top: 20px; display: inline-block;'>Activate Account</a>
        </div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>BoldrCMS Team</h3></div></div>
      </body>
    </html>
  `;

const forgotPasswordEmail = verificationToken =>
  `
    <div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>
    <div style='background-color: #f2f2f2; padding: 45px;'>
    <div style='background-color: #ffffff; padding: 40px; text-align: center;'>
    <p style='color: #5f5f5f;'>Click the big button below to finish resetting your password.</p>
    <a href="${config.siteUrl}/account/reset-password/${verificationToken}"
    style='background-color: #288feb; color: #fff;
    padding: 14px; text-decoration: none; border-radius: 5px;
    margin-top: 20px; display: inline-block;'>Reset password</a>
    </div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>BoldrCMS Team</h3></div></div>
  `;

const passwordModifiedEmail = user =>
  `
    <div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>
    <div style='background-color: #f2f2f2; padding: 45px;'>
    <div style='background-color: #ffffff; padding: 40px; text-align: center;'>
    <p style='color: #5f5f5f;'>Click the big button below to activate your account.</p>
    style='background-color: #288feb; color: #fff;
    padding: 14px; text-decoration: none; border-radius: 5px;
    margin-top: 20px; display: inline-block;'>Activate Account</a>
    </div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>BoldrCMS Team</h3></div></div>
  `;

export { welcomeEmail, forgotPasswordEmail, passwordModifiedEmail };
