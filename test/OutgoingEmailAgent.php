<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of OutgoingMailAgent
 *
 * @author CDS
 */
//require_once ("phpAES/encryptHandler.php");


class OutgoingEmailAgent {
    
    var $serveraddress;
    var $serverport;
    var $emailaddress;
    var $smtpuser;
    var $smtppass;
    var $smtpssl;
            
            
    function OutgoingEmailAgent($emailaddress,$smtpuser,$smtppass,$serveraddress,$serverport=null,$smtpssl=0) {
        
       
        //$encrypter = new encryptHandler();
        $this->emailaddress=$emailaddress;
        //$this->smtppass=$encrypter->decryptstring($smtppass);
        $this->smtppass=$smtppass;
        $this->smtpuser=$smtpuser;
        $this->serveraddress=$serveraddress;
        $this->serverport=$serverport;
        $this->smtpssl=$smtpssl;
    }
   function send_email($to,
           $subject, $body) {
        require_once "Mail.php";
        require_once "Mail/mime.php";    
        $host = $this->serveraddress;
        $headers = array (
                'From' => $this->emailaddress,
                'To' => $to,
                'Subject' => $subject,
                
        );
 
        $mime = new Mail_mime();
        $mime->setHTMLBody($body);
 
        $body = $mime->get(array('html_charset' => 'utf-8','text_charset' => 'utf-8'));
        $headers = $mime->headers($headers);
        $M = new Mail();
        $smtp = $M->factory('smtp', array ('host' => $host,
            'port'=>$this->serverport!=null?$this->serverport:25,
            'auth'=>true,
            'username'=>$this->smtpuser,
            'password'=>$this->smtppass
            ));
       
            //'username'=>'mdebrun@codigodelsur.com',
            //'password'=>'Codigodelsur1'));
        $mail = $smtp->send($to, $headers, $body);
 
        $p = new PEAR();
        if ($p->isError($mail)) {
                return false;
        } else {
                return true; 
        }
}
   function TestingMails (){
    include('Mail.php');

    $recipients = $this->mailaddress;

    $headers['From']    = $this->emailaddress;
    $headers['To']      = $this->emailaddress;
    $headers['Subject'] = 'Test message';

    $body = 'Test message';

    // Define SMTP Parameters

    $params['host'] = $this->serveraddress;
    $params['port'] = $this->serverport;
    $params['auth'] = true;
    $params['username'] = $this->smtpuser;
    $params['password'] = $this->smtppass;
    $mail_object =& Mail::factory('smtp', $params);
    $mail_object->send($recipients, $headers, $body);
}
    
}

?>
