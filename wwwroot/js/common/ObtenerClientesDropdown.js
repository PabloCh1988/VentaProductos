
function ObtenerClientesDropdown() {
    fetch('https://localhost:7245/Clientes')
    .then(response => response.json())
    .then(data => CompletarDropdown(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}


function CompletarDropdown(data) {
    $("#Cliente").empty();
    $.each(data, function(index, item) {
        $('#Cliente').append(
            "<option value='"+ item.id + "'>" + item.nombreCliente + "</option>"            
        )
    })

    $("#ClienteEditar").empty();
    $.each(data, function(index, item) {
        $('#ClienteEditar').append(
            "<option value='"+ item.id + "'>" + item.nombreCliente + "</option>"            
        )
    })
}