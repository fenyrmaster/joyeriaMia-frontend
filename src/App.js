import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux"
import store from "./store";
import Navegacion from "./components/Navegacion";
import Inicio from "./components/Inicio";
import Footer from "./components/Footer";
import Tienda from "./components/Tienda";
import ProductoDetalles from "./components/ProductoDetalles";
import IniciarSesion from "./components/IniciarSesion";
import Registro from "./components/Registro";
import Carrito from "./components/Carrito";
import Pedidos from "./components/Pedidos";
import Subcategorias from "./components/Subcategorias";
import AgregarProductos from "./components/AgregarProductos";
import Cuenta from "./components/Cuenta";
import AdminProductos from "./components/AdminProductos";
import RutaPrivada from "./rutas/RutaPrivada";
import RutaPrivadaAdmin from "./rutas/RutaPrivadaAdmin";
import CpedidosTemp from "./components/CpedidosTemp";
import CuentaOlvidada from "./components/CuentaOlvidada";
import CuentaRecuperar from "./components/CuentaRecuperar";
import Spinner from "./components/Spinner";
import ConfirmarCuenta from "./components/ConfirmarCuenta";

function App() {

  console.log(process.env.REACT_APP_TARJETA)
  
  return (
    <Router>
      <Provider store={store}>
        <Navegacion/>
        <Switch>
          <Route exact path="/" component={Inicio} title="La Joyeria de mejor calidad"/>
          <Route exact path="/tienda" component={Tienda} title="Compra joyas de oro y plata en Mexico | Joyeria Mia"/>
          <Route exact path="/productos/:codigo" component={ProductoDetalles}/>
          <Route exact path="/iniciar-sesion" component={IniciarSesion}/>
          <Route exact path="/registrarse" component={Registro}/>
          <Route exact path="/cuentaOlvidada" component={CuentaOlvidada}/>
          <Route exact path="/recuperar/:token" component={CuentaRecuperar}/>
          <Route exact path="/confirmarCuenta/:token" component={ConfirmarCuenta}/>
          <RutaPrivada exact path="/carrito" component={Carrito}/>
          <RutaPrivada exact path="/app/pedidos" component={Pedidos}/>
          <RutaPrivadaAdmin exact path="/app/subcategorias" component={Subcategorias}/>
          <RutaPrivadaAdmin exact path="/app/agregar-producto" component={AgregarProductos}/>
          <RutaPrivada exact path="/app/cuenta" component={Cuenta}/>
          <RutaPrivadaAdmin exact path="/app/admin-productos" component={AdminProductos}/>
        </Switch>
        <Footer/>
      </Provider>
    </Router>
  );
}

export default App;
