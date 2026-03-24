import {Router} from 'express';

import { getAllUsers, getUserByEmail, getBuscarNombre, postCrearUsuario, putActualizarUsuario, eliminarUsuario} from '../services/usersServices.js';

const router = Router();

router.get('/', getAllUsers);

router.get('/buscarPorEmail/:email', getUserByEmail);

router.get('/buscarPorNombre/:nombre', async (req, res)=>{
    const { nombre} = req.params;
    try {
            const AllUsersnyName = await getBuscarNombre(nombre);
            res.json(AllUsersnyName);
    
        } catch (err) {
            res.status(500).json({error: err.message});
            
        }

});

router.post('/', async (req, res)=>{
    try {
        
            const { nombre, documento, carnet, email, contrasenia} =req.body;
            const newUser= await postCrearUsuario(nombre, documento, carnet, email, contrasenia);

            res.status(201).json(newUser);
    
        } catch (err) {
            res.status(500).json({error: err.message});
            
        }

});


router.put('/:id_usuario', async (req, res) => {
  try {
   
    const { nombre, documento, carnet, email, contrasenia } = req.body;

    const { id_usuario } = req.params;
    const usuario = [nombre, documento, carnet, email, contrasenia, id_usuario];
    const updatedUser = await putActualizarUsuario(usuario);

    
    res.status(201).json(updatedUser);

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
});



router.delete('/:id_usuario', async (req, res) => {
  try {
    
    const { id_usuario } = req.params;

    const result = await eliminarUsuario(id_usuario);

    
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
