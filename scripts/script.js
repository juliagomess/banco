var contas = [];
var cont = 1;

function desabilita() {
  var platinum = document.getElementById("platinum");
  var basica = document.getElementById("basica");
  var estudante = document.getElementById("estudante");
  if (basica.checked) {
    platinum.disabled = true;
    estudante.disabled = true;
  } else if (platinum.checked) {
    basica.disabled = true;
    estudante.disabled = true;
  } else if (estudante.checked) {
    platinum.disabled = true;
    basica.disabled = true;
  } else {
    platinum.disabled = false;
    basica.disabled = false;
    estudante.disabled = false;
  }
}

function criaConta() {
  var platinum = document.getElementById("platinum");
  var basica = document.getElementById("basica");
  var estudante = document.getElementById("estudante");
  var nome = document.getElementById("nomeCria");
  var num = document.getElementById("numCria");

  if (!basica.checked && !platinum.checked && !estudante.checked) {
    alert("Você precisa selecionar um tipo de conta!");
    return;
  }

  if (nome.value == '') {
    alert("Você precisa preencher todos os campos");
    return;
  }

  var c;
  if (basica.checked) {
    c = {
      conta : new Basica(num.value, nome.value),
      tipo : "Básica",
      cont : 0,
    } 
  } else if (platinum.checked) {
    c = {
      conta: new Platinum(num.value, nome.value),
      tipo : "Platinum",
      cont: -1,
    } 
  } else {
    c = {
      conta: new Estudante(num.value, nome.value),
      tipo : "Estudante",
      cont: 0,
    } 
  }

  contas.push(c);
  console.log(contas);
  cont++;

  nome.value = '';
  num.value = cont;
  platinum.disabled = false;
  basica.disabled = false;
  estudante.disabled = false;
  platinum.checked = false;
  basica.checked = false;
  estudante.checked = false;
}

function listarContas() {
  var lista = document.getElementById("lista");
  lista.innerHTML = '';

  for (var i = 0; i < this.contas.length; i++) {
    this.criaDiv(this.contas[i]);
  }
}

function criaDiv(infos) {
  var div = document.createElement("div");
  var paragrafoNome = document.createElement("p");
  var paragrafoNum = document.createElement("p");
  var paragrafoTipo = document.createElement("p");
  var nome = document.createTextNode("Nome: " + infos.conta.getNome());
  var num = document.createTextNode("Numero: " + infos.conta.getNum());
  var tipo = document.createTextNode("Hora Entrada: " + infos.tipo);

  paragrafoNome.append(nome);
  paragrafoNum.append(num);
  paragrafoTipo.append(tipo);

  div.append(paragrafoNome);
  div.append(paragrafoNum);
  div.append(paragrafoTipo);

  var lista = document.getElementById("lista");
  lista.append(div);
}

function saque() {
  var num = document.getElementById("numSaque");
  var valor = document.getElementById("valorSaque");
  var flag = 0;

  if (num.value == '' && valor.value == '') {
    alert("Você precisa preencher todos os campos");
    return;
  }

  for (var i = 0; i < this.contas.length; i++) {
    if(this.contas[i].conta.getNum() == num.value) {
      flag = 1;
      this.contas[i].conta.sacar(parseInt(valor.value));
    }
  }

  if(flag == 0) {
    alert("Conta inexistente"); 
    return;
  }

  num.value = '';
  valor.value = '';
}

function deposito() {
  var num = document.getElementById("numDep");
  var valor = document.getElementById("valorDep");
  var flag = 0;

  if (num.value == '' && valor.value == '') {
    alert("Você precisa preencher todos os campos");
    return;
  }

  for (var i = 0; i < this.contas.length; i++) {
    if(this.contas[i].conta.getNum() == num.value) {
      flag = 1;
      this.contas[i].conta.depositar(parseInt(valor.value));
    }
  }

  if(flag == 0) {
    alert("Conta inexistente");
    return;
  }

  num.value = '';
  valor.value = '';
}