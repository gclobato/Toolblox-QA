const typeSelect = document.getElementById("type-select");
const quantityInput = document.getElementById("quantity-input");
const generateBtn = document.getElementById("generate-btn");
const resultDiv = document.getElementById("result");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarNome() {
  const nomes = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda", "Gustavo", "Helena"];
  const sobrenomes = ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Rodrigues", "Alves"];
  const nome = nomes[getRandomInt(0, nomes.length - 1)];
  const sobrenome = sobrenomes[getRandomInt(0, sobrenomes.length - 1)];
  return `${nome} ${sobrenome}`;
}

function gerarCPF() {
  // Gera um CPF fictício simples (apenas números, com dígitos verificadores aproximados)
  const n = Array(9)
    .fill(0)
    .map(() => getRandomInt(0, 9));

  function calcDigitos(v) {
    let sum = 0;
    for (let i = 0; i < v.length; i++) {
      sum += v[i] * (v.length + 1 - i);
    }
    let d = 11 - (sum % 11);
    if (d >= 10) d = 0;
    return d;
  }

  const d1 = calcDigitos(n);
  const d2 = calcDigitos([...n, d1]);
  return `${n.join('')}${d1}${d2}`;
}

function gerarPessoa() {
  return {
    nome: gerarNome(),
    cpf: gerarCPF(),
    idade: getRandomInt(18, 80),
    email: function () {
      // gera email simples baseado no nome, sem acentos
      const email = this.nome.toLowerCase().replace(' ', '.') + '@exemplo.com';
      return email.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
  };
}

function gerarCNPJ() {
  // Geração simples, sem validação
  function getRandomDigits(len) {
    let s = "";
    for (let i = 0; i < len; i++) s += getRandomInt(0, 9);
    return s;
  }
  return getRandomDigits(2) + "." + getRandomDigits(3) + "." + getRandomDigits(3) + "/" + getRandomDigits(4) + "-" + getRandomDigits(2);
}

function gerarVeiculo() {
  const marcas = ["Ford", "Chevrolet", "Volkswagen", "Fiat", "Toyota", "Honda"];
  const modelos = ["Ka", "Onix", "Gol", "Uno", "Corolla", "Civic"];
  const combustiveis = ["Gasolina", "Álcool", "Diesel", "Flex", "Elétrico"];
  const marca = marcas[getRandomInt(0, marcas.length - 1)];
  const modelo = modelos[getRandomInt(0, modelos.length - 1)];
  const ano = getRandomInt(1995, 2023);
  const combustivel = combustiveis[getRandomInt(0, combustiveis.length - 1)];
  // Placa Mercosul simplificada: 3 letras + "-" + 4 números
  const placa =
    String.fromCharCode(getRandomInt(65, 90)) +
    String.fromCharCode(getRandomInt(65, 90)) +
    String.fromCharCode(getRandomInt(65, 90)) +
    "-" +
    getRandomInt(1000, 9999);

  return {
    marca,
    modelo,
    ano,
    combustivel,
    placa
  };
}

function generateData(type, quantity) {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    if (type === "pessoa") {
      let p = gerarPessoa();
      p.email = p.email();
      data.push(p);
    } else if (type === "cnpj") {
      data.push({ cnpj: gerarCNPJ() });
    } else if (type === "veiculo") {
      data.push(gerarVeiculo());
    }
  }
  return data;
}

function renderData(type, data) {
  if (data.length === 0) {
    return "<p>Nenhum dado gerado.</p>";
  }

  if (type === "pessoa") {
    return `<table border="1" cellspacing="0" cellpadding="5" style="width:100%; border-collapse: collapse;">
      <thead style="background-color:#007bff; color:white;">
        <tr><th>Nome</th><th>CPF</th><th>Idade</th><th>Email</th></tr>
      </thead>
      <tbody>
        ${data
      .map(
        (p) => `
          <tr>
            <td>${p.nome}</td>
            <td>${p.cpf}</td>
            <td>${p.idade}</td>
            <td>${p.email}</td>
          </tr>
        `
      )
      .join('')}
      </tbody>
    </table>`;
  } else if (type === "cnpj") {
    return `<ul>${data.map(item => `<li>${item.cnpj}</li>`).join('')}</ul>`;
  } else if (type === "veiculo") {
    return `<table border="1" cellspacing="0" cellpadding="5" style="width:100%; border-collapse: collapse;">
      <thead style="background-color:#007bff; color:white;">
        <tr><th>Marca</th><th>Modelo</th><th>Ano</th><th>Combustível</th><th>Placa</th></tr>
      </thead>
      <tbody>
        ${data
      .map(
        (v) => `
          <tr>
            <td>${v.marca}</td>
            <td>${v.modelo}</td>
            <td>${v.ano}</td>
            <td>${v.combustivel}</td>
            <td>${v.placa}</td>
          </tr>
        `
      )
      .join('')}
      </tbody>
    </table>`;
  }
}

generateBtn.onclick = () => {
  const type = typeSelect.value;
  let qty = parseInt(quantityInput.value);
  if (isNaN(qty) || qty < 1) qty = 1;
  if (qty > 100) qty = 100;

  const generated = generateData(type, qty);
  resultDiv.innerHTML = renderData(type, generated);
};
