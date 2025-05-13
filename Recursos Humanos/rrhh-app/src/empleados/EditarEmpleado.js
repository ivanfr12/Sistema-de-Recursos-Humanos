import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarEmpleado() {

    const urlBase = "http://localhost:8080/rrhh-app/empleados"; // URL de la API

    let navegacion = useNavigate(); // Hook para la navegación

    const {id} = useParams(); // Obtener el id del empleado desde la URL

    const [empleado, setEmpleado] = useState({ // Estado para almacenar el empleado
        nombre: "",
        departamento: "",
        sueldo: ""
    })

    // Desestructuración del estado empleado
    // para obtener los valores de nombre, departamento y sueldo
    const {nombre, departamento, sueldo} = empleado;

useEffect(() => {
    async function cargarEmpleado() {
        const resultado = await axios.get(`${urlBase}/${id}`); // Realizar la solicitud GET a la API
        setEmpleado(resultado.data); // Actualizar el estado con el empleado obtenido
    }
    cargarEmpleado(); // Cargar el empleado al iniciar el componente
}, [id]); // Solo se ejecuta una vez al cargar el componente

    const onInputChange = (e) => {
        // Spread operator para obtener el valor del input
        setEmpleado({...empleado, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        
        await axios.put(`${urlBase}/${id}`, empleado); // Realizar la solicitud POST a la API
        // Redirigir a la página principal después de agregar el empleado
        navegacion("/"); // Navegar a la página principal
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin:"100px -40px"}}>
            <h3>Editar Empleado</h3>
        </div>
        {/* Formulario para agregar empleado */}
        <form onSubmit={(e) => {onSubmit(e)}}>
        {/* Nombre*/}
        <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" 
            id="nombre" name='nombre' required={true}
            value={nombre} onChange={(e)=>onInputChange(e)}/>
        </div>

        {/* Apellido*/}
        <div className="mb-3">
            <label htmlFor="departamento" className="form-label">Departamento</label>
            <input type="text" className="form-control" 
            id="departamento" name='departamento' required={true}
            value={departamento} onChange={(e)=> onInputChange(e)}/>
        </div>

        {/* Sueldo*/}
        <div className="mb-3">
            <label htmlFor="sueldo" className="form-label">Sueldo</label>
            <input type="number" step="any" className="form-control" 
            id="sueldo" name='sueldo' required={true}
            value={sueldo} onChange={(e)=> onInputChange(e)}/>
        </div>

        {/* Botones de agregar y cancelar*/}
        <div className="text-center">
              <button type="submit" className="btn btn-warning btn-sm m-3">Guardar</button>
              <a href="/" className="btn btn-danger btn-sm m-3">Cancelar</a>
            </div>
      
        </form>
    </div>
  )
}
