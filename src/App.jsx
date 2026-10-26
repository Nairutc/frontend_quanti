import { useState } from 'react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Alert from './components/Alert';

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-page">
        <Header
          title="Panel administrativo"
          description="Gestión académica de Quanti"
          userName={
            loggedIn
              ? 'Administrador'
              : 'Invitado'
          }
        />

        <main>
          <section
            className="session-panel"
            aria-labelledby="session-title"
          >
            <h2 id="session-title">
              Acceso al panel
            </h2>

            <p>
              Estado:
              {loggedIn
                ? ' sesión iniciada'
                : ' sesión cerrada'}
            </p>

            <div className="session-actions">
              <button
                type="button"
                onClick={login}
                disabled={loggedIn}
              >
                Iniciar sesión
              </button>

              <button
                type="button"
                onClick={logout}
                disabled={!loggedIn}
              >
                Cerrar sesión
              </button>
            </div>
          </section>

          {loggedIn ? (
            <Dashboard />
          ) : (
            <Alert message="Inicia sesión para acceder al dashboard." />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;