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