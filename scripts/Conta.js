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

  depositar(valor) {
    this.saldo += valor; 
    var novo = {
      tipo: "Depósito",
      qntd: valor,
    }
    this.extrato.push(novo);
    alert("Depósito realizado com sucesso!");
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
}