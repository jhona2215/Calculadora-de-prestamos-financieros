document.getElementById("CF").addEventListener("click", cuotasFijas);
document.getElementById("PG").addEventListener("click", periodoGracia);

document.getElementById("monto").addEventListener("keyup", montoKeyup);
document.getElementById("monto").addEventListener("focus", montoFocus);
document.getElementById("monto").addEventListener("blur", montoBlur);

document.getElementById("cedula").addEventListener("blur", cedulaBlur);
document.getElementById("cedula").addEventListener("keyup", cedulaKeyup);
document.getElementById("cedula").addEventListener("focus", cedulaFocus);

document.getElementById("ea").addEventListener("blur", calcularEA);
document.getElementById("na").addEventListener("blur", calcularNA);
document.getElementById("ip").addEventListener("blur", calcularIP);

document.getElementById("ea").addEventListener("keyup", intEA);
document.getElementById("na").addEventListener("keyup", intNA);
document.getElementById("ip").addEventListener("keyup", intIP);

var montoF;
var montoA = 0;
var ipa = 0;
var n = 0;
var glob = 0;
var cedulaG ="";

//------------------------------------------------------
function cuotasFijas(){
	document.getElementById("perGra").style.display = "none";
	document.getElementById("cuota").innerHTML = "Cuota Fija";
	document.getElementById("plazo").innerHTML = '<option>36 Meses</option>'+
										      	'<option>48 Meses</option>'+
										      	'<option>60 Meses</option>'+
										      	'<option>72 Meses</option>'+
										      	'<option>84 Meses</option>';

	document.getElementById("peri").innerHTML = '<option>Mensual</option>'+
					      						'<option>Bimestral</option>';
	document.getElementById("gra").style.display = "none";
	document.getElementById("vs").style.display ="none";
	document.getElementById("cuadro").style.display = "none";
	document.getElementById("cuo").innerHTML = "";
	glob =0;
}

function periodoGracia(){
	document.getElementById("perGra").style.display = "block";
	document.getElementById("cuota").innerHTML = "Periodo de Gracia";
	document.getElementById("plazo").innerHTML = '<option>60 Meses</option>'+
										      	'<option>72 Meses</option>'+
										      	'<option>84 Meses</option>'+
										      	'<option>96 Meses</option>'+
										      	'<option>108 Meses</option>'+
										      	'<option>120 Meses</option>';

	document.getElementById("peri").innerHTML = '<option>Mensual</option>'+
					      						'<option>Trimestral</option>';	
	document.getElementById("gra").style.display = "block";
	document.getElementById("vs").style.display ="none";
	document.getElementById("cuadro").style.display = "none";
	document.getElementById("cuo").innerHTML = "";
	glob=1;							      	
}
//------------------------------------------------------

//------------------------------------------------------
function calcularEA(){
	document.getElementById("alert").innerHTML = "";
	var a = document.getElementById("ea").value;
	var t = parseFloat(a);
	var pp = document.getElementById("plazo").value;
	pp = parseFloat(pp[0]+pp[1]+"");
	if(t<100){
		t = t/100;
		var periodo = document.getElementById("peri").value;
		var per = 0;
		var div = 1;
		if(periodo == "Bimestral"){
			per = 60;
			div = 6;
			n = pp/2;
		} else {
			if(periodo == "Trimestral"){
				per = 90;
				div = 4;
				n = pp/3;
			} else {
				per = 30;
				div = 12;
				n = pp;
			}
		}
		var ip = 100*(Math.pow((1+t),(per/360))-1);
		ipa = ip;
		var no = ip*div;
		document.getElementById("ip").value = ip.toFixed(2);
		document.getElementById("na").value = no.toFixed(2);
	} else {
		document.getElementById("alert").innerHTML = '<div class='+'"alert alert-danger"'+' role="alert">'+
								  						'Las tasas de interes no pueden superar el 100% o el campo estar vacio'+
														'</div>';
		document.getElementById("ea").value = "";
		document.getElementById("na").value = "";
		document.getElementById("ip").value = "";
	}
}

function calcularNA(){
	document.getElementById("alert").innerHTML = "";
	var a = document.getElementById("na").value;
	var t = parseFloat(a);
	var pp = document.getElementById("plazo").value;
	pp = parseFloat(pp[0]+pp[1]+"");
	if(t<100){
		t = t/100;
		var periodo = document.getElementById("peri").value;
		var per = 0;
		var div = 1;
		if(periodo == "Bimestral"){
			per = 60;
			div = 6; 
			n = pp/2;
		} else {
			if(periodo == "Trimestral"){
				per = 90;
				div = 4;
				n = pp/3;
			} else {
				per = 30;
				div = 12;
				n = pp;
			}
		}
		alert(t);
		var ip = 100*(t/div);
		ipa = ip;
		var ea = 100*(Math.pow((1+(ip/100)),(360/per))-1);
		document.getElementById("ip").value = ip.toFixed(2);
		document.getElementById("ea").value = ea.toFixed(2);
	} else {
		document.getElementById("alert").innerHTML = '<div class='+'"alert alert-danger"'+' role="alert">'+
								  						'Las tasas de interes no pueden superar el 100% o el campo estar vacio'+
														'</div>';
		document.getElementById("ea").value = "";
		document.getElementById("na").value = "";
		document.getElementById("ip").value = "";
	}
}

function calcularIP(){
	document.getElementById("alert").innerHTML = "";
	var a = document.getElementById("ip").value;
	var t = parseFloat(a);
	var pp = document.getElementById("plazo").value;
	pp = parseFloat(pp[0]+pp[1]+"");
	if(t<100){
		t = t/100;
		var periodo = document.getElementById("peri").value;
		var per = 0;
		var div = 1;
		if(periodo == "Bimestral"){
			per = 60;
			div = 6;
			n = pp/2;
		} else {
			if(periodo == "Trimestral"){
				per = 90;
				div = 4;
				n = pp/3;
			} else {
				per = 30;
				div = 12;
				n = pp;
			}
		}
		ipa = t;
		var ea = 100*(Math.pow((1+t),(360/per))-1);
		var no = 100*(t*div);
		document.getElementById("ea").value = ea.toFixed(2);
		document.getElementById("na").value = no.toFixed(2);
	} else {
		document.getElementById("alert").innerHTML = '<div class='+'"alert alert-danger"'+' role="alert">'+
								  						'Las tasas de interes no pueden superar el 100% o el campo estar vacio'+
														'</div>';
		document.getElementById("ea").value = "";
		document.getElementById("na").value = "";
		document.getElementById("ip").value = "";
	}
}


function intEA(e){
	var a = document.getElementById("ea").value;
	if((e.keyCode >= 96 && e.keyCode <=105)||(e.keyCode >= 48 && e.keyCode <=57)||e.keyCode==190){
		var k =0;
		for (var i = 0; i < a.length; i++) {
			if(a[i] == '.'){
				k++;
			}
		}
		if(k>1){
			document.getElementById("ea").value = a.substr(0,a.length-1);
		}
	} else {
		document.getElementById("ea").value = a.substr(0,a.length-1);
	}
}

function intNA(e){
	var a = document.getElementById("na").value;
	if((e.keyCode >= 96 && e.keyCode <=105)||(e.keyCode >= 48 && e.keyCode <=57)||e.keyCode==190){
		var k =0;
		for (var i = 0; i < a.length; i++) {
			if(a[i] == '.'){
				k++;
			}
		}
		if(k>1){
			document.getElementById("na").value = a.substr(0,a.length-1);
		}
	} else {
		document.getElementById("na").value = a.substr(0,a.length-1);
	}
}

function intIP(e){
	var a = document.getElementById("ip").value;
	if((e.keyCode >= 96 && e.keyCode <=105)||(e.keyCode >= 48 && e.keyCode <=57)||e.keyCode==190){
		var k =0;
		for (var i = 0; i < a.length; i++) {
			if(a[i] == '.'){
				k++;
			}
		}
		if(k>1){
			document.getElementById("ip").value = a.substr(0,a.length-1);
		}
	} else {
		document.getElementById("ip").value = a.substr(0,a.length-1);
	}
}


//------------------------------------------------------


//------------------------------------------------------
function cedulaKeyup(e){
	var cedula = document.getElementById("cedula").value;
	if(!((e.keyCode >= 96 && e.keyCode <=105)||(e.keyCode >= 48 && e.keyCode <=57))|| cedula.length > 10){
		if(e.keyCode>18){
			document.getElementById("cedula").value = cedula.substr(0,cedula.length-1);
		}
	}
}
function cedulaBlur(){
	var cedula = document.getElementById("cedula").value;
	cedulaG = cedula;
	var a ="";
	var k =0;
	for (var i = cedula.length - 1; i >= 0; i--) {
		k++;
		a = cedula[i]+a;
		if(k==3 && i!=0){
			k=0;
			a = "."+a;
		}
	}
	document.getElementById("cedula").value = a;
} 
function cedulaFocus(){
	var a ="";
	var cedula = document.getElementById("cedula").value;
	for (var i = 0; i < cedula.length; i++) {
		if(cedula[i] != "."){
			a+=cedula[i];
		}
	}
	document.getElementById("cedula").value = a;
}

function montoKeyup(e){
	var monto = document.getElementById("monto").value;
	if((e.keyCode >= 96 && e.keyCode <=105)||(e.keyCode >= 48 && e.keyCode <=57)||e.keyCode==188){
		var k =0;
		for (var i = 0; i < monto.length; i++) {
			if(monto[i] == ','){
				k++;
			}
		}
		if(k>1){
			document.getElementById("monto").value = monto.substr(0,monto.length-1);
		} else {
			var mn = monto.replace(",",".");
			montoF = parseFloat(mn);
		}
	} else {
		if(e.keyCode>18){
			document.getElementById("monto").value = monto.substr(0,monto.length-1);
		} else {
			var mn = monto.replace(",",".");
			montoF = parseFloat(mn);
		}
	}
}

function montoFocus(){
	var monto = document.getElementById("monto").value;
	for (var i = 0; i < monto.length; i++) {
		monto = monto.replace(".","");
	}
	document.getElementById("monto").value = monto;
}

function montoBlur(){
	var monto = document.getElementById("monto").value;
	for (var i = 0; i < monto.length; i++) {
		monto = monto.replace(".","");
	}
	var m = monto;
	m = m.replace(",",".");
	montoA = parseFloat(m);
	var a = monto.indexOf(",");
	if(a==-1){
		var b ="";
		var k =0;
		for (var i = monto.length - 1; i >= 0; i--) {
			k++;
			b = monto[i]+b;
			if(k==3 && i!=0){
				k=0;
				b = "."+b;
			}
		}
		document.getElementById("monto").value = b;
	} else {
		var b ="";
		var k =0;
		for (var i = a-1; i >= 0; i--) {
			k++;
			b = monto[i]+b;
			if(k==3 && i!=0){
				k=0;
				b = "."+b;
			}
		}
		var p = "";
		for (var i = a; i < monto.length; i++) {
			p+=monto[i];
		}
		document.getElementById("monto").value = b+p;
	}
}
//---------------------------------------------------

