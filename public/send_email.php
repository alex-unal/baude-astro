<?php
// Establecer la cabecera para devolver JSON
header('Content-Type: application/json');

// Función para devolver una respuesta JSON y terminar el script
function json_response($status, $message = '') {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // --- CONFIGURACIÓN ---
    $recipient_email = "alex.baudelino@gmail.com"; 
    $sender_email = "alex@baudelino.com";
    
    // --- PROCESAMIENTO ---
    
    // 1. Recoger y limpiar los datos del formulario
    $name = filter_var(trim($_POST["name"] ?? ''), FILTER_SANITIZE_STRING);
    $subject = $name . " - quiere contactar";
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST["message"] ?? ''), FILTER_SANITIZE_STRING);

    // 2. Validar los datos del lado del servidor
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        json_response('error', 'Datos inválidos o incompletos.');
    }

    // 3. Construir el cuerpo y las cabeceras del correo
    $email_content = "Nombre: " . $name . "\n";
    $email_content .= "Correo Electrónico: " . $email . "\n\n";
    $email_content .= "Mensaje:\n" . $message . "\n";

    $headers = "From: " . $name . " <" . $sender_email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 4. Enviar el correo
    if (mail($recipient_email, $subject, $email_content, $headers)) {
        json_response('success', 'Mensaje enviado correctamente.');
    } else {
        json_response('error', 'El servidor no pudo enviar el correo.');
    }

} else {
    // Si no es una petición POST, devolver un error
    json_response('error', 'Método no permitido.');
}
?>
