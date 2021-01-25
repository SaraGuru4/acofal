

filename = "../img/default.jpg";
savedFileBase64 = "";


$(document).ready(function () {

	loggedVerify();
	//Logout
	$("#logout").click(logout);

	//Insert tienda
	$("#imagen").change(changeImg);

	//Update tienda
	//$("#imagen2").change(changeImg2);

	//Comentarios href a la sección de comentarios
	$('.comments').on('click', function () {

		$('html, body').animate({
			scrollTop: $("#comentarios").offset().top - 200
		}, 1000);
	});

})


//Sticky menu
var menu = document.querySelector('.botonesAcciones');

var sticky = menu.offsetTop;

window.onscroll = () => {

	//Sticky Menu en el apartado de perfil
	if (window.pageYOffset >= sticky) {

		menu.classList.add('sticky');

		document.querySelector(".botonesAcciones").style.backgroundColor = "white";
		document.querySelector(".botonesAcciones").style.padding = "22px";
		document.querySelector(".botonesAcciones").style.width = "100%";
		document.querySelector(".botonesAcciones").style.marginTop = "-3px";

	} else {
		menu.classList.remove('sticky');

		document.querySelector(".botonesAcciones").style.backgroundColor = "white";
		//Le pongo el padding que tenía antes por defecto en estilos para que vuelva a su tamaño
		document.querySelector(".botonesAcciones").style.padding = "10px";
		document.querySelector(".botonesAcciones").style.marginTop = "0px";
	}
}

function openMenuPerfil() {
	document.getElementById("menu").style.width = "300px";
	document.getElementById("menu").style.transition = "0.5s";
}

function closeMenuPerfil() {
	document.getElementById("menu").style.width = "0px";
}

//Función para volver a los datos de usuario, haciendo un display:none a todo lo demás 

function volveraDatosPersonales() {

	$("#usuarios").hide();
	$("#zonaUsuario").show();
	$(".volveraDatos").hide();
	$("#formUpdate").hide();
	$("#btnVerUsuarios").show();
	$("#btnVerComentarios").show();
	$("#comentarios").hide();
	$("#btnBuscarUsuario").hide();
	$("#formUpdateDatosPersonales").hide();
	$("#btnUpdateUser").show();
	$("#divFiltro").hide();

}

//Función para volver del formulario a la vista de todos los usuarios
function volveraUsuarios() {

	$("#zonaUsuario").hide();
	$("#usuarios").show();
	$("#formUpdate").hide();
	$("#btnBuscarUsuario").show();


}
//Función para ver los comentarios, al hacer click en botón comentarios
function verComentarios() {
	$("#usuarios").hide();

	$("#formUpdate").hide();
	$("#formUpdateDatosPersonales").hide();
	$("#zonaUsuario").show();
	$("#btnBuscarUsuario").hide();
}

//Verificamos si el usuario está conectado
function loggedVerify() {
	var url = "../../controller/cLoggedVerify.php";

	fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		} //input data
	})
		.then(res => res.json()).then(result => {

			console.log(result);

			var usuario = result.user;

			if (result.error == "no error") {
				$("#perfil").show();
				$(".botonLogout").show();
				$(".botonLogin").hide();
				$("#registrate").hide();
				$(".barra").hide();

				if (usuario.admin == 0 || usuario.admin == 1) {
					zonaAdministrador(usuario);
				} else {
					zonaAdminTienda(usuario);
				}
				//	mostrarVentas();

			} else {
				window.location.href = "../../index.html";
			}
		})
		.catch(error => console.error('Error status:', error));
}

function zonaAdministrador(usuario) {

	var usuarioDatos = "";

	if (usuario.admin == 0) {
		usuarioDatos = `<div class='col-12'>
		       <div class='header'>
			     <h1 class='nombreUsuario'>Tu cuenta, ${usuario.nombreUsuario}&nbsp${usuario.nombreUsuario}<h1>
				 <img src='https://www.w3schools.com/howto/img_avatar.png' class='avatar'>
				 <ul class='datosUsuario'>
				 <li><u>Id</u>: ${usuario.idUsuario}</li>
				  <li><u>Nombre</u>: ${usuario.nombreUsuario}</li>
				  <li><u>Apellido</u>: ${usuario.apellidos}</li>
				  <li><u>Correo electrónico</u>: ${usuario.correo}</li>
				  <li><u>Contraseña actual</u>: ${usuario.password}</li>
				  <li><u>Administrador</u>: ${usuario.admin}, usuario estándar</li>
				</ul>
			  </div>
			</div>`;
	}

	if (usuario.admin == 1) {
		usuarioDatos = `<div class='col-12'>
		       <div class='header'>
			     <h1 class='nombreUsuario'>Tu cuenta, ${usuario.nombreUsuario}&nbsp${usuario.nombreUsuario}<h1>
				 <img src='https://www.w3schools.com/howto/img_avatar.png' class='avatar'>
				 <ul class='datosUsuario'>
				 <li><u>Id</u>: ${usuario.idUsuario}</li>
				  <li><u>Nombre</u>: ${usuario.nombreUsuario}</li>
				  <li><u>Apellido</u>: ${usuario.apellidos}</li>
				  <li><u>Correo electrónico</u>: ${usuario.correo}</li>
				  <li><u>Contraseña actual</u>: ${usuario.password}</li>
				  <li><u>Administrador</u>: ${usuario.admin}, eres administrador de la asociación</li>
				</ul>
			  </div>
			</div>`;

	}

	$("#zonaUsuario").html(usuarioDatos);
	$(".modificartienda").hide();
	$(".eliminartienda").hide()

	//TODAS LAS ACCIONES DEL USUARIO EN EL PERFIL

	//Ver todos los usuarios de la BBDD
	$("#btnVerUsuarios").click(function () {
		verUsuarios(usuario);
		//Botónes nav
		$("#btnVerUsuarios").hide();
		$(".volveraDatos").show();
		$("#btnVerComentarios").show();
		$("#btnBuscarUsuario").show();
		$("#btnUpdateUser").show();

		$("#zonaUsuario").hide();
		$("#usuarios").show();
		$("#comentarios").hide();
		$("#formUpdate").hide();
		$("formUpdateDatosPersonales").hide();

	})

	//Lupa ver usuarios
	$("#btnBuscarUsuario").click(function () {
		$("#divFiltro").show();
	})

	$('#btnVerComentarios').click(function () {
		//Boton nav comentarios
		$("#btnVerComentarios").hide();
		$("#btnVerUsuarios").show();
		$("#btnBuscarUsuario").hide();
		$("#btnUpdateUser").show();
		$("#formUpdateDatosPersonales").hide();

		$(".volveraDatos").show();
		$("#zonaUsuario").hide();
		$("#usuarios").hide();
		$("#comentarios").show();
		$("#btnBuscarUsuario").hide();
		$("#divFiltro").hide();

		verComentarios(usuario);
	})

	//Actualizar datos del usuario, botón navbar

	$("#btnUpdateUser").click(function () {
		//Boton nav comentarios
		$("#btnVerComentarios").show();
		$("#btnVerUsuarios").show();
		$("#btnBuscarUsuario").hide();
		$("#btnUpdateUser").hide();

		$("#formUpdateDatosPersonales").show();
		$("#formUpdate").hide();
		$(".volveraDatos").show();
		$("#zonaUsuario").hide();
		$("#usuarios").hide();
		$("#comentarios").hide();
		$("#divFiltro").hide();


		//Metemos los datos de usuario en el form
		$("#datosusuarioform").html("Tus datos, " + usuario.nombreUsuario);
		$("#id_inputpersonal").val(usuario.idUsuario)
		$("#admin_inputpersonal").val(usuario.admin)
		$("#nombre_inputpersonal").val(usuario.nombreUsuario)
		$("#apellido_inputpersonal").val(usuario.apellidos)
		$("#correo_inputpersonal").val(usuario.correo)
		$("#password_inputpersonal").val(usuario.password)

	})

	//Cuando le demos a aceptar en el formulario de datos personales
	$("#aceptarPersonal").click(function () {
		execUpdatepersonal();
	})

}

function zonaAdminTienda(usuario) {

	var usuarioDatos = "";

	if (usuario.admin == 2) {

		usuarioDatos = `<div class='botonesAcciones'>
		<h3>Elija la operación que desea realizar:</h3>
		  <button class='btn btn-success' id='insertartienda'>Insertar tienda</button>
		  <button class='btn btn-warning' id='actualizartienda'>Actualizar tienda</button>
		  <button class='btn btn-danger' id='eliminartienda'>Eliminar tienda</button>
		 </div><div class='col-12'>
		<div class='header'>
		  <h1 class='nombreUsuario'>Tu cuenta, ${usuario.nombreUsuario}&nbsp${usuario.nombreUsuario}<h1>
		  <img src='https://www.w3schools.com/howto/img_avatar.png' class='avatar'>
		  <ul class='datosUsuario'>
		  <li><u>Id</u>: ${usuario.idUsuario}</li>
		   <li><u>Nombre</u>: ${usuario.nombreUsuario}</li>
		   <li><u>Apellido</u>: ${usuario.apellidos}</li>
		   <li><u>Correo electrónico</u>: ${usuario.correo}</li>
		   <li><u>Contraseña actual</u>: ${usuario.password}</li>
		   <li><u>Administrador</u>: ${usuario.admin}, eres administrador de las tiendas</li>
		   
		 </ul>
	   </div>
	 </div>`;

	}
	$("#zonaUsuario").html(usuarioDatos);
	$(".modificartienda").hide();
	$(".eliminartienda").hide()
	//-------------------ACCIONES DEL ADMINISTRADOR 2---------------------

	//Mostrar formulario para actualizar insertar la tienda
	$("#insertartienda").click(function () {

		$("#formNuevaTienda").show();
		$("#zonaUsuario").hide();
	})

	//Modificar tienda
	$("#actualizartienda").click(function () {

		$(".modificartienda").show();
		$("#zonaUsuario").hide();
		loadShops();

	})

	$("#eliminartienda").click(function () {
		$(".eliminartienda").show();
		$("#zonaUsuario").hide();
		loadShops();
	})


	//Botón aceptar insert
	$("#aceptarinsertTienda").click(function () {
		insertarTienda();
	})
	//Cancelar insert
	$("#cancelarInsertTienda").click(function () {

		$("#formNuevaTienda").hide();
	})
}

function loadShops() {

	var url = "../../controller/cTiendas.php";

	fetch(url, {
		method: 'GET',
	})
		.then(res => res.json()).then(result => {

			console.log(result.list);

			var tiendas = result.list;

			var newRow = "";

			newRow += "<option value='0'>Elige una tienda...</option>";

			for (let i = 0; i < tiendas.length; i++) {

				newRow += "<option value='" + tiendas[i].idTienda + "'>" + tiendas[i].idTienda + " - " + tiendas[i].nombreTienda + "</option>";
			}
			document.getElementById("cmbShopsModify").innerHTML = newRow;
			document.getElementById("cmbShopsDelete").innerHTML = newRow;


			$("#cmbShopsModify").change(function () {

				var idTienda = $(this).children(":selected").attr("id");
				updateShop(idTienda);

				//Mostramos el form de update
				$("#añadirForm").show();

			});

			/* $("#cmbShopsDelete").change(function () {

				var idTienda = $(this).children(":selected").attr("id");
				deleteShop(idTienda);

			}) */

		})
		.catch(error => console.error('Error status:', error));

}

function deleteShop(idTienda) {

	$("#deleteshop").click(function () {

		var url = "../../controller/cDeleteShop.php";
		var idTienda=idTienda;
		var data = { 'idTienda': idTienda };

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: { 'Content-Type': 'application/json' }  // input data
		})

			.then(res => res.json()).then(result => {

				console.log(result.error)

				window.location.reload();
				alert("Tienda eliminada correctamente");
			})
			.catch(error => console.error('Error status:', error));

	})
}

/*Update tienda función: ADMIN2 */

function updateShop(idTienda) {

	var url = "../../controller/cTiendaById.php";
	var data = { 'idTienda': idTienda };

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => res.json()).then(result => {

			var tienda = result.list;

			formulario = " <h1 class='text-center'>"+tienda[0].nombreTienda+"</h1>\
			<div class='underline'> </div>\
			<form>\
			<div class='form-group'>\
			  <label for='exampleInputEmail1'>Nombre de la tienda:<span class='text-danger'>*</span></label>\
			  <input type='text' class='form-control' id='nombreTiendaUpdate'  placeholder='Nombre de la tienda'>\
			</div>\
			<div class='form-group'>\
			  <label for='exampleInputPassword1'>Dirección<span class='text-danger'>*</span></label>\
			  <input type='text' class='form-control' id='direccionTiendaUpdate' placeholder='Dirección'>\
			</div>\
			<div class='form-group'>\
			<label for='exampleInputPassword1'>Teléfono<span class='text-danger'>*</span></label>\
			<input type='text' class='form-control' id='telefonoTiendaUpdate' placeholder='Teléfono'>\
		  </div>\
		  <label for='exampleInputPassword1'>Tipo:<span class='text-danger'>*</span></label>\
		  <input type='text' class='form-control' id='tipoTiendaUpdate' placeholder='Tipo de tienda'>\
			 </div>\
			 <label for='exampleInputPassword1'>Texto:<span class='text-danger'>*</span></label>\
			 <input type='text' class='form-control' id='textoTiendaUpdate' placeholder='Texto'>\
			 </div>\
		  <div class='form-group'>\
		     <div class='col-lg-6 p-3 text-center' id='containerImagen'>\
                   <input type='file' name='imagen' id='imagen' accept='.png,.jpeg,.jpg,.gif'>\
                   <label type='file' for='imagen' class='btn text-white col-lg-5 col-md-4 col-sm-4 col-4' id='btnSubirArchivo'>Subir imagen <i class='fas fa-upload text-white'></i></label>\
                </div>\
                <div class='col-lg-6 p-3 text-center'>\
                    <img src='../img/logos/"+tienda[0].foto+"' id='fotoPerfil'>\
                </div>\
			</div>\
			 </div>\
	       <button  id='btnExecuteUpdateShop' class='btn btn-success'>Modificar tienda</button>\
            </form>";

			$("#añadirForm").html(formulario);

			//Metemos los valores en cada input
			$("#nombreTiendaUpdate").val(tienda[0].nombreTienda);
			$("#direccionTiendaUpdate").val(tienda[0].direccion);
			$("#telefonoTiendaUpdate").val(tienda[0].telefono);
			$("#tipoTiendaUpdate").val(tienda[0].objEscaparate.nombre);
			$("#textoTiendaUpdate").val(tienda[0].texto);
		
			
			//Al hacer click ejecutamos el update
			$("#btnExecuteUpdateShop").click(function () {
				executeUpdateShop(tienda);
			});


		})
		.catch(error => console.error('Error status:', error));

}

/*Insertar tienda función: ADMIN2 */

function insertarTienda() {

	var nombre = $("#nombreTienda").val();
	var direccion = $("#direccionTienda").val();
	var telefono = $("#telefonoTienda").val();

	var texto = $("#textoTienda").val();
	var imagen = filename;
	var url = "../../controller/cTiendas.php";

	permitirInsertTienda = true;
	if (nombre == "" || direccion == "" || telefono == "" || texto == "" || imagen == "") {

		alert("Campos vacios, no se ha podido insertar la nueva tienda");
	} else {//Si no hay datos vacios


		if (permitirInsertTienda = true) {

			var url = "../../controller/cInsertTienda.php";
			var data = {
				'nombre': nombre,
				'direccion': direccion,
				'telefono': telefono,
				'texto': texto,
				'imagen': imagen,
				'filename': filename,
				'savedFileBase64': savedFileBase64,

			};

			//Llamada fetch
			fetch(url, {
				method: 'POST', // or 'POST'
				body: JSON.stringify(data), // data can be `string` or {object}!
				headers: { 'Content-Type': 'application/json' }  // input data
			})
				.then(res => res.json()).then(result => {
					location.reload();
					alert("Tienda insertada correctamente")

				})
				.catch(error => console.error('Error status:', error));
		}
		else {

			alert("Ya existe una tienda con ese nombre o ese teléfono");
		}

	}
}

//Cambia la foto de perfil que esta por defecto en el formulario por la introducida por el usuario
function changeImg() {

	var file = $("#imagen")[0].files[0];

	filename = file.name.toLowerCase();
	filesize = file.size;
	console.log(filename);

	var reader = new FileReader();

	reader.onloadend = function () {
		savedFileBase64 = reader.result;
		$("#fotoPerfil").attr('src', savedFileBase64);
	}

	if (file) {

		reader.readAsDataURL(file);

	} else {

		$("#fotoPerfil").attr('src', '');

	}

}



/*Función para buscar usuarios en el filtro*/
function buscarUsuarios() {

	var input, filter, nombre, cards;
	input = document.getElementById('filtro');
	filter = input.value.toUpperCase();
	//Info
	var elementos = $("#datosusuariocard");
	//Todas las cards por el nombre de las cards
	cards = document.getElementsByName("cardUsuario");

	for (let i = 0; i < elementos.length; i++) {

		nombre = elementos[i].outerText;

		if (nombre.toUpperCase().indexOf(filter) > -1) {
			cards[i].style.display = "";
		} else {
			cards[i].style.display = "none";
		}
	}
}

/*Función para cerrar el filtro, hay que resetear*/
function cerrarFiltro() {
	$("#divFiltro").hide();

}

function verUsuarios(usuario) {
	var url = "../../controller/cUsuarios.php";

	fetch(url, {

		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}

	})
		.then(res => res.json()).then(result => {

			var myHtml = "";
			var usuarios = result.list;

			for (let i = 0; i < usuarios.length; i++) {

				if (usuario.admin == 0) {
					myHtml += "<div class='col-md-12' >" +
						"<div class='card  box-shadow' name='cardUsuario' id='card'>" +
						"<div class='card-body'  id='datosusuariocard'>" +
						"<p class='card-text '><u>Id</u>: " + usuarios[i].idUsuario + "</p>" +
						"<b><p class='card-text ' ><u>Nombre</u>: " + usuarios[i].nombreUsuario + "</p></b><br>" +
						"<p class='card-text '><u>Apellido</u>: " + usuarios[i].apellidos + "</p>" +
						"<p class='card-text '><u>Correo electrónico</u>: " + usuarios[i].correo + "</p>" +
						"<p class='card-text '><u>Contraseña</u>: " + usuarios[i].password + "</p>" +
						"<p class='card-text '><u>Administrador</u>: Tipo " + usuarios[i].admin + "</p>" +
						"</div>" +
						"</div>" +
						"</div>"
				} else if (usuario.admin == 1) {
					myHtml += "<div class='col-md-12' >" +
						"<div class='card  box-shadow' name='cardUsuario' id='card'>" +
						"<div class='card-body' id='datosusuariocard'>" +
						"<p class='card-text' ><u>Id</u>: " + usuarios[i].idUsuario + "</p>" +
						"<b><p class='card-text'><u>Nombre</u>: " + usuarios[i].nombreUsuario + "</p></b><br>" +
						"<p class='card-text '><u>Apellido</u>: " + usuarios[i].apellidos + "</p>" +
						"<p class='card-text '><u>Correo electrónico</u>: " + usuarios[i].correo + "</p>" +
						"<p class='card-text '><u>Contraseña</u>: " + usuarios[i].password + "</p>" +
						"<p class='card-text '><u>Administrador</u>: Tipo " + usuarios[i].admin + "</p>" +
						"<div class='accionesUsuario'>" +
						"<button class='btn btn-danger borrarUser' data-id=" + usuarios[i].idUsuario + "><i class='fas fa-trash'></i></button>" +
						"<button class='btn btn-warning updateUser' data-id=" + usuarios[i].idUsuario + " data-nombre=" + usuarios[i].nombreUsuario +
						" data-apellido=" + usuarios[i].apellidos + " data-email=" + usuarios[i].correo + " data-contrasena=" + usuarios[i].password + " data-administrador=" + usuarios[i].admin + "><i class='fas fa-pen'></i></button>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>"
				}

			}
			//Metemos los cards en los usuarios
			$("#usuarios").html(myHtml);

			//Acciones delete/update de los usuarios

			$(".borrarUser").click(function () {
				idUsuario = this.dataset.id;
				borrarUsuario(idUsuario);
			})

			//Botón de modificar de cada usuario
			$(".updateUser").click(function () {
				$("#formUpdate").show();
				$("#usuarios").hide();
				$("#zonaUsuario").hide();
				$("#btnVerComentarios").show();
				$("#btnBuscarUsuario").hide();
				$("#formUpdateDatosPersonales").hide();


				//Ponemos en cada input del form los datos del usuario
				$("#formUpdateUsuario").html("Datos del usuario " + this.dataset.nombre);
				$('#id_input').val(this.dataset.id);
				$('#admin_input').val(this.dataset.administrador);
				$('#nombre_input').val(this.dataset.nombre);
				$('#apellido_input').val(this.dataset.apellido);
				$('#correo_input').val(this.dataset.email);
				$('#password_input').val(this.dataset.contrasena);

			})

			//Al hacer click en aceptar del formulario

			$("#aceptarUpdate").click(function () {
				execUpdate();
				$("#formUpdate").show();
				$("#usuarios").hide();
				$("#zonaUsuario").hide();

			})

		})
		.catch(error => console.error('Error status:', error));
}


function verComentarios(usuario) {

	var url = "../../controller/cComentarios.php";

	fetch(url, {

		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}

	})
		.then(res => res.json()).then(result => {

			var myHtml = "";
			var comentarios = result.list;

			for (let i = 0; i < comentarios.length; i++) {

				if (usuario.admin == 0) {
					myHtml += "<div class='col-md-12  mb-4' >" +
						"<div class='card mb-4 box-shadow' id='cardComentario'>" +
						"<div class='card-body'>" +
						"<p class='card-text '>Título: " + comentarios[i].titulo + "</p>" +
						"<b><p class='card-text '>Texto : " + comentarios[i].texto + "</p></b><br>" +
						"</div>" +
						"</div>" +
						"</div>"
				}
				else if (usuario.admin == 1) {
					myHtml += "<div class='col-md-12  mb-4' >" +
						"<div class='card mb-4 box-shadow' id='cardComentario'>" +
						"<div class='card-body'>" +
						"<p class='card-text '>Título: " + comentarios[i].titulo + "</p>" +
						"<b><p class='card-text '>Texto: " + comentarios[i].texto + "</p></b><br>" +
						"<div class='accionesComentarios'>" +
						"<button class='btn btn-danger borrarComentario' data-id=" + comentarios[i].idComentario + "><i class='fas fa-trash'></i></button>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>";
				}

			}

			//Metemos los cards en los comentarios
			$("#comentarios").html(myHtml);

			$(".borrarComentario").click(function () {
				idComentario = this.dataset.id;
				borrarComentario(idComentario);
			})
		})

		.catch(error => console.error('Error status:', error));

}

function execUpdatepersonal() {

	var idUpdate = $('#id_inputpersonal').val();
	var adminUpdate = $("#admin_inputpersonal").val();
	var nombreUpdate = $("#nombre_inputpersonal").val();
	var apellidoUpdate = $("#apellido_inputpersonal").val();
	var correoUpdate = $("#correo_inputpersonal").val();
	var passwordUpdate = $("#password_inputpersonal").val();


	var url = "../../controller/cUpdateUser.php";
	var data = {
		'idUpdate': idUpdate,
		'adminUpdate': adminUpdate,
		'nombreUpdate': nombreUpdate,
		'apellidoUpdate': apellidoUpdate,
		'correoUpdate': correoUpdate,
		'passwordUpdate': passwordUpdate
	}

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: { 'Content-Type': 'application/json' }  // input data
	})

		.then(res => res.json()).then(result => {

			alert("Información actualizada correctamente");
			window.location.reload();

		})
		.catch(error => console.error('Error status:', error));
}

function execUpdate() {


	var idUpdate = $('#id_input').val();
	var adminUpdate = $("#admin_input").val();
	var nombreUpdate = $("#nombre_input").val();
	var apellidoUpdate = $("#apellido_input").val();
	var correoUpdate = $("#correo_input").val();
	var passwordUpdate = $("#password_input").val();

	var url = "../../controller/cUpdateUser.php";
	var data = {
		'idUpdate': idUpdate,
		'adminUpdate': adminUpdate,
		'nombreUpdate': nombreUpdate,
		'apellidoUpdate': apellidoUpdate,
		'correoUpdate': correoUpdate,
		'passwordUpdate': passwordUpdate
	}

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: { 'Content-Type': 'application/json' }  // input data
	})

		.then(res => res.json()).then(result => {

			alert("Información actualizada correctamente");
			window.location.reload();

		})
		.catch(error => console.error('Error status:', error));
}


function borrarComentario(idComentario) {

	var url = "../../controller/cDeleteComentario.php";

	var data = {
		'idComentario': idComentario,
	}

	if (confirm("¿Estás seguro de que deseas eliminar este comentario?")) {

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			} //input data
		})
			.then(res => res.json()).then(result => {

				alert(result.error);
				location.reload();

			})
			.catch(error => console.error('Error status:', error));
	}
}



function borrarUsuario(idUsuario) {

	var url = "../../controller/cDeleteUser.php";

	var data = {
		'idUsuario': idUsuario,
	}

	if (confirm("¿Estás seguro de que deseas eliminar?")) {


		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			} //input data
		})
			.then(res => res.json()).then(result => {

				alert(result.error);
				location.reload();


			})
			.catch(error => console.error('Error status:', error));
	}
}


function logout() {
	var url = "../../controller/cLogout.php";
	fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		} //input data
	})
		.then(res => res.json()).then(result => {

			console.log(result.error);

			//Acciones
			$("#perfil").hide();
			$(".botonLogout").hide();
			$(".botonLogin").show();

			alert("Has cerrado la sesión, esperamos tenerte de vuelta lo antes posible!");
			window.location.href = "../../index.html";

		})
		.catch(error => console.error('Error status:', error));
}