//const urlBase = "http://localhost:51849";
const urlBase = "http://reciclamaisapp.brazilsouth.cloudapp.azure.com:90";

document.addEventListener("DOMContentLoaded", function() {
    const cpfInput = document.getElementById('cpf');

    cpfInput.addEventListener('input', function () {
        formatarCpfDigitado(cpfInput);
    });
})

function Salvar() {
    $.ajax({
        method: "POST",
        url: urlBase + "/api/coleta/criar",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            nome: $("#nome").val(),
            cpf: $("#cpf").val(),
            telefone: $("#telefone").val(),
            email: $("#email").val(),
            tipoobjetodescartado: $("#tipoObjeto option:selected").val(),
            objetodescartado: $("#objetosDescardados").val(),
            responsavelcoleta: $("#responsavelColeta").val(),
            motivodescarte: $("#motivoDescarte").val(),
            enderecoColeta: $("#enderecoColeta").val()
        }),
        complete: function (data, xhr, errorThrown) {
            if (xhr === 'success') {
                alert("Dados salvos com sucesso!");
                window.location.href = "../";
            } else {
                alert("Erro ao salvar os dados.");
            }
        },
    })
}