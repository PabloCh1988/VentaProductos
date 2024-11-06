function ObtenerVentas() {
    fetch('https://localhost:7245/Ventas')
    .then(response => response.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

 
function MostrarVentas(data) {
    let tbody = document.getElementById('todasLasVentas');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdId = document.createTextNode(element.id);
        td0.appendChild(tdId);

        let td1 = tr.insertCell(1);
        let tdFecha = document.createTextNode(element.fechaVenta);
        td1.appendChild(tdFecha);

        let td2 = tr.insertCell(2);
        let estadoFinalizada = element.finalizada ? "Finalizado" : "Pendiente";
        let tdFinalizada = document.createTextNode(estadoFinalizada);
        td2.appendChild(tdFinalizada);

        let td3 = tr.insertCell(3);
        let tdCliente = document.createTextNode(element.clienteId);
        td3.appendChild(tdCliente);


        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarVentaId(${element.id})`);
        let td4 = tr.insertCell(4);
        td4.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarVenta(${element.id})`);
        let td5 = tr.insertCell(5);
        td5.appendChild(btnEliminar);

        let btnDetalle = document.createElement('button');
        btnDetalle.innerText = 'Detalle';
        btnDetalle.setAttribute('class', 'btn btn-success');
        btnDetalle.setAttribute('onclick', `BuscarProductosDetalle(${element.id})`);
        let td6 = tr.insertCell(6);
        td6.appendChild(btnDetalle);
    });
}

function CrearVenta() {
    const clienteId = document.getElementById("Cliente").value;

    let venta = {
        fechaVenta: document.getElementById("Fecha").value,
        finalizada: document.getElementById("Finalizada").checked,
        clienteId: clienteId,
        cliente: null,
        detalleVenta: null,

    };

    fetch('https://localhost:7245/Ventas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(venta)
        }
    )
    .then(response => response.json())
    .then(data =>{
        // if(data.status == undefined){
            document.getElementById("Fecha").value = "";
            document.getElementById("Finalizada").checked = false;
            document.getElementById("Cliente").value = 0;

            $('#modalAgregarVentas').modal('hide');
            ObtenerVentas();
        // } else {
        //     mensajesError('#error', data);
        // }
            
    })
    .catch(error => console.log("Hubo un error al guardar la venta, verifique el mensaje de error: ", error))
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
    let idVenta = document.getElementById("IdVenta")

    let editarVenta = {
        id: idVenta,
        fechaVenta: document.getElementById("FechaEditar").value,
        finalizada: document.getElementById("FinalizadaEditar").checked,
        idCliente: document.getElementById("ClienteEditar").value,
        cliente: null,
    }

    fetch(`https://localhost:7245/Ventas/${idVenta}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarVenta)
    })
    .then(data => { 
        if(data.status == undefined) {

            document.getElementById("IdVenta").value = 0;
            document.getElementById("FechaEditar").value = "";
            document.getElementById("FinalizadaEditar").checked = false;
            document.getElementById("ClienteEditar").value = 0;
            $('#modalEditarVentas').modal('hide');
            ObtenerVentas();
        }
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

function BuscarProductosDetalle(id) {
    fetch(`https://localhost:7245/DetalleVentas/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(async data => {
            MostrarProductosDetalle(data);
            await ObtenerProductosDropdown();
            FiltrarDropdownProductos();
            document.getElementById("IdVentaDetalle").value = id;
            $('#modalVentaDetalle').modal('show');
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}

function MostrarProductosDetalle(data) {
    $("#todosLosDetalles").empty();
    $.each(data, function (index, item) {
        $('#todosLosDetalles').append(
            `<tr>
                <td>${item.producto.nombreProducto}</td>
            </tr>`
        );
    });
}



function GuardarDetalle() {
    let idVentaDetalle = document.getElementById("IdVentaDetalle").value;
    let guardarDetalle = {
        productoId: document.getElementById("ProductoId").value,
        producto: null,
        ventaId: idVentaDetalle,
    };

    fetch('https://localhost:7245/DetalleVentas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guardarDetalle)
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById("ProductosIdDetalle").value = 0;
            $("#errorDetalle").empty();
            $("#errorDetalle").attr("hidden", true);
            BuscarProductosDetalle(idVentaDetalle);
        })
        .catch(error => console.log("Hubo un error al guardar el detalle, verifique el mensaje de error: ", error));
}