document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // Verifica se o nome de usuário e senha são "admin" e "admin"
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('username', username); // Salva o nome de usuário no localStorage
            window.location.href = 'pagina_principal.html';
        } else {
            alert('Nome de usuário ou senha incorretos.');
        }
    });

    // Exibe o nome de usuário na página principal
    const loggedInUsername = localStorage.getItem('username');
    if (loggedInUsername) {
        document.getElementById('username').textContent = loggedInUsername;
    }
});
function visualizacoesRecentes() {
    // Aqui pode adicionar a lógica para as visualizações recentes
    // Por exemplo, exibir uma mensagem ou fazer uma requisição para obter os dados das visualizações
    
    // Exemplo de exibição de mensagem
    alert('Visualizações recentes em construção!');
    
    // Exemplo de requisição para obter dados das visualizações (usando fetch)
    /*
    fetch('url_da_api_visualizacoes_recentes')
        .then(response => response.json())
        .then(data => {
            // Manipular os dados recebidos, como exibir em uma lista na página
        })
        .catch(error => console.error('Erro ao obter as visualizações recentes:', error));
    */
}


// Função para realizar o login via QR code
function loginViaQRCode() {
    // Criação de elementos necessários
    const video = document.createElement('video'); // Elemento de vídeo para captura da câmera
    const canvasElement = document.createElement('canvas'); // Elemento de canvas para processamento da imagem
    const canvas = canvasElement.getContext('2d'); // Contexto 2D do canvas

    // Solicita acesso à câmera do dispositivo
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            // Quando o acesso à câmera é concedido
            video.srcObject = stream; // Define o stream de vídeo como fonte do elemento de vídeo
            video.setAttribute('playsinline', true); // Reprodução inline no iOS
            video.play().then(() => {
                requestAnimationFrame(tick); // Inicia o processamento dos frames do vídeo
            });
        })
        .catch(err => {
            // Em caso de erro ao acessar a câmera
            console.error('Erro ao acessar a câmera:', err); // Exibe o erro no console
            alert('Erro ao acessar a câmera. Verifique se a permissão foi concedida.'); // Alerta o usuário sobre o erro
        });

    // Função para processar os frames do vídeo
    function tick() {
        video.style.width = '100%'; // Define a largura do vídeo como 100%
        video.style.height = 'auto'; // Altura automática para manter a proporção

        // Define o tamanho do canvas com base nas dimensões do vídeo
        canvasElement.width = video.videoWidth;
        canvasElement.height = video.videoHeight;

        // Desenha o frame do vídeo no canvas
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

        // Obtém os dados da imagem do canvas
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);

        // Utiliza a biblioteca jsQR para decodificar o QR code na imagem
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert', // Opções de decodificação
        });

        // Verifica se um QR code foi encontrado na imagem
        if (code) {
            // Aqui você pode adicionar a lógica para lidar com o QR code lido
            alert('QR code lido: ' + code.data); // Exibe os dados do QR code lido (exemplo)
            // Por exemplo, fazer uma requisição para autenticar com base no QR code lido
        }

        // Solicita a próxima animação do navegador para continuar o processamento dos frames
        requestAnimationFrame(tick);
    }
}
