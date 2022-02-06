import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faTimes, faCheckCircle, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/Components.module.scss"
import SelectedCardInfo from "./SelectedCardInfo"

const Cart = ({ show, setShow, selectedCards, setSelectedCards, payBill, setPayBill }) => {

    const selectedCardList = selectedCards.map((v, k) =>
        <SelectedCardInfo key={k} index={k} card={v} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
    );

    const { totalCards, totalPrices } = selectedCards.reduce((r, c) => {
        r.totalCards += c.choiceCount;
        r.totalPrices += (c.cardmarket.prices.averageSellPrice * c.choiceCount);
        return r;
    }, { totalCards: 0, totalPrices: 0 });

    const PaymentBill = () => {
        return (
            <>
                <div className={styles.cartDetails}>
                    <div className={styles.cartDetailsChild2}>
                        <div className={styles.cartBlurBottom} />
                        <div className={styles.cartClear} onClick={() => setSelectedCards([])}>Clear all</div>
                        <div className={styles.cardTotal}>
                            <div>Total cards</div>
                            <div>{totalCards}</div>
                        </div>
                        <div className={styles.priceTotal}>
                            <div>Total price</div>
                            <div>${totalPrices.toFixed(2)}</div>
                        </div>
                        <div onClick={() => {
                            setPayBill(true);
                            setSelectedCards([]);
                        }} className={styles.cartPayNow}>Pay now</div>
                    </div>

                    <div className={styles.cartDetailsChild1}>
                        {selectedCardList}
                    </div>
                </div>

                <div className={styles.crossBtn} onClick={() => setShow(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </>
        )
    }

    const PaymentSuccess = ({ payBill }) => {
        return (
            <>
                <div className={styles.cardPaymentSuccess}>
                    <FontAwesomeIcon
                        icon={payBill ? faCheckCircle : faShoppingCart}
                        className={styles[payBill ? "successIcon" : "emptyIcon"]}
                    />
                    <div>{payBill ? "Payment success!" : "No item in cart!"}</div>
                </div>

                <div
                    className={styles.crossBtn}
                    onClick={() => { setShow(false); setPayBill(false); }}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </>
        )
    }

    return (
        <div className={styles.cart}>
            {
                show
                    ?
                    selectedCards.length && !payBill ? <PaymentBill /> : <PaymentSuccess payBill={payBill} />
                    :
                    <div className={styles.viewCart} onClick={() => setShow(true)}>
                        <div className={styles[selectedCards.length ? "cartBadge" : "cartBagdeHide"]}>
                            {totalCards > 99 ? "99+" : totalCards}
                        </div>

                        <div className={styles.cartBtnText}>
                            <FontAwesomeIcon className={styles.cartBtnIcon} icon={faShoppingCart} />
                            View Cart
                        </div>
                    </div>
            }
        </div>

    )
}

export default Cart;