const express = require('express');
const router = express.Router();
const Medicos = require("../routes/models/Medicos.js"); // Importa el modelo Paciente desde el archivo especificado

// Crear un médico
router.post('/crearMedico', async (req, res) => {
    try {
        const nuevoMedico = await Medicos.create(req.body);
        res.json(nuevoMedico);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el médico' });
    }
});

// Obtener todos los médicos
router.get('/', async (req, res) => {
    try {
        const medicos = await Medicos.findAll();
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron obtener los médicos' });
        console.log(error)
    }
});

router.get("/medico/:id", async (req, res) => {
    try {
      const medicoid = await Medicos.findOne({
        where: { id: req.params.id },
      }); 
  
      if (medicoid) {
        res.json(medicoid); // Devuelve el paciente encontrado en formato JSON
      } else {
        res
          .status(404)
          .json({ msg: "No se encontró el medico en la base de datos" });
      }
    } catch (error) {
      console.error("Error al intentar mostrar medico por ID:", error);
      res.status(500).send("Error al intentar mostrar medico por ID");
    }
  });

// Actualizar un médico
router.put('/modificarMedico/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const medico = await Medicos.findByPk(id);
        if (medico) {
            await medico.update(req.body);
            res.json(medico);
        } else {
            res.status(404).json({ error: 'Médico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'No se pudo actualizar el médico' });
    }
});

// Eliminar un médico
router.delete('/eliminarMedico/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const medico = await Medicos.findByPk(id);
        if (medico) {
            await medico.destroy();
            res.json({ message: 'Médico eliminado' });
        } else {
            res.status(404).json({ error: 'Médico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el médico' });
    }
});

module.exports = router;