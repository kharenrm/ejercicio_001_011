var log = x => console.log(x);

var zoo = {
	nombre: "El ultimo zoologico",
	ubicacion: {},
	areas: [],
	aforo: 12000,
	numeroVisitante: 0,
	caja: 100000,
	enfermeria: {
		casos: []
	}
};

var ubicacion = {
	dirreccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

function area(nombre, aforo, recintos, animales){
	return {
		nombre: nombre,
		aforoMaximo: aforo,
		recintos: recintos,
	};
}

function recintoDetalles(nombre, animales, capacidad, detalle){
	return {
		nombre: nombre,
		animales: animales,
		capacidad: capacidad,
		detalle: detalle,
		visitantes: []
	};
}

function animales(nombre, especie, salud, hambre, pais){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais
	};
}

var tigreBlanco = animales("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = animales("Tigre", "Felino", 90, 60, "Africa");

var palomas = animales("Palomas", "Avis Chilensis", 100, 100, "Chile");
var flamencos = animales("Flamenco", "Phoenicopteridae", 10, 0, "Colombia");

var tigres = [];
tigres.push(tigreBlanco, tigreNormal);

var aves = [];
aves.push(palomas, flamencos);

var recinto1 = recintoDetalles("Jaula de tigres", tigres, 1200, "Jaula super reforzada con titanium");
var recinto2 = recintoDetalles("Baños", [], 100, "Baños para hombres y mujeres, aptos para personas con discapacidad");
var recinto3 = recintoDetalles("Jaula para aves", aves, 100, "Algunas aves que se pelean a seguido");

var recintoTigres = [];
recintoTigres.push(recinto1, recinto2);

var recintoAves = [];
recintoAves.push(recinto3, recinto2);

var area1 = area("Mamíferos", 5000, recintoTigres);
var area2 = area("Aves", 200, recintoAves);

zoo.ubicacion = ubicacion;
zoo.areas.push(area1, area2);

log(zoo);

var nombrePersonas = ["Victor","Omar", "Karen", "Ariel", "Matias", "Lucy", "Ignacio", "Humberto", "Nestor", "Raymundo"];

function ejecutarCiclo(){
	addPersona();
	revisarAnimales();
	curarAnimalito();
}

function generarNombreAleatorio(){
	var numeroAleatorio = Math.floor(Math.random() * nombrePersonas.length);
	return nombrePersonas[numeroAleatorio];
}

function generarEdadAleatoria(){
	var edad = Math.floor(Math.random() * 100);
	return edad;
}

function generarEstudianteAleatorio() {
   var estudianteAleatorio = Math.round(Math.random());
   return estudianteAleatorio;
}

function modificarSaludAleatoria(animales){
	for(var i=0;i<animales.length;i++){
		var salud = animales[i].salud - Math.round(Math.random() * (20 - (-20)) + (-20));
		if(salud>100){
			animales[i].salud = 100;
		}
	}
	return animales;
}

function revisarAnimales(){
	for(var a=0;a<zoo.areas.length;a++){
		var area = zoo.areas[a];
			for(var r=0;r<area.recintos.length;r++){
				var animales = area.recintos[r].animales;
				for(var an=0; an<animales.length;an++){
					var animal = animales[an];
					console.log(animal);
					revisionVeterinaria(animal, area.recintos[r]);
				}
			}
	}
}

function revisionVeterinaria(animal, recinto){
	if(animal.salud<50){
		console.log("Animalito enfermo :(");
		llevarAenfermeria(animal, recinto);
	} else {
		console.log("Animalito saludable! :D");
	}
}

function llevarAenfermeria(animal, recinto){
	var caso = {
		animal: animal,
		recinto: recinto
	}

	zoo.enfermeria.casos.push(caso);
	var indice = recinto.animales.indexOf(animal);
	recinto.animales.splice(indice, 1);
}

function curarAnimalito(){
	for(var s=0; s<zoo.enfermeria.casos.length; s++){
		var caso = zoo.enfermeria.casos[s];
		caso.animal.salud = caso.animal.salud + 10;
		if(caso.animal.salud>=100){
			darDeAlta(caso);
		}
	}
}

function darDeAlta(caso){
	// devuelto a su recinto
	caso.recinto.animales.push(caso.animal);

	//sacarlo de enfermeria
	var indice = zoo.enfermeria.casos.indexOf(caso);
	zoo.enfermeria.casos.splice(indice, 1);
}

function addPersona(){
	if(zoo.numeroVisitante<zoo.aforo){
		var persona = crearPersona(generarNombreAleatorio(),500, generarEdadAleatoria(), generarEstudianteAleatorio());
		cobrarEntrada(persona);
		var recintoLibre = primerRecintoLibre();
		recintoLibre.visitantes.push(persona);
		zoo.numeroVisitante++;
	} else {
		alert("El Zoo está lleno!");
	}
}

function primerRecintoLibre(){
	var recintoLibre = null;
	for(var a=0;a<zoo.areas.length;a++){
		var area = zoo.areas[a];
			for(var r=0;r<area.recintos.length;r++){
				var recinto = area.recintos[r];
				if(!recintoLibre && recinto.visitantes.length<recinto.capacidad){
					recintoLibre = recinto;
				}
			}
	}
	return recintoLibre;
}

function cobrarEntrada(persona){
	var importeEntrada = 5;
	if(persona.edad>65||persona.edad<14){
		importeEntrada = 0;
	}else{
		if(persona.esEstudiante){
			importeEntrada = 3;
		}
	}

	persona.cartera = persona.cartera - importeEntrada;
}

function crearPersona(nombre, dinero, edad, esEstudiante){
	var persona = {
		nombre: nombre,
		cartera: dinero,
		edad: edad,
		estudiante: esEstudiante
	}
	return persona;
}

function cerrarZoo(){
	clearInterval(intervalID);

	for(var a=0;a<zoo.areas.length;a++){
		var area = zoo.areas[a];
		for(var r=0;r<area.recintos.length;r++){
			var recinto = area.recintos[r];
			recinto.visitantes = [];
		}
	}

	zoo.numeroVisitante = 0;
}

function cambiarSaludDeTodosLosAnimal(){
	for(var a=0;a<zoo.areas.length;a++){
		var area = zoo.areas[a];
		for(var r=0;r<area.recintos.length;r++){
			var animales = area.recintos[r].animales;
			modificarSaludAleatoria(animales);
		}
	}
}

var intervalID = setInterval(ejecutarCiclo, 1000);
