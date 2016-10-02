<?php
// Check for empty fields
if(empty($_POST['email;'])      ||
   empty($_POST['title'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }

$email = $_POST['email'];
$title = $_POST['title'];
$message = $_POST['message'];

// Create the email and send the message
$to = $email;
$email_subject = $title;
$email_body = $message;
$headers = "From: noreply@yfrancisguinto.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
return true;
?>
