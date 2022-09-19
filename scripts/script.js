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
      tipo : "Basica",
      contE : 0,
      contT : 0, 
    } 
  } else if (platinum.checked) {
    c = {
      conta: new Platinum(num.value, nome.value),
      tipo : "Platinum",
      contE : -1,
      contT : -1, 
    } 
  } else {
    c = {
      conta: new Estudante(num.value, nome.value),
      tipo : "Estudante",
      contE : 0,
      contT : 0, 
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
  this.openPopup();
  var lista = document.getElementById("lista");
  lista.innerHTML = '';

  if(this.contas.length == 0) {
    var aviso = document.createElement("h3");
    var textoa = document.createTextNode("Nenhuma conta foi registrada");
    aviso.append(textoa);
    lista.append(aviso);
    return;
  }

  for (var i = 0; i < this.contas.length; i++) {
    criaDivContas(this.contas[i]);
  }
  
}

function criaDivContas(infos) {
  var div = document.createElement("div");
  var paragrafoNome = document.createElement("p");
  var paragrafoNum = document.createElement("p");
  var paragrafoTipo = document.createElement("p");
  var paragrafoSaldo = document.createElement("p");
  var nome = document.createTextNode("Nome: " + infos.conta.getNome());
  var num = document.createTextNode("Numero: " + infos.conta.getNum());
  var tipo = document.createTextNode("Tipo: " + infos.tipo);
  var saldo = document.createTextNode("Saldo: R$" + infos.conta.getSaldo());

  paragrafoNome.append(nome);
  paragrafoNum.append(num);
  paragrafoTipo.append(tipo);
  paragrafoSaldo.append(saldo);

  div.append(paragrafoNome);
  div.append(paragrafoNum);
  div.append(paragrafoTipo);
  div.append(paragrafoSaldo);

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
      this.contas[i].conta.sacar(parseFloat(valor.value));
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
      this.contas[i].conta.depositar(parseFloat(valor.value));
    }
  }

  if(flag == 0) {
    alert("Conta inexistente");
    return;
  }

  num.value = '';
  valor.value = '';
}

function extrato() {
  this.openPopup();
  var num = document.getElementById("numExt");
  var flag = 0;
  var extrato;

  if (num.value == '') {
    alert("Você precisa especificar uma conta");
    return;
  }

  for (var i = 0; i < this.contas.length; i++) {
    if(this.contas[i].conta.getNum() == num.value) {
      flag = 1;

      this.contas[i].contE++;
      if(this.contas[i].tipo == "Basica") {
        if(this.contas[i].contE > 3) {
          this.contas[i].conta.opExcedente();
        }
      } else if(this.contas[i].tipo == "Estudante") {
        if(this.contas[i].contE > 1) {
          this.contas[i].conta.opExcedente();
        }
      }
      
      extrato = this.contas[i].conta.getExtrato();
    }
  }

  if(flag == 0) {
    alert("Conta inexistente");
    return;
  }

  var ext = document.getElementById("lista");
  ext.innerHTML = '';

  if(extrato.length == 0) {
    var aviso = document.createElement("h3");
    var textoa = document.createTextNode("Nenhuma operação foi realizada ainda");
    aviso.append(textoa);
    ext.append(aviso);
    num.value = '';
    return;
  }

  for (var i = 0; i < extrato.length; i++) {
    criaDivExt(extrato[i]);
  }

  num.value = '';
}

function criaDivExt(infos) {
  var div = document.createElement("div");
  var paragrafoTipo = document.createElement("p");
  var paragrafoValor = document.createElement("p");
  var tipo = document.createTextNode("Operação: " + infos.tipo);
  var valor = document.createTextNode("Valor: R$" + infos.qntd);

  paragrafoTipo.append(tipo);
  paragrafoValor.append(valor);

  div.append(paragrafoTipo);
  div.append(paragrafoValor);

  var ext = document.getElementById("lista");
  ext.append(div);
}

function transferencia() {
  var numRem = document.getElementById("numRem");
  var numDest = document.getElementById("numDest");
  var valor = document.getElementById("valorTrans");
  var flag = 0;

  if (numRem.value == '' && numDest.value == '' && valor.value == '') {
    alert("Você precisa preencher todos os campos");
    return;
  }

  for (var i = 0; i < this.contas.length; i++) {
    if(this.contas[i].conta.getNum() == numRem.value) {
      flag++;
    } else if(this.contas[i].conta.getNum() == numDest.value) {
      flag++;
    }
  }

  if(flag < 2) {
    alert("Conta inexistente");
    return;
  }

  for (var i = 0; i < this.contas.length; i++) {
    if(this.contas[i].conta.getNum() == numRem.value) {
      this.contas[i].contT++;
      if(this.contas[i].tipo == "Basica") {
        if(this.contas[i].contT > 3) {
          this.contas[i].conta.opExcedente();
        }
      } else if(this.contas[i].tipo == "Estudante") {
        if(this.contas[i].contT > 1) {
          this.contas[i].conta.opExcedente();
        }
      }
      this.contas[i].conta.transfere('S', parseFloat(valor.value));

    } else if(this.contas[i].conta.getNum() == numDest.value) {
      this.contas[i].conta.transfere('E', parseFloat(valor.value));
    }
  }
  alert("Transferência realizada com sucesso!");

  numRem.value = '';
  numDest.value = ''; 
  valor.value = '';
}

function reset() {
  for (var i = 0; i < this.contas.length; i++) {
    this.contas[i].contE = 0;
    this.contas[i].contT = 0;
  }
  alert("Mês avançado com sucesso");
}

function openPopup() {
  var pop = document.getElementById("pop");
  pop.classList.add("open-pop");
}

function closePopup() {
  var pop = document.getElementById("pop");
  pop.classList.remove("open-pop");
}