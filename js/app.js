//selectores js
const pacienteInput=document.querySelector('#paciente');
const propietarioInput=document.querySelector('#propietario');
const emailInput=document.querySelector('#email');
const fechaInput=document.querySelector('#fecha');
const sintomasInput=document.querySelector('#sintomas');
//mostrar citas
const contenedorCitas=document.querySelector('#citas');
//formulario
const formulario=document.querySelector('#formulario-cita');
//cambia de registrar a actualizar el input del form
const formularioInput=document.querySelector('#formulario-cita input[type="submit"]' );





//creacion de objeto cita

const citaObj={
    id:generarId(),
    paciente:paciente='', 
    propietario:propietario='', 
    email:email='', 
    fecha:fecha='', 
    sintomas:sintomas='',
    /*id:Date.now() Inicialmente tenia un id, lo queria para tener un id de cada cita,
     pero tambien me daba errores con .trim(), por eso lo comente */
};

//eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
//evento submit del fomrulario
formulario.addEventListener('submit', submitCita);


let editando = false;



//siguiente capitulo, todo este código si funciona
class Notificacion{
    constructor({texto, tipo}){
        this.texto=texto,
        this.tipo=tipo,

        this.mostrar();

    }
    

    mostrar(){
        const alerta = document.createElement('DIV');
        alerta.classList.add('text-center','w-full','p-3', 'text-white', 'text-bold', 'uppercase','alert');
        //eliminar alertas duplicadas
        const alertaPrevia= document.querySelector('.alert');
       /* if(alertaPrevia){
            alertaPrevia.remove();
        }
            */

        ////eliminar alertas duplicadas forma moderna
        alertaPrevia?.remove();



        this.tipo==='error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');
        //mensaje de error
        alerta.textContent=this.texto;

        //insertamos en el DOM
        formulario.parentElement.insertBefore(alerta, formulario);
        //pasan 3 segundos y se borra
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}


class AdminCitas{
    constructor(){
        this.citas=[];
    }

    agregar(cita){
        this.citas=[...this.citas, cita];
        
    }

    editar(citaActualizada){
        this.citas=this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada:cita);
        this.mostrar();
    }

    eliminar(id){
        this.citas=this.citas.filter(cita => cita.id !==id);
        this.mostrar();
    }

    mostrar(){
        //LIMPIAMOS EL HTML DE ENTRADA

        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.lastChild);
        }

        //si hay citas 
        if(this.citas.length === 0){
            contenedorCitas.innerHTML=`<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`;
            return
        }

        //Generando citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
        
            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
        
            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone =structuredClone(cita); //clonamos el objeto cita 
            // const clone = {...cita};  con este igual clonamos el objeto y lo mandamos al evento 
            btnEditar.onclick = ()=>{

                cargarEdicion(clone); //se la mandamos ala funcion
                
            };

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnEliminar.onclick = ()=> this.eliminar(cita.id);

            const contenedorBotones=document.createElement('DIV');
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10');

            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);
            contenedorCitas.appendChild(divCita);
        });    

    }
}









function datosCita(e) {
    citaObj[e.target.name]=e.target.value;
    console.log(citaObj);
}

const citas=new AdminCitas();

function submitCita(e){
    
    
    e.preventDefault();



    //forma 2
    if(Object.values(citaObj).some(valor => valor.trim()==='') ){ //con esto validas todo el objecto y haces que no tenga espacios us inputs
        new Notificacion({
            texto:'todos los campos son obligatorios',
            tipo:'error',
            
        });
        return;
    }

    if(editando){
        citas.editar({...citaObj});
        new Notificacion({
            texto:'Paciente Actualizado exitosamente',
            tipo:'exito'
        });
        
    }else{
        citas.agregar({...citaObj}); //realiza una copia del objeto anterior para no sobre escribirlo
        new Notificacion({
            texto:'Paciente registrado exitosamente',
            tipo:'exito',

        })
    }

   
    citas.mostrar();
    formulario.reset();
    reiniciarObjetoCita();
    formularioInput.value='Registrar Paciente'; //cambia el valor del submit boton de registrar a actualizar
    editando=false;

        
}


function reiniciarObjetoCita(){
    //reinciando el objeto a 0

    citaObj.id=generarId(); //genera otro id
    citaObj.paciente='';
    citaObj.propietario='';
    citaObj.email='';
    citaObj.fecha='';
    citaObj.sintomas='';
}

function generarId(){
    return Math.random().toString(36).substring(2)+Date.now(); //genera ids unicos
}


function cargarEdicion(cita){ //esta recibiendo el objeto cita que se creo con el div de insercion
    Object.assign(citaObj, cita)
    pacienteInput.value=cita.paciente;
    propietarioInput.value=cita.propietario;
    emailInput.value=cita.email;
    fechaInput.value=cita.fecha;
    sintomasInput.value=cita.sintomas;

    
    editando=true;

    formularioInput.value='Guardar Cambios'; //cambia el valor del submit boton de registrar a actualizar
}









