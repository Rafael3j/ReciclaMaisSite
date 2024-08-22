document.addEventListener("DOMContentLoaded", function() {
    const cpfInput = document.getElementById('cpf');

    cpfInput.addEventListener('input', function () {
        formatarCpfDigitado(cpfInput);
    });
})

function Salvar() {
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/coletas",
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
            motivodescarte: $("#motivoDescarte").val()
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