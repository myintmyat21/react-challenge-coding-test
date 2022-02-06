import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "../styles/Components.module.scss"
import { faChevronUp, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";

const SelectedCardInfo = ({ card, index, selectedCards, setSelectedCards }) => {
    const handleUpClick = (index) => {
        const dummy = [...selectedCards];
        if (dummy[index].set.total > dummy[index].choiceCount) {
            dummy[index].choiceCount += 1;
            setSelectedCards(dummy);
        }
    }
    const handleDownClick = (index) => {
        const dummy = [...selectedCards];
        if (dummy[index].choiceCount === 1) {
            setSelectedCards(selectedCards.filter((_, key) => key !== index))
        } else {
            dummy[index].choiceCount -= 1;
            setSelectedCards(dummy);
        }
    }
    return (
        <div className={styles.cartDetailsChild1_Container}>
            <Image src={card.images.small} alt={card.name} width={55} height={75} />

            <div className={styles.cardInfo1}>
                <div className={styles.cardInfo1_Upper}>
                    <div>{card.name}</div>
                    <div><span>${card.cardmarket.prices.averageSellPrice}</span> per card</div>
                </div>
                <div className={styles.cardInfo1_Lower}><span>{card.set.total - card.choiceCount}</span> cards left</div>
            </div>

            <div className={styles.cardInfo2}>
                <div className={styles.cardInfo2_Upper}>
                    <div className={styles.cardInfo2_Upper_Total}>{card.choiceCount}</div>
                    <div className={styles.cardInfo2_Upper_Action}>
                        <FontAwesomeIcon
                            icon={faChevronUp}
                            className={card.set.total === card.choiceCount ? styles.upDisabled : styles.upEnabled}
                            onClick={(e) => { e.preventDefault(); handleUpClick(index); }} />
                        <FontAwesomeIcon
                            icon={card.choiceCount > 1 ? faChevronDown : faTimes}
                            className={card.choiceCount === 1 ? styles.crossDown : styles.upEnabled}
                            onClick={(e) => { e.preventDefault(); handleDownClick(index); }}
                        />
                    </div>
                </div>

                <div className={styles.cardInfo2_Lower}>
                    <div>price</div>
                    <div>${(card.cardmarket.prices.averageSellPrice * card.choiceCount).toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}

export default SelectedCardInfo;