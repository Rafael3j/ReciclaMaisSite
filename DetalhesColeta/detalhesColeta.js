document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const id= params.get("id");
    Carregar(id);
})

function Carregar(id) {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/coletas/" + id,
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

function PreencherDados(dados) {
    document.getElementById('nome').innerText = dados.nome;
    document.getElementById('cpf').innerText = formatarCpf(dados.cpf);
    document.getElementById('telefone').innerText = formatarTelefone(dados.telefone);
    document.getElementById('email').innerText = dados.email;
    document.getElementById('tipoObjeto').innerText = dados.tipoobjetodescartado;
    document.getElementById('objetoDescartado').innerText = dados.objetodescartado;
    document.getElementById('responsavelColeta').innerText = dados.responsavelcoleta;
    document.getElementById('motivoDescarte').innerText = dados.motivodescarte;
    document.getElementById('dataColeta').innerText = formatarData(dados.datahora);
}