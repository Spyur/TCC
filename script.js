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
    // Aqui você pode adicionar a lógica para as visualizações recentes
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
function loginViaQRCode() {
    const constraints = {
        video: { facingMode: 'environment' } // Use a câmera traseira se disponível
    };

    // Solicita permissão para acessar a câmera
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.setAttribute('playsinline', true); // iOS
            video.play();

            const cameraContainer = document.getElementById('camera-container');
            cameraContainer.appendChild(video); // Adiciona o vídeo à página para exibir a câmera
        })
        .catch(err => {
            console.error('Erro ao acessar a câmera:', err);
            alert('Erro ao acessar a câmera. Verifique se a permissão foi concedida e se você está em um ambiente seguro (HTTPS).');
        });
}
