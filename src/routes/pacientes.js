const { Router } = require("express"); // Importa el módulo Router de Express para crear rutas
const router = Router(); // Crea una nueva instancia del router
const Paciente = require("../routes/models/Paciente.js"); // Importa el modelo Paciente desde el archivo especificado
const { where } = require("sequelize");

// Define una ruta GET en el router para la raíz ('/')
router.get("/pacientes", async (req, res) => {
  try {
    const pacientes = await Paciente.findAll(); // Obtiene todos los registros de la tabla Pacientes
    res.json(pacientes); // Envía los registros obtenidos como respuesta en formato JSON
  } catch (error) {
    console.error(error); // Imprime cualquier error en la consola
    res.status(500).send("Error al intentar mostrar los pacientes"); // Envía una respuesta de error 500 si ocurre un error
  }
});

router.get("/paciente/:id", async (req, res) => {
  try {
    const paciente = await Paciente.findOne({
      where: { id: req.params.id },
    });

    if (paciente) {
      res.json(paciente); // Devuelve el paciente encontrado en formato JSON
    } else {
      res
        .status(404)
        .json({ msg: "No se encontró el paciente en la base de datos" });
    }
  } catch (error) {
    console.error("Error al intentar mostrar paciente por ID:", error);
    res.status(500).send("Error al intentar mostrar paciente por ID");
  }
});

router.post("/crearpaciente", async (req, res) => {
  // Define una ruta POST en '/crear' para crear un nuevo paciente
  try {
    const crear = await Paciente.create(req.body); // Intenta crear un nuevo paciente con los datos enviados en el cuerpo de la solicitud (req.body)
    res.json(crear); // Si la creación es exitosa, responde con los datos del paciente creado en formato JSON
  } catch (error) {
    res.status(500).send("Error al intentar crear un nuevo paciente"); // Si ocurre un error, responde con un estado 500 (Internal Server Error) y un mensaje de error
  }
});

router.put("/modificar/:id", async (req, res) => {
  // Define una ruta PUT en '/modificar/:id' para modificar un paciente existente
  try {
    console.log("Numero id ", req.params.id);
    console.log("Body: ", req.body);
    const respuesta = await Paciente.update(req.body, {
      // Intenta actualizar el paciente con los datos enviados en el cuerpo de la solicitud (req.body)
      where: { id: req.params.id }, // Encuentra el paciente por el 'id' especificado en los parámetros de la ruta (req.params.id)
    });
    const valor = respuesta[0];
    if (valor === 1) {
      res.json({ msg: "Se modificó un paciente" }); // Si la actualización es exitosa, responde con un mensaje de confirmación en formato JSON
    } else {
      res.json({ msg: "No se encontro el paciente en base de datos" });
    }
  } catch (error) {
    res.json({ msg: error.message }); // Si ocurre un error, responde con un mensaje de error en formato JSON
  }
});

router.delete("/eliminar/:id", async (req, res) => {
  try {
    const respuesta = await Paciente.destroy({
      where: { id: req.params.id },
    });
    const valor = respuesta;
    console.log("Valor de respuesta: ", valor);
    if (valor === 1) {
      res.json({ msg: "Se Elimino un paciente exitosamente" }); // Si la actualización es exitosa, responde con un mensaje de confirmación en formato JSON
    } else {
      res.json({ msg: "No se encontro el paciente en base de datos" });
    }
    console.log("const: ", respuesta);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
