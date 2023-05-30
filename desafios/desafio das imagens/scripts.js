function fetchOrders(ticker) {
    // BUSCA NA API
    return fetch('https://brapi.dev/api/quote/'+ ticker +'?range=1mo&interval=5d&fundamental=true&dividends=true')
        .then(T => T.json())
}

function pegarResultados (ticker) {
    fetchOrders(ticker).then(res => {
        // PEGA OS ELEMENTOS HTML PELO ID
        var titulo = document.getElementById("ticker")
        var tbody = document.getElementById("tbody")

        // INSERE O TITULO NO HTML
        titulo.innerHTML = res.results[0].shortName

        // PERCORRE CADA ELEMENTO NA LISTA DE HISTORICAL DATA PRICE E INSERE UMA LINHA DE TABELA NO HTML PRA CADA UM
        res.results[0].historicalDataPrice.forEach(el => {
            tbody.innerHTML += `
                    <tr>
                        <td style="border:1px solid black; padding: 1em;">${el.date}</td>
                        <td style="border:1px solid black; padding: 1em;">${el.open}</td>
                        <td style="border:1px solid black; padding: 1em;">${el.close}</td>
                        <td style="border:1px solid black; padding: 1em;">${el.low}</td>
                        <td style="border:1px solid black; padding: 1em;">${el.high}</td>
                    </tr>
            `
        });
    })

}

// PEGA O VALOR DIGITADO PELO USUÁRIO NA PÁGINA E ENTÃO CHAMA A FUNÇÃO ENVIANDO O QUE O USUÁRIO DIGITOU
function pegaTicker() {
    var input = document.getElementById("dado").value
    pegarResultados(input)
}