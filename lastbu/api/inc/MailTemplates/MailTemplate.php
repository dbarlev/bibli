<?php

Class MailTemplates{
    public $verificationLink;
    public $verificationCode;
    public $email;


    function token_creator($email){
        $token = md5(uniqid($email, true));
        return $token;
    }

    function send_conf_mail_to_user($email, $verificationCode){
		$verificationLink = "https://www.bibli.co.il/mailconf/" . $verificationCode;

	
		$mail = new PHPMailer(true);

		try {
			//Server settings
			$mail->SMTPDebug = 1;                      // Enable verbose debug output
			//$mail->isSMTP();                                            // Send using SMTP
			$mail->Host       = '88.99.217.197';                    // Set the SMTP server to send through
			$mail->SMTPAuth   = false;                                   // Enable SMTP authentication
			$mail->CharSet = 'UTF-8';                                
			$mail->Port       = 587;       
			$mail -> AddAddress($email);                            // TCP port to connect to
		
			//Recipients
			$mail->setFrom('donotreplay@bibli.co.il', 'ביבלי');
			$mail->isHTML(true);
			$mail->Subject = "אישור הרשמה | ביבלי";
			//$mail->Body = $htmlStr;
			$mail->Body = $this::register_confirmation_mail($verificationLink);
			$mail->send();
		
		} catch (Exception $e) {
			echo 'Message could not be sent.';
			echo 'Mailer Error: ' . $mail->ErrorInfo;
		}			
	}

    public function password_recovery_mail($verificationLink){
        

        $msg ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width" name="viewport"/>
        <!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
        <!--<![endif]-->
        <style type="text/css">
            
                body {
                    margin: 0;
                    padding: 0;
                }
        
                table,
                td,
                tr {
                    vertical-align: top;
                    border-collapse: collapse;
                }
        
                * {
                    line-height: inherit;
                    direction: rtl;
                }
        
                a[x-apple-data-detectors=true] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
            </style>
        <style id="media-query" type="text/css">
                @media (max-width: 670px) {
        
                    .block-grid,
                    .col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
        
                    .block-grid {
                        width: 100% !important;
                    }
        
                    .col {
                        width: 100% !important;
                    }
        
                    .col>div {
                        margin: 0 auto;
                    }
        
                    img.fullwidth,
                    img.fullwidthOnMobile {
                        max-width: 100% !important;
                    }
        
                    .no-stack .col {
                        min-width: 0 !important;
                        display: table-cell !important;
                    }
        
                    .no-stack.two-up .col {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
        
                    .no-stack .col.num8 {
                        width: 66% !important;
                    }
        
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
        
                    .no-stack .col.num3 {
                        width: 25% !important;
                    }
        
                    .no-stack .col.num6 {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num9 {
                        width: 75% !important;
                    }
        
                    .video-block {
                        max-width: none !important;
                    }
        
                    .mobile_hide {
                        min-height: 0px;
                        max-height: 0px;
                        max-width: 0px;
                        display: none;
                        overflow: hidden;
                        font-size: 0px;
                    }
        
                    .desktop_hide {
                        display: block !important;
                        max-height: none !important;
                    }
                }
            </style>
        </head>
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #F5F5F5;">
        <!--[if IE]><div class="ie-browser"><![endif]-->
        <table bgcolor="#F5F5F5" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F5F5F5; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#F5F5F5"><![endif]-->
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="10" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 10px; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 25px; padding-top:25px; padding-bottom:25px;"><![endif]-->
        <div class="col num6" style="min-width: 320px; max-width: 325px; display: table-cell; vertical-align: top; width: 325px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:25px; padding-bottom:25px; padding-right: 0px; padding-left: 25px;">
        <!--<![endif]-->
        <div align="left" class="img-container left fixedwidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]--><a href="https://www.bibli.co.il" style="outline:none" tabindex="-1" target="_blank"> <img alt="Image" border="0" class="left fixedwidth" src="https://www.bibli.co.il/api/inc/images/bibli-logo.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; width: 100%; max-width: 195px; display: block;" title="Image" width="195"/></a>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 0px; padding-top:25px; padding-bottom:25px;"><![endif]-->
        <div class="col num6" style="min-width: 320px; max-width: 325px; display: table-cell; vertical-align: top; width: 325px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:25px; padding-bottom:25px; padding-right: 25px; padding-left: 0px;">
        <!--<![endif]-->
        <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="right" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
        <tbody>
        <tr align="right" style="vertical-align: top; display: inline-block; text-align: right;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 0;" valign="top"><a href="https://www.facebook.com/biblio.co.il/" target="_blank"><img alt="Facebook" height="32" src="https://www.bibli.co.il/api/inc/images/facebook2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 0;" valign="top"><a href="mailto:‫contact@bibli.co.il‬" target="_blank"><img alt="E-Mail" height="32" src="https://www.bibli.co.il/api/inc/images/mail2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="E-Mail" width="32"/></a></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #7dd2d5;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#7dd2d5;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#7dd2d5"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#7dd2d5;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top:5px; padding-bottom:60px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:60px; padding-right: 25px; padding-left: 25px;">
        <!--<![endif]-->
        <div align="center" class="img-container center autowidth" style="padding-right: 60px;padding-left: 60px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 60px;padding-left: 60px;" align="center"><![endif]-->
        <div style="font-size:1px;line-height:60px"> </div><img align="center" alt="Image" border="0" class="center autowidth" src="https://www.bibli.co.il/api/inc/images/lostpassowl.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 480px; display: block;" title="Image" width="480"/>
        <div style="font-size:1px;line-height:45px"> </div>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 15px; padding-top: 20px; padding-bottom: 0px; font-family: Arial, sans-serif"><![endif]-->
        <div align="center" style="color:#204160;font-family:"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;line-height:1.5;padding-top:20px;padding-right:10px;padding-bottom:0px;padding-left:15px;">
        <div style="font-size: 12px; line-height: 1.5; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #204160; mso-line-height-alt: 18px;">
        <p style="font-size: 50px; line-height: 1.5; text-align: center; word-break: break-word; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; mso-line-height-alt: 75px; margin: 0;"><span style="font-size: 50px;"><strong><span style="font-size: 50px;"><span style="font-size: 38px;direction:rtl;">שכחת את הסיסמה?</span></span></strong></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div align="center" style="color:#204160;font-family:"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div align="center" style="font-size: 12px; line-height: 1.2; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #204160; mso-line-height-alt: 14px;">
        <p dir="rtl" style="font-size: 17px; line-height: 1.2; text-align: center; word-break: break-word; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;"><span style="font-size: 17px; mso-ansi-font-size: 18px;"><strong>לשחזור הסיסמה יש ללחוץ על הכפתור
        
        </strong></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <div align="center" class="button-container" style="padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:39pt; width:190.5pt; v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#eeb100"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#204160; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]--><a href="'.$verificationLink.'" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #204160; background-color: #eeb100; border-radius: 50px; -webkit-border-radius: 50px; -moz-border-radius: 50px; width: auto; width: auto; border-top: 1px solid #eeb100; border-right: 1px solid #eeb100; border-bottom: 1px solid #eeb100; border-left: 1px solid #eeb100; padding-top: 10px; padding-bottom: 10px; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:40px;padding-right:40px;font-size:16px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>שחזור סיסמה</strong></span></span></a>
        <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
        </div>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div align="center" style="color:#204160;font-family:"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div align="center" style="font-size: 12px; line-height: 1.2; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #204160; mso-line-height-alt: 14px;">
        <p dir="rtl" style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; mso-line-height-alt: 17px; margin: 0;"><strong>בכל שאלה או בקשה, ניתן לפנות אלינו דרך עמוד <a href="https://www.bibli.co.il/contact" target="_blank" style="color:#204160">צור קשר </a> באתר.</strong></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:60px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:20px; padding-bottom:60px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
        <tbody>
        <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 8px; padding-left: 8px;" valign="top"><a href="https://www.facebook.com/biblio.co.il/" target="_blank"><img alt="Facebook" height="32" src="https://www.bibli.co.il/api/inc/images/facebook2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 8px; padding-left: 8px;" valign="top"><a href="mailto:‫contact@bibli.co.il‬" target="_blank"><img alt="E-Mail" height="32" src="https://www.bibli.co.il/api/inc/images/mail2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="E-Mail" width="32"/></a></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
        <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px;">
        <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">NetShop - Lorem ipsum dolor sit amet hasellus sagittis aliquam luctus. </p>
        <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">329 California St, San Francisco, CA 94118</p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px dotted #C4C4C4; height: 0px; width: 60%;" valign="top" width="60%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
        <div style="color:#4F4F4F;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-size: 12px; color: #4F4F4F; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
        <p style="line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"> </p>
        <p style="line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"> </p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (IE)]></div><![endif]-->
        </body>
        </html>';

         return $msg;

    }


    public function register_confirmation_mail($verificationLink){
        

        $msg ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width" name="viewport"/>
        <!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
        <!--<![endif]-->
        <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                }
        
                table,
                td,
                tr {
                    vertical-align: top;
                    border-collapse: collapse;
                }
        
                * {
                    line-height: inherit;
                    direction: rtl;
                }
        
                a[x-apple-data-detectors=true] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
            </style>
        <style id="media-query" type="text/css">
                @media (max-width: 670px) {
        
                    .block-grid,
                    .col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
        
                    .block-grid {
                        width: 100% !important;
                    }
        
                    .col {
                        width: 100% !important;
                    }
        
                    .col>div {
                        margin: 0 auto;
                    }
        
                    img.fullwidth,
                    img.fullwidthOnMobile {
                        max-width: 100% !important;
                    }
        
                    .no-stack .col {
                        min-width: 0 !important;
                        display: table-cell !important;
                    }
        
                    .no-stack.two-up .col {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
        
                    .no-stack .col.num8 {
                        width: 66% !important;
                    }
        
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
        
                    .no-stack .col.num3 {
                        width: 25% !important;
                    }
        
                    .no-stack .col.num6 {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num9 {
                        width: 75% !important;
                    }
        
                    .video-block {
                        max-width: none !important;
                    }
        
                    .mobile_hide {
                        min-height: 0px;
                        max-height: 0px;
                        max-width: 0px;
                        display: none;
                        overflow: hidden;
                        font-size: 0px;
                    }
        
                    .desktop_hide {
                        display: block !important;
                        max-height: none !important;
                    }
                }
            </style>
        </head>
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #F5F5F5;">
        <!--[if IE]><div class="ie-browser"><![endif]-->
        <table bgcolor="#F5F5F5" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F5F5F5; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#F5F5F5"><![endif]-->
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="10" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 10px; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 25px; padding-top:25px; padding-bottom:25px;"><![endif]-->
        <div class="col num6" style="min-width: 320px; max-width: 325px; display: table-cell; vertical-align: top; width: 325px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:25px; padding-bottom:25px; padding-right: 0px; padding-left: 25px;">
        <!--<![endif]-->
        <div align="left" class="img-container left fixedwidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]--><a href="https://www.bibli.co.il" style="outline:none" tabindex="-1" target="_blank"> <img alt="Image" border="0" class="left fixedwidth" src="https://www.bibli.co.il/api/inc/images/bibli-logo.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; width: 100%; max-width: 195px; display: block;" title="Image" width="195"/></a>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 0px; padding-top:25px; padding-bottom:25px;"><![endif]-->
        <div class="col num6" style="min-width: 320px; max-width: 325px; display: table-cell; vertical-align: top; width: 325px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:25px; padding-bottom:25px; padding-right: 25px; padding-left: 0px;">
        <!--<![endif]-->
        <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="right" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
        <tbody>
        <tr align="right" style="vertical-align: top; display: inline-block; text-align: right;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 0;" valign="top"><a href="https://www.facebook.com/biblio.co.il/" target="_blank"><img alt="Facebook" height="32" src="https://www.bibli.co.il/api/inc/images/facebook2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 0;" valign="top"><a href="mailto:‫contact@bibli.co.il‬" target="_blank"><img alt="E-Mail" height="32" src="https://www.bibli.co.il/api/inc/images/mail2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="E-Mail" width="32"/></a></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #7dd2d5;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#7dd2d5;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#7dd2d5"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#7dd2d5;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top:5px; padding-bottom:60px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:60px; padding-right: 25px; padding-left: 25px;">
        <!--<![endif]-->
        <div align="center" class="img-container center autowidth" style="padding-right: 60px;padding-left: 60px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 60px;padding-left: 60px;" align="center"><![endif]-->
        <div style="font-size:1px;line-height:60px"> </div><img align="center" alt="Image" border="0" class="center autowidth" src="https://www.bibli.co.il/api/inc/images/bibli-lt.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 480px; display: block;" title="Image" width="480"/>
        <div style="font-size:1px;line-height:45px"> </div>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 15px; padding-top: 20px; padding-bottom: 0px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#204160;font-family:"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;line-height:1.5;padding-top:20px;padding-right:10px;padding-bottom:0px;padding-left:15px;">
        <div style="font-size: 12px; line-height: 1.5; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #204160; mso-line-height-alt: 18px;">
        <p style="font-size: 50px; line-height: 1.5; text-align: center; word-break: break-word; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; mso-line-height-alt: 75px; margin: 0;"><span style="font-size: 50px;"><strong><span style="font-size: 50px;"><span style="font-size: 38px;">שלום ותודה שנרשמת למערכת ביבלי</span></span></strong></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#204160;font-family:"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.2; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #204160; mso-line-height-alt: 14px;">
        <p dir="rtl" align="center" style="font-size: 17px; line-height: 1.2; text-align: center; word-break: break-word; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;"><span style="font-size: 17px; mso-ansi-font-size: 18px;"><strong>כדי להשלים את ההרשמה, עליך ללחוץ כאן ולהפעיל את חשבונך:</strong></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <div align="center" class="button-container" style="padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:39pt; width:190.5pt; v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#eeb100"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#204160; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]--><a href="'. $verificationLink .'" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #204160; background-color: #eeb100; border-radius: 50px; -webkit-border-radius: 50px; -moz-border-radius: 50px; width: auto; width: auto; border-top: 1px solid #eeb100; border-right: 1px solid #eeb100; border-bottom: 1px solid #eeb100; border-left: 1px solid #eeb100; padding-top: 10px; padding-bottom: 10px; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:40px;padding-right:40px;font-size:16px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>אשרו רישום</strong></span></span></a>
        <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
        </div>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#204160;font-family:"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.2; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #204160; mso-line-height-alt: 14px;">
        <p dir="rtl" align="center" style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; mso-line-height-alt: 17px; margin: 0;"><strong>בכל שאלה או בקשה, ניתן לפנות אלינו דרך עמוד צור קשר באתר.</strong></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:60px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
        <div style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:20px; padding-bottom:60px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
        <tbody>
        <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 8px; padding-left: 8px;" valign="top"><a href="https://www.facebook.com/biblio.co.il/" target="_blank"><img alt="Facebook" height="32" src="https://www.bibli.co.il/api/inc/images/facebook2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 8px; padding-left: 8px;" valign="top"><a href="mailto:‫contact@bibli.co.il‬" target="_blank"><img alt="E-Mail" height="32" src="https://www.bibli.co.il/api/inc/images/mail2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="E-Mail" width="32"/></a></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
        <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px;">
        <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">NetShop - Lorem ipsum dolor sit amet hasellus sagittis aliquam luctus. </p>
        <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">329 California St, San Francisco, CA 94118</p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px dotted #C4C4C4; height: 0px; width: 60%;" valign="top" width="60%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
        <div style="color:#4F4F4F;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-size: 12px; color: #4F4F4F; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
        <p style="line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"> </p>
        <p style="line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"> </p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (IE)]></div><![endif]-->
        </body>
        </html>';

        return $msg;

    }

}