<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Administrador de Pacientes</title>
    <link rel="stylesheet" href="dist/output.css">
</head>
<body class="bg-gray-100 h-screen">
      <h1 class="font-black text-5xl text-center md:w-2/3 mx-auto mt-20">
          Seguimiento Pacientes
          <span class="text-indigo-700">Veterinaria</span>
      </h1>

      <div class="mt-12 md:flex container mx-auto ">
          <div class="md:w-1/2 lg:w-2/5 mx-5">
            <h2 class="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p class="text-lg mt-5 text-center mb-10">
                Añade Pacientes y
                <span class="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form 
                id="formulario-cita"
                class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                <div class="mb-5">
                    <label for="paciente" class="block text-gray-700 uppercase font-bold text-sm">
                        Nombre Paciente:
                    </label>
                    <input
                        class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        id="paciente"
                        placeholder="Nombre Paciente"
                        name="paciente"
                    />  
                </div>

                <div class="mb-5">
                    <label for="propietario" class="block text-gray-700 uppercase font-bold text-sm">
                        Nombre Propietario:
                    </label>
                    <input
                        class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        id="propietario"
                        placeholder="Nombre Propietario"
                        name="propietario"
                    />  
                </div>
                <div class="mb-5">
                    <label for="email" class="block text-gray-700 uppercase font-bold text-sm">
                        Email Contacto
                    </label>
                    <input
                        class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="email"
                        id="email"
                        placeholder="E-mail Contacto"
                        name="email"
                    />  
                </div>

                <div class="mb-5">
                    <label for="fecha" class="block text-gray-700 uppercase font-bold text-sm">
                        Fecha Alta
                    </label>
                    <input
                        class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="date"
                        id="fecha"
                        name="fecha"
                    />  
                </div>

                <div class="mb-5">
                    <label for="sintomas" class="block text-gray-700 uppercase font-bold text-sm">
                        Síntomas
                    </label>
                    <textarea
                        class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="sintomas"
                        name="sintomas"
                        placeholder="Síntomas del Paciente"
                    ></textarea>  
                </div>

                <input
                    type="submit"
                    class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Registrar Paciente'
                />
              </form>
          </div>

          <div class="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
              <h2 class="font-black text-3xl text-center">Listado Pacientes</h2>
              <p class="text-xl mt-5 mb-10 text-center">
                  Administra tus
                  <span class="text-indigo-600 font-bold ">Pacientes y Citas</span>
              </p>
              <div id="citas">
                  <p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>
              </div>
          </div>
      </div>

      <footer class="text-center  text-white bg-indigo-600 p-2">
        <p>&copy; <span class="font-bold">Miguel Angel Suarez Pluma.</span>  <?php echo(date('Y') ); ?> | Todos los derechos reservados</p>
    </footer>

      <script src="js/app.js"></script>
</body>
</html>
