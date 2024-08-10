import React from 'react';
import styles from './Home.module.css';
// import GraphAnimation from '../components/GraphAnimation';


const Home: React.FC = () => {
    return (
        <div className={styles.homeContainer}>
            {/* <GraphAnimation /> */}
            <div className={styles.contentWrapper}>
                <h1>Hi, I'm <span className={styles.name}>Brian</span>.</h1>
                <p>I like graphs, databases, and dogs.</p>
            </div>
        </div>
    );
};

export default Home;