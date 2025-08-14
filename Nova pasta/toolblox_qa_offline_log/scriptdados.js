async function gerar() {
    const tipo = document.getElementById("tipo").value;
    const resultado = document.getElementById("resultado");

    resultado.textContent = "Gerando...";

    try {
        // API pública do Fordev
        const url = `https://api.4devs.com.br/v1/${tipo}?formatting=true&data_only=true`;

        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Erro na requisição");

        const data = await resp.json();

        resultado.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        resultado.textContent = "Erro: " + err.message;
    }
}
