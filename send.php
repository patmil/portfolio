<?php

    $name = $_POST['name'];

    $email = $_POST['email'];

    $subject = $_POST['subject'];

    $message = $_POST['message'];

    $return = Array();

    $dokogo = "patryk.milowski@pmilowski.pl	";

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=UTF-8'. "\r\n";
    $headers .= 'From: ' . $email ."\r\n";
    $title = "Wiadomość z formularza kontaktowego";

    $text  = "
        <html>
            <head>
                <meta charset=\"utf-8\">
            </head>
            <style type='text/css'>
                body {font-family:sans-serif; color:#222; padding:20px;}
                div {margin-bottom:10px;}
                .msg-title {margin-top:30px;}
            </style>
            <body>
                <div>Imię / Nazwa firmy: <strong>$name</strong></div>
                <div>Email: <a href=\"mailto:$email\">$email</a></div>
                <div>Temat: 
                <strong>$subject</strong></div>
                <div class=\"msg-title\"> 
                <strong>Wiadomość:</strong></div>
                <div>$message</div>
            </body>
        </html>";
    if (mail($dokogo, $title, $text, $headers)) {
        $return['status'] = 'ok';
    } else {
        $return['status'] = 'error';
    }

header('Content-Type: application/json');
echo json_encode($return);
?>