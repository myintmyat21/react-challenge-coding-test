import styles from "../styles/Components.module.scss";
import Image from "next/image";

const Card = ({ card, selectedCards, setSelectedCards, show }) => {

    const alreadySelected = selectedCards.filter(d => d.id === card.id);

    const handleClick = (card) => {
        if (!show) {
            setSelectedCards(
                alreadySelected.length
                    ? selectedCards.filter(d => d.id !== card.id)
                    : [...selectedCards, { ...card, choiceCount: 1 }]
            );
        }
    }

    return (
        <div className={styles.card}>

            <div className={styles.cardImage}>
                <Image
                    src={card.images.small}
                    alt={card.name}
                    width="180px"
                    height="250px"
                    loading="eager"
                />
            </div>

            <div className={styles.desc}>
                <div className={styles.type}>{card.name}</div>
                <div className={styles.rarity}>{card.rarity}</div>
                <div className={styles.priceLeft}>
                    <div>${card.cardmarket.prices.averageSellPrice}</div>
                    <div>{card.set.total} left</div>
                </div>
            </div>

            <div
                className={styles[alreadySelected.length ? "selectedButton" : "selectButton"]}
                onClick={(e) => { e.preventDefault(); handleClick(card) }}>
                {alreadySelected.length ? "Selected" : "Select card"}
            </div>
        </div>
    )
}

export default Card;