function ObtenerVentas() {
    fetch('https://localhost:7245/Ventas')
    .then(response => response.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

// function MostrarVentas(data) {
//     let tbody = document.getElementById('todosLasVentas');
//     tbody.innerHTML = '';

//     data.forEach(element => {
//         let tr = tbody.insertRow();

//         let td0 = tr.insertCell(0);
//         let tdId = document.createTextNode(element.id);
//         td0.appendChild(tdId);

//         let td1 = tr.insertCell(1);
//         let tdFecha = document.createTextNode(element.fechaVenta);
//         td1.appendChild(tdFecha);

//         let td2 = tr.insertCell(2);
//         let tdApellido = document.createTextNode(element.apellidoCliente);
//         td2.appendChild(tdApellido);

//         let td3 = tr.insertCell(3);
//         let tdDni = document.createTextNode(element.dni);
//         td3.appendChild(tdDni);

//         let td4 = tr.insertCell(4);
//         let tdSaldo = document.createTextNode(element.saldo);
//         td4.appendChild(tdSaldo);

//         let btnEditar = document.createElement('button');
//         btnEditar.innerText = 'Modificar';
//         btnEditar.setAttribute('class', 'btn btn-info');
//         btnEditar.setAttribute('onclick', `BuscarClienteId(${element.id})`);
//         let td5 = tr.insertCell(5);
//         td5.appendChild(btnEditar);

//         let btnEliminar = document.createElement('button');
//         btnEliminar.innerText = 'Eliminar';
//         btnEliminar.setAttribute('class', 'btn btn-danger');
//         btnEliminar.setAttribute('onclick', `EliminarCliente(${element.id})`);
//         let td6 = tr.insertCell(6);
//         td6.appendChild(btnEliminar);
//     });
// }
function MostrarVentas(data) {
    $("#todasLasVentas").empty();
    $.each(data, function(index, item) {
        $('#todasLasVentas').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + item.fechaVenta + "</td>",
            "<td>" + item.finalizada + "</td>",
            "<td>" + item.idCliente + "</td>",
            "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
            "</tr>"
        )
    })
}

function CrearVenta() {

    let venta = {
        fechaVenta: document.getElementById("Fecha").value,
        finalizada: document.getElementById("Finalizada").value,
        idCliente: document.getElementById("Cliente").value,
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
        if(data.status == undefined){
            document.getElementById("Fecha").value = "";
            document.getElementById("Finalizada").value = "";
            document.getElementById("Cliente").value = 0;

            $('#modalAgregarVentas').modal('hide');
            ObtenerVentas();
        } else {
            mensajesError('#error', data);
        }
            
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
    .then(data => {
        if(data.status =! undefined  || data.status == 204){

            document.getElementById("IdVenta").value = 0;
            document.getElementById("FechaEditar").value = "";
            document.getElementById("FinalizadaEditar").value = "";
            document.getElementById("ClienteEditar").value = "";
            $('#modalEditarVentas').modal('hide');
            ObtenerVentas();
        } else {
            mensajesError('#errorEditar', data);
        }
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