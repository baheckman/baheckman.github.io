import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
// import Projects from './pages/Projects';
import Experience from './pages/Experience';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li><Link to="/" className={styles.navLink}>Home</Link></li>
              <li><Link to="/experience" className={styles.navLink}>Experience</Link></li>
              {/* <li><Link to="/projects" className={styles.navLink}>Projects</Link></li> */}
            </ul>
          </nav>
        </header>

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            {/* <Route path="/projects" element={<Projects />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;