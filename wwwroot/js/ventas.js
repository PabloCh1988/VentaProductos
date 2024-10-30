function ObtenerVentas() {
    fetch('https://localhost:7245/Ventas')
    .then(response => response.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarVentas(data) {
    $("#todasLasVentas").empty();
    $.each(data, function(index, item) {

        var date = new Date(item.fechaVenta)
        $('#todasLasVentas').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + date.toLocaleString() + "</td>",
            "<td>" + item.finalizada + "</td>",
            "<td>" + item.cliente.nombre + "</td>",
            "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
            "</tr>"
        )
    })
}

function CrearVenta() {

    let venta = {
        fechaVenta: document.getElementById("Fecha").value,
        finalizada: document.getElementById("Finalizada").checked,
        idCliente: document.getElementById("Cliente").value,
        cliente: null,
    };
// console.log(venta)
    fetch('https://localhost:7245/Ventas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(venta)
        }
    )
    // .then(response => response.json())
    .then(data =>{
        // if(data.status == undefined){
            document.getElementById("Fecha").value = "";
            document.getElementById("Finalizada").value = "";
            document.getElementById("Cliente").value = 0;

            $('#modalAgregarVentas').modal('hide');
            ObtenerVentas();
        // } else {
        //     mensajesError('#error', data);
        // }
            
    })
    .catch(error => console.log("Hubo un error al guardar el Cliente nuevo, verifique el mensaje de error: ", error))
}


function EliminarVenta(id) {
    var siElimina = confirm("¿Esta seguro de borrar esta venta?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerVentas();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function BuscarVentaId(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdVenta").value = data.id;
        document.getElementById("FechaEditar").value = data.fechaVenta;
        document.getElementById("FinalizadaEditar").value = data.finalizada;
        document.getElementById("ClienteEditar").value = data.idCliente;

        $('#modalEditarVentas').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function EditarVentas() {


    let editarVenta = {
        id: idVenta,
        fechaVenta: document.getElementById("FechaEditar").value,
        finalizada: document.getElementById("FinalizadaEditar").value,
        
    }

    fetch(`https://localhost:7245/Ventas/${idVenta}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarVenta)
    })
    .then(data => 
        // if(data.status =! undefined  || data.status == 204)
            {

            document.getElementById("IdVenta").value = 0;
            document.getElementById("FechaEditar").value = "";
            document.getElementById("FinalizadaEditar").value = "";
            document.getElementById("ClienteEditar").value = "";
            $('#modalEditarVentas').modal('hide');
            ObtenerVentas();
        // } else {
        //     mensajesError('#errorEditar', data);
        // }
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function(index, item) {
            $(id).append(
                "<ol>",
                "<li>" + item + "</li>",
                "</ol>"
            )
        })
    }
    else{
        $(id).append(
            "<ol>",
            "<li>" + mensaje + "</li>",
            "</ol>"
        )
    }
    
    $(id).attr("hidden", false);
}
