var jogadores = [];
var numeros_sorteados = [];
var intervalo;
var sorteioEmAndamento = false;
var numerosCartela = [];

function gerarNumerosAleatorios(quantidade, min, max) {
  if (quantidade > (max - min + 1)) {
    console.log("Intervalo insuficiente...");
    return;
  }

  var numeros = [];

  while (numeros.length < quantidade) {
    var aleatorio = Math.floor(Math.random() * (max - min + 1) + min);

    if (!numeros.includes(aleatorio)) {
      numeros.push(aleatorio);
    }
  }

  return numeros;
}

function gerarCartela() {
  var nomeJogador = prompt('Digite o nome do jogador');

  var cartela = [
    gerarNumerosAleatorios(5, 1, 15),
    gerarNumerosAleatorios(5, 16, 30),
    gerarNumerosAleatorios(5, 31, 45),
    gerarNumerosAleatorios(5, 46, 60),
    gerarNumerosAleatorios(5, 61, 75)
  ];

  jogadores.push({
    nomeJogador: nomeJogador,
    cartela: cartela
  });

  desenharCartela(nomeJogador, cartela);

  console.log(jogadores);
}

function desenharCartela(nome, cartela) {
    var div = document.getElementById('espaco_cartelas');
  
    var tabela = document.createElement('table');
  
    var thead = document.createElement('thead');
  
    var tr_nome = document.createElement('tr');
    var td_nome = document.createElement('td');
    td_nome.setAttribute('colspan', '5');
    td_nome.innerText =  nome; // Exibe o nome do jogador
    tr_nome.appendChild(td_nome);
    thead.appendChild(tr_nome);
  
    var thB = document.createElement('th');
    thB.innerText = 'B';
    var thI = document.createElement('th');
    thI.innerText = 'I';
    var thN = document.createElement('th');
    thN.innerText = 'N';
    var thG = document.createElement('th');
    thG.innerText = 'G';
    var thO = document.createElement('th');
    thO.innerText = 'O';
  
    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);
  
    for (var i = 0; i < 5; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 5; j++) {
        var td = document.createElement('td');
        if (i == 2 && j == 2) {
          td.innerText = "X";
          tr.appendChild(td);
        } else {
          td.innerText = cartela[j][i];
          tr.appendChild(td);
        }
      }
      tabela.appendChild(tr);
    }
  
    tabela.appendChild(thead);
    div.appendChild(tabela);
  }
  

function reiniciarJogo() {
    jogadores = [];
    
    var div = document.getElementById('espaco_cartelas');
    div.innerHTML = '';
  
    console.log("Jogo reiniciado!");
  }

 
  function marcarNumeroSorteado(numero) {
    for (var i = 0; i < jogadores.length; i++) {
      var cartela = jogadores[i].cartela;
      for (var j = 0; j < cartela.length; j++) {
        for (var k = 0; k < cartela[j].length; k++) {
          if (cartela[j][k] === numero) {
            cartela[j][k] = "X";
            break;
          }
        }
      }
    }
  }
  
  
  
  function verificarGanhadores() {
    var ganhadores = [];
    for (var i = 0; i < jogadores.length; i++) {
      var cartela = jogadores[i].cartela;
      var todosMarcados = true;
  
      for (var j = 0; j < cartela.length; j++) {
        for (var k = 0; k < cartela[j].length; k++) {
          if (cartela[j][k] !== "X") {
            todosMarcados = false;
            break;
          }
        }
        if (!todosMarcados) {
          break;
        }
      }
  
      if (todosMarcados) {
        ganhadores.push(jogadores[i]);
      }
    }
    return ganhadores;
  }
  
  
  

function iniciarJogo() {
  if (jogadores.length < 2) {
    alert("É necessário pelo menos dois jogadores para iniciar o jogo.");
    return;
  }

  if (sorteioEmAndamento) {
    alert("O sorteio dos números já está em andamento.");
    return;
  }

  if (jogadores.length === 0) {
    alert("É preciso criar as cartelas antes de iniciar o jogo.");
    return;
  }

  sorteioEmAndamento = true;

  var numerosCartelaDiv = document.getElementById("numeros-sorteados");
  numerosCartelaDiv.innerHTML = "";

  numerosCartela = [];
  var numeroSorteado = 0;
  intervalo = setInterval(function() {
    do {
      numeroSorteado = Math.floor(Math.random() * 75) + 1;
    } while (numerosCartela.includes(numeroSorteado));

    numerosCartela.push(numeroSorteado);
    numerosCartelaDiv.innerHTML += "<div class='numero-sorteado'>" + numeroSorteado + "</div>";

    marcarNumeroSorteado(numeroSorteado);

    var ganhadores = verificarGanhadores();

    if (ganhadores.length > 0) {
      clearInterval(intervalo);
      var nomesGanhadores = ganhadores.map(function(jogador) {
        return jogador.nomeJogador;
      });
      alert("Os jogadores vencedores são: " + nomesGanhadores.join(", "));
      sorteioEmAndamento = false;
      alert("O jogo acabou. Reiniciando.")
      setTimeout(function() {
        reiniciarJogo();
      }, 2500); 
}

    if (numerosCartela.length === 75) {
      clearInterval(intervalo);

      if (ganhadores.length === 0) {
        alert("Não houve ganhadores. O jogo terminou.");
      }

      sorteioEmAndamento = false;
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", function() {
  iniciarJogo();
});
