<?php
require_once("OutgoingEmailAgent.php");
$validatedphone=true;
$phonenumber="";
$validatemail=true;
if (!isset($_POST["contact-name"]) || !isset($_POST["contact-email"]) || !isset($_POST["contact-comments"])){
    $resp["result"]=false;
    $resp["message"]="Please fill all obligatory fields";
}else{
    $email=$_POST["contact-email"];
    $email=urldecode($email);
    if(!is_email($email)){
        $resp["result"]=false;
        $resp["message"]="Please introduce a valid email address";
        $validatemail=false;
    }else{
  
            if(isset($_POST["contact-phone"])){
                    $phonenumber=$_POST["contact-phone"];
                    if(!is_numeric($phonenumber)){
                        $validatedphone=false;
                        $resp["result"]=false;
                        $resp["message"]="Phone number must have a numeric value";
                    }
            } 
        
        }
        
        if($validatedphone && $validatemail){
            $contactname= $_POST["contact-name"];
            $email;
            if(isset($_POST["contact-company"])){ $contactCompany=$_POST["contact-company"];}else{$contactCompany="";};
            $contactComments = $_POST["contact-comments"];
            $fecha = gmdate("F j, Y, g:i a T");
            $subject="Mensaje nuevo en el sitio de CodigoDelSur";
            $body="Date Sent: $fecha <br>"
            ."Contact Name: $contactname <br>"
            ."Contact Email: $email <br>"
            ."Contact Company: $contactCompany"
            ."Contact Phone: $phonenumber <br>"
            ."Contact Coments: $contactComments";
            $mailsender = new OutgoingEmailAgent("info@codigodelsur.com","info@codigodelsur.com", "Folmedo3532", "smtp.codigodelsur.com", 25, "0");
            $result = $mailsender->send_email("info@codigodelsur.com", $subject, $body);
            $resp["result"]=$result;
            if($result){
               $resp["message"]="Your message has been sent";
            }else{
                 $resp["message"]="There was a problem sending your message, please try again";
            }
        }
}
function is_email($pemail){ 
             if(!empty($pemail)) { 
                $regexp = '/^[^\x00-\x20()<>@,;:\\".[\]\x7f-\xff]+(?:\.[^\x00-\x20()<>@,;:\\".[\]\x7f-\xff]+)*\@[^\x00-\x20()<>@,;:\\".[\]\x7f-\xff]+(?:\.[^\x00-\x20()<>@,;:\\".[\]\x7f-\xff]+)+$/i'; 
              } 
              if (preg_match($regexp, $pemail)) { 
                return true;
              } 
              return false;
}


echo json_encode($resp);

?>