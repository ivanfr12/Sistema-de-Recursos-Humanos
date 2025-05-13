package gm.rrhh.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import gm.rrhh.excepcion.RecursoNoEncontradoExcepcion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import gm.rrhh.modelo.Empleado;
import gm.rrhh.servicio.EmpleadoServicio;
import gm.rrhh.servicio.IEmpleadoServicio;

@RestController
@RequestMapping("rrhh-app") // http://localhost:8080/rrhh-app
@CrossOrigin(value = "http://localhost:3000") // http://localhost:3000
// Permite el acceso a la API desde el cliente React
public class EmpleadoControlador {
    private static final Logger logger = LoggerFactory.getLogger(EmpleadoControlador.class); // Logger para la clase


    @Autowired
    private IEmpleadoServicio empleadoServicio; // Inyección de dependencias


    @GetMapping("/empleados") // http://localhost:8080/rrhh-app/empleados
    // Método para obtener la lista de empleados
    public List<Empleado> obtenerEmpleados() {
        var empleados = empleadoServicio.listarEmpleado();
        empleados.forEach((empleado) -> logger.info(empleado.toString())); // Imprime los empleados en la consola
        return empleados;
    }

    // Agregar elemento de tipo empleado
    @PostMapping("/empleados")
    public Empleado agregarEmpleado(@RequestBody Empleado empleado){
        logger.info("Empleado a agregar: " + empleado);
        return empleadoServicio.guardarEmpleado(empleado);
    }

    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Integer id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el id: " + id);
        return ResponseEntity.ok(empleado);
    }

    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado>
    actualizarEmpleado(@PathVariable Integer id,
                       @RequestBody Empleado empleadoRecibido){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        empleado.setNombre(empleadoRecibido.getNombre());
        empleado.setDepartamento(empleadoRecibido.getDepartamento());
        empleado.setSueldo(empleadoRecibido.getSueldo());
        empleadoServicio.guardarEmpleado(empleado);
        return ResponseEntity.ok(empleado);
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Map<String, Boolean>>
            eliminarEmpleado(@PathVariable Integer id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        empleadoServicio.eliminarEmpleado(empleado);
        // Json {"eliminado": true}
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("Eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
