//const urlBase = "http://localhost:51849";
const urlBase = "http://reciclamaisapp.brazilsouth.cloudapp.azure.com:90";

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const id= params.get("id");
    Carregar(id);
})

function Carregar(id) {
    $.ajax({
        method: "GET",
        url: urlBase + "/api/coleta/buscarPorId/" + id,
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
    document.getElementById('nome').innerText = dados.Nome;
    document.getElementById('enderecoColeta').innerText = dados.EnderecoColeta;
    document.getElementById('cpf').innerText = formatarCpf(dados.Cpf);
    document.getElementById('telefone').innerText = formatarTelefone(dados.Telefone);
    document.getElementById('email').innerText = dados.Email;
    document.getElementById('tipoObjeto').innerText = dados.TipoObjetoDescartado;
    document.getElementById('objetoDescartado').innerText = dados.ObjetoDescartado;
    document.getElementById('responsavelColeta').innerText = dados.ResponsavelColeta;
    document.getElementById('motivoDescarte').innerText = dados.MotivoDescarte;
    document.getElementById('dataColeta').innerText = formatarData(dados.DataHora);
}

function imprimir(){
    $("#divBotoes").hide();
    $("#divRodape").hide();

    window.print();

    $("#divBotoes").show();
    $("#divRodape").show();

}