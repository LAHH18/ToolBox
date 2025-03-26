import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { FavoritesProvider } from './context/FavoritosContext.jsx'
import { EmpresaFaqProvider } from './context/dtsEmpContext.jsx'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage.jsx'
import MyV from './pages/MyV.jsx'
import Faq from './pages/Faq.jsx'
import ProductDts from './pages/ProductDts.jsx'
import ProductsCategoria from './pages/ProductsCategoria.jsx'
import MenuVentana from './pages/IoT/MenuVentana.jsx'
import VentanaCtrl from './pages/IoT/VentanaCtrl.jsx'
import HomePagePriv from './pages/private/HomePagePriv.jsx'
import Contacto from './pages/Contacto.jsx'
import Profile from './pages/Profile.jsx'
import Error404 from './pages/Error404.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Terms from "./pages/Terms.jsx"
import Carrito from "./pages/Carrito.jsx"
import Politicas from "./pages/Politicas.jsx"
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

//empleados
import HomeEmpleados from './pages/empleados/HomeEmpleados.jsx'

//admin
import EditEmpresa from './pages/private/EditEmpresa.jsx'
import ViewFAQ from './pages/private/ViewFAQ.jsx'
import EditFAQ from './pages/private/EditFAQ.jsx'
import CreatFAQ from './pages/private/CreatFAQ.jsx'
import ViewTyC from './pages/private/ViewTyC.jsx'
import CreateTyC from './pages/private/CreateTyC.jsx'
import EditTyC from './pages/private/EditTyC.jsx' 
import ViewPoliticas from './pages/private/ViewPoliticas.jsx'
import CreatePoliticas from './pages/private/CreatePoliticas.jsx'
import EditPoliticas from './pages/private/EditPoliticas.jsx'
import ViewProducts from './pages/empleados/ViewProducts.jsx'
import CreateProducts from './pages/empleados/CreateProducts.jsx'
import EditProducts from './pages/empleados/EditProducts.jsx'
import { SincronizacionProvider } from './context/SincronizacionContext.jsx';  
import EditUbicacion from './pages/private/EditUbicacion.jsx'
import EditRedes from './pages/private/EditRedes.jsx'
import EditMyV from './pages/private/EditMisionyVision.jsx'
import ViewMensajes from './pages/private/ViewCorreos.jsx'
import ViewVentas from './pages/empleados/ViewVentas.jsx'
import ViewControlIoT from './pages/private/ViewControlIoT.jsx'
import ValidateEmail from './pages/Recuperacion/ValidateEmail.jsx'
import ValidateQuestion from './pages/Recuperacion/ValidateRespuesta.jsx'
import RestablecerContra from './pages/Recuperacion/RestablecerContra.jsx'
import { UserProvider } from './context/UserContext.jsx';
import VentanaCtrl2 from './pages/empleados/VentanaCtrl2.jsx'


function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <FavoritesProvider>
        <EmpresaFaqProvider>
        <SincronizacionProvider>
          <UserProvider>
          <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="flex-grow-1">
            <Routes>
              <Route path='/categoria/:categoria' element={<ProductsCategoria />} />
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/Contacto' element={<Contacto />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/myv' element={<MyV />} />
              <Route path='/terycond' element={<Terms/>} />
              <Route path='/politicas' element={<Politicas/>} />
              <Route path='/product/:id' element={<ProductDts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/restablecer" element={<ValidateEmail />} />
              <Route path="/restablecer/pregunta" element={<ValidateQuestion />} />
              <Route path="/restablecer/restablecerContra" element={<RestablecerContra />} />
              <Route path='*' element={<Error404/>} />

              <Route element={<ProtectedRoute allowedRoles={[1,2,3]} />}>

              </Route>

              {/* Para usuario normal (2) */}
              <Route element={<ProtectedRoute allowedRoles={[2]} />}>
                <Route path='/carrito/:id' element={<Carrito />} />
                <Route path='/controlVentana' element={<VentanaCtrl />} />
                <Route path='/controlVentana2' element={<VentanaCtrl2 />} />
                <Route path='/menuVent' element={<MenuVentana />} />
                <Route path='/favoritos/:email' element={<Favoritos />} />
              </Route>

              {/* Para empleados (3) */}
              <Route element={<ProtectedRoute allowedRoles={[3]} />}>
                <Route path='/HomeEmpleados' element={<HomeEmpleados />} />
                <Route path='/vwProducts' element={<ViewProducts />} />
                <Route path='/vwVentas' element={<ViewVentas />} />
                <Route path='/crtProduct' element={<CreateProducts />} />
                <Route path='/edtProtuc/:id' element={<EditProducts />} />
              </Route>

              {/* Para administradores (1) */}
              <Route element={<ProtectedRoute allowedRoles={[1]} />}>
                <Route path='/HomePagePriv' element={<HomePagePriv />} />
                <Route path='/datosEmpresa' element={<EditEmpresa />} />
                <Route path='/datosUbicacion' element={<EditUbicacion />} />
                <Route path='/editRedes' element={<EditRedes />} />
                <Route path='/editMisionyVision' element={<EditMyV />} />
                <Route path='/edtFAQ/:id' element={<EditFAQ />} />
                <Route path='/crtFAQ' element={<CreatFAQ />} />
                <Route path='/tblFAQ' element={<ViewFAQ />} />
                <Route path='/tblTyC' element={<ViewTyC />} />
                <Route path='/ViewsMensajes' element={<ViewMensajes />} />
                <Route path='/crtTyC' element={<CreateTyC />} />
                <Route path='/edtTyC/:id' element={<EditTyC />} />
                <Route path='/ControlIoTUsuario' element={<ViewControlIoT />} />
                <Route path='/tblPoliticas' element={<ViewPoliticas />} />
                <Route path='/crtPoliticas' element={<CreatePoliticas />} />
                <Route path='/edtPoliticas/:id' element={<EditPoliticas />} />
              </Route>
            </Routes>
            </div>
            <Footer />
          </div>
          </BrowserRouter>
          </UserProvider>
        </SincronizacionProvider>
        </EmpresaFaqProvider>
        </FavoritesProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App;
