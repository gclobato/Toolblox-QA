
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
    document.getElementById('cpfCnpjOutput').value = cpf + " (API Simulada)";
}
function generateCNPJ() {
    const n = () => Math.floor(Math.random() * 9);
    const cnpj = Array.from({length:14}, n).join('');
    document.getElementById('cpfCnpjOutput').value = cnpj + " (API Simulada)";
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
