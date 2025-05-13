import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import Navegacion from "./plantilla/Navegacion";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          {/* Ruta por defecto */}
          <Route exact path="/" element={<ListadoEmpleados />} />
          {/* Ruta para agregar empleado */}
          <Route exact path="/agregar" element={<AgregarEmpleado />} />
          {/* Ruta para editar empleado */}
          <Route exact path="/editar/:id" element={<EditarEmpleado />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
