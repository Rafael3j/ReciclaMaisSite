function Filtrar() {
    var filtro = "?nome=" + document.getElementById("nome").value

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/coletas/buscarPorNome" + filtro,
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

        id.textContent = dado.id;
        nome.textContent = dado.nome;
        cpf.textContent = formatarCpf(dado.cpf);
        telefone.textContent = formatarTelefone(dado.telefone);
        objetosDescartados.textContent = dado.objetodescartado;
        dataHora.textContent = formatarData(dado.datahora);

        const botaoVisualizar = document.createElement('button');
        botaoVisualizar.id = 'btnVisualizar' + dado.id;
        botaoVisualizar.innerHTML = '<i class="fa fa-eye"></i>';
        botaoVisualizar.className = 'btn btn-icon btn-round btn-info';
        botaoVisualizar.style.marginRight = '10px';
        botaoVisualizar.onclick = function () {
            window.location.href = 'DetalhesColeta/index.html?id=' + dado.id;
        }

        const botaoExcluir = document.createElement('button');
        botaoExcluir.id = 'btnExcluir' + dado.id;
        botaoExcluir.innerHTML = '<i class="fa fa-trash"></i>';
        botaoExcluir.className = 'btn btn-icon btn-round btn-danger';
        botaoExcluir.onclick = function () {
            ConfirmarExclusao(dado.id);
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
        url: "http://localhost:8080/coletas/" + id,
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