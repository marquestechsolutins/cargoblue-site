<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome     = htmlspecialchars($_POST['nome']);
    $email    = htmlspecialchars($_POST['email']);
    $area     = htmlspecialchars($_POST['area']);
    $mensagem = htmlspecialchars($_POST['mensagem']);

    // $destinatario = "rh@cargoblue.com";
    $destinatario = "gmarquesdev758@gmail.com";
    $assunto = "Novo currículo - Trabalhe Conosco";

    // Validação do arquivo
    if (isset($_FILES['curriculo']) && $_FILES['curriculo']['error'] == 0) {

        $arquivoTmp  = $_FILES['curriculo']['tmp_name'];
        $arquivoNome = $_FILES['curriculo']['name'];
        $arquivoTipo = $_FILES['curriculo']['type'];

        $conteudoArquivo = chunk_split(base64_encode(file_get_contents($arquivoTmp)));
        $boundary = md5(time());

        // Cabeçalhos
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "From: $nome <$email>\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Corpo do email
        $corpo  = "--$boundary\r\n";
        $corpo .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
        $corpo .= "
            <strong>Nome:</strong> $nome <br>
            <strong>E-mail:</strong> $email <br>
            <strong>Área de interesse:</strong> $area <br><br>
            <strong>Mensagem:</strong><br>
            $mensagem
        \r\n";

        // Anexo
        $corpo .= "--$boundary\r\n";
        $corpo .= "Content-Type: $arquivoTipo; name=\"$arquivoNome\"\r\n";
        $corpo .= "Content-Disposition: attachment; filename=\"$arquivoNome\"\r\n";
        $corpo .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $corpo .= $conteudoArquivo . "\r\n";
        $corpo .= "--$boundary--";

        // Envio
        if (mail($destinatario, $assunto, $corpo, $headers)) {
            echo "<script>alert('Currículo enviado com sucesso!'); window.location.href='index.html';</script>";
        } else {
            echo "<script>alert('Erro ao enviar. Tente novamente.'); history.back();</script>";
        }

    } else {
        echo "<script>alert('Erro no upload do currículo.'); history.back();</script>";
    }
}
?>
