<?php
	require 'PHPMailer-master/PHPMailerAutoload.php';
	
	function send_email($to, $subject, $body){
			$mail = new PHPMailer;

			//$mail->SMTPDebug = 3;                               // Enable verbose debug output

			$mail->isSMTP();                                      // Set mailer to use SMTP
			$mail->Host = 'smtp.codigodelsur.com';  // Specify main and backup SMTP servers
			$mail->SMTPAuth = true;                               // Enable SMTP authentication
			$mail->Username = 'ffraschini@codigodelsur.com';                 // SMTP username
			$mail->Password = 'Sulmora1020';                           // SMTP password
			$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
			$mail->Port = 25;                                    // TCP port to connect to

			$mail->From = 'ffraschini@codigodelsur.com';
			$mail->FromName = 'CDS Contact us';
			$mail->addAddress($to, 'Info CDS');     // Add a recipient
			$mail->addAddress($to);               // Name is optional
			$mail->addReplyTo($to, 'Information');
			$mail->addCC('');
			$mail->addBCC('');

			//$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
			//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
			//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
			//$mail->isHTML(true);                                  // Set email format to HTML

			$mail->Subject = $subject;
			$mail->Body    = $body;
			$mail->AltBody = $body;

			if(!$mail->send()) {
				 return false;
			} else {
				 return true;
			}
	}	
?>