import '../styles/style.css';
import styles from '../styles/inlineStyles'
import logo from '../assets/logo.svg';

import { IoIosArrowBack } from "react-icons/io";
import contributors from '../data/contributors';

import StudentCard from './studentCard';

function About({ onBack }) {
	return (
		<div style={styles.page} className='about-page'>
			<header className="header">
        <div className="header-content">
					<button className="back-button buttonPrimary" onClick={onBack}>
						<span ><IoIosArrowBack className="back-arrow"/></span>
						<p>Back</p>
					</button>

					<h1 className="brand">ScaleMAXXING</h1>
					<p className="description">
						ScaleMAXXING is a unit-aware programming language that ensures physical 
						units like meters, seconds and kilograms are checked at compile time. 
						It also employs bidirectional constraint links, so that corresponding 
						variables update automatically, just like spreadsheet cells. This lexical 
						analyzer takes in ScaleMAXXING source code and segments it into tokens 
						(identifiers, keywords, operators, literals, and symbols), and it returns 
						to print any sequence which does not comply with the rules of the language.
					</p>
        </div>

        <img className='logo' src={logo} alt="Logo"/>
			</header>

			<main className="student-grid">
				{contributors.map((contributor) => (
					<StudentCard
						key={contributor.id}
						name={contributor.name}
						image={contributor.image}
						role={contributor.role}
					/>
				))}
			</main>
		</div>
	);
}


{/* <button onClick={onBack}>BACK!!!</button> */}


export default About;
