class Conta {
  constructor(num, nome) {
    this.num = num;
    this.nome = nome;
    this.saldo = 0;
    this.extrato = [];
  }

  setNum(newNum) {
    this.num = newNum;
  }

  getNum() {
    return this.num;
  }

  setNome(newNome) {
    this.nome = newNome;
  }

  getNome() {
    return this.nome;
  }

  getSaldo() {
    return this.saldo;
  }

  getExtrato() {
    return this.extrato;
  }

  depositar(valor) {
    this.saldo += valor; 
    var novo = {
      tipo: "Depósito",
      qntd: valor,
    }
    this.extrato.push(novo);
    alert("Depósito realizado com sucesso!");
  }

  transfere(ES,valor) {
    if(ES == 'E') {
      this.saldo += valor;
      var novo = {
        tipo: "Transferência (Entrada)",
        qntd: valor,
      }
      this.extrato.push(novo);
    } else {
      this.saldo -= valor;
      var novo = {
        tipo: "Transferência (Saída)",
        qntd: valor,
      }
      this.extrato.push(novo);
    }
  }
}

class Platinum extends Conta {
  sacar(valor) {
    this.saldo -= valor;
    var novo = {
      tipo: "Saque",
      qntd: valor,
    }
    this.extrato.push(novo);
    alert("Saque realizado com sucesso!");
  }
}

class Basica extends Conta {
  sacar(valor) {
    if(valor > 1000) {
      alert("Seu saque ultrapassa o limite");
      return;
    }

    this.saldo -= valor;
    var novo = {
      tipo: "Saque",
      qntd: valor,
    }
    this.extrato.push(novo);
    alert("Saque realizado com sucesso!");
  }

  opExcedente() {
    this.saldo -= 0.5;
    var novo = {
      tipo: "Operação excedente",
      qntd: 0.5,
    }
    this.extrato.push(novo);
  }
}

class Estudante extends Conta {
  sacar(valor) {
    if(valor > 300) {
      alert("Seu saque ultrapassa o limite");
      return;
    }

    this.saldo -= valor;
    var novo = {
      tipo: "Saque",
      qntd: valor,
    }
    this.extrato.push(novo);
    alert("Saque realizado com sucesso!");
  }

  opExcedente() {
    this.saldo -= 0.5;
    var novo = {
      tipo: "Operação excedente",
      qntd: 0.5,
    }
    this.extrato.push(novo);
  }
}