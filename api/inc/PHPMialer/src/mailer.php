<?php

require 'PHPMailerAutoload.php';


class Mailer {

	function send($subject, $body, $to, $ical = null) {
		$mail = new PHPMailer();
		$mail->isSendmail();
		$mail -> Port = 587;

		$mail -> SetFrom('no-reply@'.$_SERVER['HTTP_HOST'], 'PXL');
		$mail -> AddAddress($to);

		$mail->addCustomHeader('MIME-version',"1.0");
		$mail->addCustomHeader('Content-type',"text/calendar;name=\"meeting.ics\";method=REQUEST");
		$mail->addCustomHeader("Content-class: urn:content-classes:calendarmessage");
		$mail->addCustomHeader('Content-Transfer-Encoding',"7bit");
		$mail->addCustomHeader('X-Mailer',"Microsoft Office Outlook 12.0");

		$body .= 'Content-Type: text/calendar;name="meeting.ics";method=REQUEST'."\n";
		$body .= "Content-Transfer-Encoding: 8bit\n\n";
		$body .= $ical;

		$mail -> IsHTML(true);
		$mail -> CharSet = 'UTF-8';
		$mail -> Subject = $subject;
		$mail -> Body = $body ;
		//$mail -> AddStringAttachment($ical, 'pxl.ics');

		return false; //$mail -> send();

	}
	function send_mail($subject, $body, $to) {
		$headers = "From: PXL <no-reply@pxlmccannwg.com>\n";
		$headers .= "Reply-To: PXL <no-reply@pxlmccannwg.com>\n";
		$headers .= "Return-Path: PXL <no-reply@pxlmccannwg.com>\n";
		$headers .= "Content-Type: text/html; charset=\"UTF-8\"\n";
		$headers .= "MIME-Version: 1.0\"\n";

		$message = "<html>\n";
		$message .= "<body>\n";
		$message .= '<p>'.$body.'</p>';
		$message .= "</body>\n";
		$message .= "</html>\n";

		return @mail($to, $subject, $message, $headers);
	}
	function sendInline($subject, $body, $to) {

		$mail = new PHPMailer();
		$mail->isSendmail();
		$mail -> Port = 587;

		$mail -> SetFrom('no-reply@'.$_SERVER['HTTP_HOST'], 'PXL');
		$mail -> AddAddress($to);

		$mail -> IsHTML(false);
		$mail->ContentType = 'text/calendar';

		$mail->addCustomHeader('MIME-version',"1.0");
		$mail->addCustomHeader('Content-type',"text/calendar; method=PUBLISH; charset=UTF-8");
		$mail->addCustomHeader('Content-Transfer-Encoding',"7bit");
		$mail->addCustomHeader('X-Mailer',"Microsoft Office Outlook 12.0");
		$mail->addCustomHeader("Content-class: urn:content-classes:calendarmessage");
		$mail -> Subject = $subject;
		$mail -> Body = $body;

		return false; //$mail -> send();
	}

	function sendIcalEvent($from_name, $to_name, $from_address, $to_address, $startTime, $endTime, $subject, $description, $location, $timezone, $type="PUBLISH")
	{
		$eol2 = "\r\n";
		$eol = "\n";

		$mime_boundary = "Meeting--".MD5(TIME());

		$headers = "From: ".$from_name." <".$from_address.">\n";
		$headers .= "Reply-To: ".$from_name." <".$from_address.">\n";
		$headers .= "Return-Path: ".$from_name." <".$from_address.">\n";
		$headers .= "MIME-Version: 1.0\n";
		$headers .= "Content-Type: multipart/alternative; boundary=\"".$mime_boundary."\"" . $eol;

		$message = "--$mime_boundary" . $eol;
		$message .= "Content-Type: text/plain; charset=\"UTF-8\"" . $eol;
		$message .= "Content-Transfer-Encoding: 7bit".$eol.$eol;
		$message .=  $description . $eol . $eol;

		$message = "--$mime_boundary" . $eol;
		$message .= "Content-Type: text/html; charset=\"UTF-8\"" . $eol;
		$message .= "MIME-Version: 1.0" . $eol;
		$message .= "X-Mailer: Microsoft Office Outlook 12.0" . $eol;
		$message .= "Content-Transfer-Encoding: 7bit" . $eol . $eol;

		$message .= "<html>\n";
		$message .= "<body>\n";
		$message .= '<p>'.$description.'</p>';
		$message .= "</body>\n";
		$message .= "</html>\n" . $eol . $eol;

		$vcal = "BEGIN:VCALENDAR" . $eol;
		$vcal .= "PRODID:-//PXL//Courses//EN" . $eol;
		$vcal .= "VERSION:2.0" . $eol;
		$vcal .= "CALSCALE:GREGORIAN" . $eol;
		if($type == 'PUBLISH') {
			$vcal .= "METHOD:REQUEST" . $eol;
		} else {
			$vcal .= "METHOD:CANCEL" . $eol;
		}
//
		$vcal .= "BEGIN:VEVENT" . $eol;
		$vcal .= "DTSTART:" . date("Ymd\THis\Z", strtotime($startTime)) . $eol;
		$vcal .= "DTEND:" . date("Ymd\THis\Z", strtotime($endTime)) . $eol;

		$vcal .= "DTSTAMP:" . date("Ymd\THis") . $eol;
		$vcal .= "ORGANIZER: pxl@pxlmccannwg.com" . $eol;
		$vcal .= "ATTENDEE;ROLE=NON-PARTICIPANT;RSVP=FALSE:" . $to_address . $eol;
		$vcal .= "UID:" . md5($subject) . "@pxlmccannwg.com" . $eol;
		$vcal .= "DESCRIPTION:" . $description . $eol;
		$vcal .= "LOCATION:" . $location . $eol;

		if($type == 'PUBLISH') {
			$vcal .= "STATUS:CONFIRMED" . $eol;
			$vcal .= "BEGIN:VALARM" . $eol;
			$vcal .= "TRIGGER:-PT30M" . $eol;
			$vcal .= "REPEAT:1" . $eol;
			$vcal .= "DURATION:PT15M" . $eol;
			$vcal .= "ACTION:DISPLAY" . $eol;
			$vcal .= "END:VALARM" . $eol;
			$vcal .= "TRANSP:OPAQUE" . $eol;
		} else {
			$vcal .= "STATUS:CANCELLED" . $eol;
		}

		$vcal .= "SEQUENCE:" . time() . $eol;
		$vcal .= "SUMMARY:" . $subject . $eol;

		$vcal .= "END:VEVENT" . $eol;
		$vcal .= "END:VCALENDAR" . $eol;

		/*$vcal = "BEGIN:VCALENDAR
METHOD:REQUEST
PRODID:Microsoft Exchange Server 2010
VERSION:2.0
BEGIN:VTIMEZONE
TZID:Eastern Standard Time
BEGIN:STANDARD
DTSTART:". date("Ymd\THis", strtotime($startTime)) . "
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=1SU;BYMONTH=11
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:". date("Ymd\THis", strtotime($startTime)) . "
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=2SU;BYMONTH=3
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
ORGANIZER;CN=PXL:MAILTO:no-reply@pxlbeta.com
DESCRIPTION;LANGUAGE=en-US:$description
RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU;WKST=SU
SUMMARY;LANGUAGE=en-US:PXL Site Meeting
DTSTART;TZID=Eastern Standard Time:". date("Ymd\THis", strtotime($startTime)) . "
DTEND;TZID=Eastern Standard Time:". date("Ymd\THis", strtotime($startTime)) . "
UID:" . md5($subject) . "@pxlbeta.com
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:" . date("Ymd\TGis") . "
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION;LANGUAGE=en-US:Israel: 80-9216163 #6549233 (US: 517-466-2380)
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-OWNERAPPTID:2114205560
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DISALLOW-COUNTER:FALSE
BEGIN:VALARM
DESCRIPTION:REMINDER
TRIGGER;RELATED=START:-PT15M
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR
";*/


		$message .= "--$mime_boundary" . $eol;
		$message .= "Content-Type: text/calendar;name=meeting.ics; method=REQUEST; charset=UTF-8".$eol;
//			$headers .= "Content-Disposition: attachment; filename=meeting.ics".$eol;
		$message .= "Content-Transfer-Encoding: 7bit".$eol.$eol;

		$message .= $vcal.$eol.$eol;

		$message .= "--".$mime_boundary."--".$eol.$eol;
		return @mail($to_address, $subject, $message, $headers);
	}
	function sendIcalEventInline($from_name, $from_address, $to_address, $subject, $description, $update)
	{
		$eol = "\n";

		$mime_boundary = "Meeting--".MD5(TIME());

		$headers = "From: ".$from_name." <".$from_address.">\n";
		$headers .= "Reply-To: ".$from_name." <".$from_address.">\n";
		$headers .= "Return-Path: ".$from_name." <".$from_address.">\n";
		$headers .= "MIME-Version: 1.0\n";
		$headers .= "Content-Type: multipart/alternative; boundary=\"".$mime_boundary."\"" . $eol;

		$message = "--$mime_boundary" . $eol;
		$message .= "Content-Type: text/html; charset=\"UTF-8\"" . $eol;
		$message .= "MIME-Version: 1.0" . $eol;
		$message .= "X-Mailer: Microsoft Office Outlook 12.0" . $eol;
		$message .= "Content-Transfer-Encoding: 7bit" . $eol . $eol;

		$message .= "<html>\n";
		$message .= "<body>\n";
		$message .= '<p>'.$description.'</p>';
		$message .= "</body>\n";
		$message .= "</html>\n" . $eol . $eol;

		$message .= "--$mime_boundary" . $eol;
		$message .= "Content-Type: text/calendar;name=meeting.ics; method=REQUEST; charset=UTF-8".$eol;
//			$headers .= "Content-Disposition: attachment; filename=meeting.ics".$eol;
		$message .= "Content-Transfer-Encoding: 7bit".$eol.$eol;

		$message .= $update.$eol.$eol;

		$message .= "--".$mime_boundary."--".$eol.$eol;
		return @mail($to_address, $subject, $message, $headers);

	}
}

?>
