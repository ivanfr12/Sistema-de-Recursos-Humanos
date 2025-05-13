import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoEmpleados() {

    // Conexion a la API

    const urlBase = "http://localhost:8080/rrhh-app/empleados"; // URL de la API

    const[empleados, setEmpleados] = useState([]); // Estado para almacenar los empleados

    useEffect(() => {
        cargarEmpleados();
    }, []); // Cargar empleados al iniciar el componente

    const cargarEmpleados = async () => {
        const resultado = await axios.get(urlBase); // Realizar la solicitud GET a la API
        console.log("Resultado cargar empleados");
        console.log(resultado.data);
        setEmpleados(resultado.data); // Actualizar el estado con los empleados obtenidos
    }

    const eliminarEmpleado = async (id, nombre) => {
       const confirmacion = window.confirm(`Seguro que desea eliminar el empleado ${nombre}?`);
    if (confirmacion) {
      await axios.delete(`${urlBase}/${id}`); // Realizar la solicitud DELETE a la API
      cargarEmpleados(); // Cargar empleados después de eliminar uno
      alert(`Empleado ${nombre} eliminado`);
    } else {
      alert("Operación cancelada");
    }
  }


  return (
    <div className='container'>
        <div className="container text-center" style={{margin:"100px -40px"}}>
            <h3>Sistema de Recursos Humanos</h3>
        </div>

                <table className="table table-striped table-hover table-bordered align-middle">
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {
                // Iteramos el arreglo de emplados y se muestra en la tabla
                empleados.map((empleado, indice) => (
                    <tr key={indice}>
                    <th scope="row">{empleado.idEmpleado}</th>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.departamento}</td>
                    <td><NumericFormat value={empleado.sueldo} // Formato de sueldo
                        displayType={'text'}
                        thousandSeparator="," prefix='$'
                        decimalScale={2} fixedDecimalScale/></td> 

                        {/* Botones editar y eliminar */}
                    <td className='text-center'>
                        <div>
                            <Link to={`/editar/${empleado.idEmpleado}`}
                            className='btn btn-warning btn-sm m-3'>Editar</Link>
                            
                            <button onClick={()=> eliminarEmpleado(empleado.idEmpleado , empleado.nombre)}
                                className="btn btn-danger btn-sm m-3">
                                Eliminar</button>
                        </div>
                        </td>
                    </tr>
                ))}
        </tbody>
        </table>

    </div>
  )
}
