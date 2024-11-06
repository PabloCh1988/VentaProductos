

// function ObtenerProductosDropdown() {
//     fetch('https://localhost:7245/Productos')
//         .then(response => response.json())
//         .then(async data => {
//             localStorage.setItem("productos", JSON.stringify(data));
//         })
//         .catch(error => console.log("No se pudo acceder al servicio.", error));
// }

// function FiltrarDropdownProductos() {
//     let todosProductos = localStorage.getItem("productos");
//     todosProductos = JSON.parse(todosProductos);

//     $('#ProductoId').empty();
//     todosProductos.forEach(item => {
//         $('#ProductoId').append(
//             `<option value='${item.id}'>${item.nombreProducto}</option>`
//         );
//     });
// }
function ObtenerProductosDropdown() {
    fetch('https://localhost:7245/Productos')
    .then(response => response.json())
    .then(data => FiltrarDropdownProductos(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}


function FiltrarDropdownProductos(data) {
    $("#ProductoId").empty();
    $.each(data, function(index, item) {
        $('#ProductoId').append(
            "<option value='"+ item.id + "'>" + item.nombreProducto + "</option>"            
        )
    })
}