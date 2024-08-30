//const urlBase = "http://localhost:51849";
const urlBase = "http://reciclamaisapp.brazilsouth.cloudapp.azure.com:90";

function Filtrar() {
    var filtro = "?nome=" + document.getElementById("nome").value

    $.ajax({
        method: "GET",
        url: urlBase + "/api/coleta/buscarPorNome" + filtro,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            PreencherDados(data);
        },
        error: function (xhr, status, error) {
            alert("Erro ao consultar os dados: " + error.message);
        }
    })
}

function PreencherDados(listaDados) {
    const tabela = document.getElementById('gvResultado').getElementsByTagName('tbody')[0];

    tabela.innerHTML = '';

    listaDados.forEach(dado => {
        const novaLinha = tabela.insertRow();

        const id = novaLinha.insertCell(0);
        const nome = novaLinha.insertCell(1);
        const cpf = novaLinha.insertCell(2);
        const telefone = novaLinha.insertCell(3);
        const objetosDescartados = novaLinha.insertCell(4);
        const dataHora = novaLinha.insertCell(5);
        const acoes = novaLinha.insertCell(6);

        id.textContent = dado.Id;
        nome.textContent = dado.Nome;
        cpf.textContent = formatarCpf(dado.Cpf);
        telefone.textContent = formatarTelefone(dado.Telefone);
        objetosDescartados.textContent = dado.ObjetoDescartado;
        dataHora.textContent = formatarData(dado.DataHora);

        const botaoVisualizar = document.createElement('button');
        botaoVisualizar.id = 'btnVisualizar' + dado.Id;
        botaoVisualizar.innerHTML = '<i class="fa fa-eye"></i>';
        botaoVisualizar.className = 'btn btn-icon btn-round btn-info';
        botaoVisualizar.style.marginRight = '10px';
        botaoVisualizar.onclick = function () {
            window.location.href = 'DetalhesColeta/index.html?id=' + dado.Id;
        }

        const botaoExcluir = document.createElement('button');
        botaoExcluir.id = 'btnExcluir' + dado.Id;
        botaoExcluir.innerHTML = '<i class="fa fa-trash"></i>';
        botaoExcluir.className = 'btn btn-icon btn-round btn-danger';
        botaoExcluir.onclick = function () {
            ConfirmarExclusao(dado.Id);
        }

        acoes.appendChild(botaoVisualizar);
        acoes.appendChild(botaoExcluir);
    });
}

function ConfirmarExclusao(id) {
    if (confirm('Deseja realmente excluir este registro?')) {
        Excluir(id);
    }
}

function Excluir(id) {
    $.ajax({
        method: "DELETE",
        url: urlBase + "/api/coleta/remover/" + id,
        success: function () {
            Filtrar();
            alert('Registro excluido com sucesso.')
        },
        error: function (xhr, status, error) {
            console.log(error);
            alert("Erro ao excluir o registro: " + error);
        }
    })
}