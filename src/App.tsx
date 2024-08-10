import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaGoodreads } from 'react-icons/fa';
import Home from './pages/Home';
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
            </ul>
          </nav>
        </header>

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </main>
      </div>
      <div className={styles.socialLinks}>
        <a href="https://www.linkedin.com/in/brian-heckman-20604182" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
          <FaLinkedin />
        </a>
        <a href="https://github.com/baheckman" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
          <FaGithub />
        </a>
        <a href="https://www.goodreads.com/user/show/160682533-brian-heckman" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
          <FaGoodreads />
        </a>
      </div>
    </Router>
  );
}

export default App;