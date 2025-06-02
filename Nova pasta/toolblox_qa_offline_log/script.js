
function toUpperCase() {
    const input = document.getElementById('textInput').value;
    document.getElementById('textOutput').value = input.toUpperCase();
}
function toLowerCase() {
    const input = document.getElementById('textInput').value;
    document.getElementById('textOutput').value = input.toLowerCase();
}
function removeSpaces() {
    const input = document.getElementById('textInput').value;
    const output = input.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    document.getElementById('textOutput').value = output;
}
function generateCPF() {
    const n = () => Math.floor(Math.random() * 9);
    const cpf = Array.from({length:11}, n).join('');
    document.getElementById('cpfCnpjOutput').value = cpf;
}
function generateCNPJ() {
    const n = () => Math.floor(Math.random() * 9);
    const cnpj = Array.from({length:14}, n).join('');
    document.getElementById('cpfCnpjOutput').value = cnpj;
}
function testRegex() {
    const pattern = document.getElementById('regexInput').value;
    const text = document.getElementById('sampleText').value;
    try {
        const regex = new RegExp(pattern, 'g');
        const matches = [...text.matchAll(regex)].map(m => m[0]).join('\n');
        document.getElementById('regexOutput').value = matches || 'Nenhuma correspondência';
    } catch (e) {
        document.getElementById('regexOutput').value = 'Regex inválida';
    }
}
function analyzeLog() {
    const file = document.getElementById('logFile').files[0];
    const keyword = document.getElementById('logKeyword').value;
    if (!file || !keyword) {
        alert('Selecione um arquivo e insira uma palavra-chave ou regex.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        try {
            const regex = new RegExp(keyword, 'gi');
            const matches = text.split('\n').filter(line => regex.test(line));
            document.getElementById('logOutput').value = matches.join('\n') || 'Nenhuma linha encontrada';
        } catch (err) {
            document.getElementById('logOutput').value = 'Regex inválida';
        }
    };
    reader.readAsText(file);

    document.addEventListener('contextmenu', event => event.preventDefault());
  document.onkeydown = function(e) {
      if(e.key == "F12" || 
         (e.ctrlKey && e.shiftKey && (e.key == "I" || e.key == "J" || e.key == "C")) || 
         (e.ctrlKey && e.key == "U")) {
          return false;
      }
  }
}
