function formatarData(data) {
    const dataApi = new Date(data[0], data[1] - 1, data[2], data[3], data[4], data[5]);

    const dia = String(dataApi.getDate()).padStart(2, '0');
    const mes = String(dataApi.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = dataApi.getFullYear();
    const horas = String(dataApi.getHours()).padStart(2, '0');
    const minutos = String(dataApi.getMinutes()).padStart(2, '0');
    const segundos = String(dataApi.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

function formatarCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
}

function formatarCpfDigitado(input) {
    input.value = input.value.replace(/\D+/g, ''); // remove todos os caracteres não numéricos
    input.value = input.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
}

function formatarTelefone(telefone) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3");
}

function formatarTelefoneDigitado(o) {
    setTimeout(function() {
        const v = mascaraTelefone(o.value);
        if (v !== o.value) {
            o.value = v;
        }
    }, 1);
}

function mascaraTelefone(v) {
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}