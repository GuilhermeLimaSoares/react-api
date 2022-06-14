import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos'
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';

import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />
      <Route path="/admin/pratos" element={<AdministracaoPratos />} />
      <Route path="/admin/pratos/novo" element={<FormularioPrato />} />
      <Route path="/admin/pratos/:id" element={<FormularioPrato />} />
    </Routes>
  );
}

export default App;
