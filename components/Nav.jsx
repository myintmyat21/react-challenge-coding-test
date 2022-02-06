import styles from "../styles/Components.module.scss"
import Image from "next/image";
import Logo from "../public/pokemon.png";

const Nav = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.title}>TCG Marketplace</div>

            <div className={styles.logo}>
                <div className={styles.image}>
                    <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzPCjxi9I_P3GbNNGhH2u5QOtiN8_3mYymTsmxhzG2YeGzG0XbTEnhD-M_UHWC0wXAac&usqp=CAU"
                        alt="logo1"
                        layout="fill"
                    />
                </div>

                <div className={styles.image2}>
                    <Image
                        src={Logo}
                        alt="logo2"
                        layout="fill"
                    />
                </div>
            </div>
        </div>
    )
}

export default Nav;