import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Card from '../components/Card'
import Cart from '../components/Cart'
import Filter from '../components/Filter'
import Nav from '../components/Nav'
import styles from '../styles/Home.module.scss'

const fetchCards = ({ type = "", rarity = "", set = "", name = "", pageSize = 1 } = {}) => {
  const f = [{ types: type }, { rarity: rarity }, { "set.name": set }, { name: name }].filter(v => v[Object.keys(v)[0]])
  const q = f.map(v => Object.keys(v)[0] + ':"' + v[Object.keys(v)[0]] + '"').join(" ")
  return fetch("https://api.pokemontcg.io/v2/cards?page=1&pageSize=" + (pageSize * 12) + "&q=" + q)
}

const fetchTypes = () => {
  return fetch("https://api.pokemontcg.io/v2/types")
}

const fetchRarities = () => {
  return fetch("https://api.pokemontcg.io/v2/rarities")
}

const fetchSets = () => {
  return fetch("https://api.pokemontcg.io/v2/sets")
}

export default function Home() {
  const [cards, setCards] = useState([])
  const [filterName, setFilterName] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const [filterRarity, setFilterRarity] = useState(null)
  const [filterSet, setFilterSet] = useState(null)
  const [types, setTypes] = useState([])
  const [rarities, setRarities] = useState([])
  const [sets, setSets] = useState([])
  const [show, setShow] = useState(false);
  const [pageSize, setPageSize] = useState(1);
  const [selectedCards, setSelectedCards] = useState([]);
  const [payBill, setPayBill] = useState(false);

  React.useEffect(() => {
    fetchCards()
      .then(res => res.json())
      .then(({ data }) => setCards(data))
      .catch(error => console.log(error.toString()))
    fetchTypes()
      .then(res => res.json())
      .then(({ data }) => setTypes(data))
      .catch(error => console.log(error.toString()))
    fetchRarities()
      .then(res => res.json())
      .then(({ data }) => setRarities(data))
      .catch(error => console.log(error.toString()))
    fetchSets()
      .then(res => res.json())
      .then(({ data }) => setSets(data.map(v => v.name)))
      .catch(error => console.log(error.toString()))
  }, [])


  React.useEffect(() => {
    fetchCards({ type: filterType, rarity: filterRarity, set: filterSet, name: filterName, pageSize })
      .then(res => res.json())
      .then(({ data }) => setCards(data))
      .catch(error => console.log(error.toString()))
  }, [filterName, filterType, filterRarity, filterSet, pageSize])

  const cardList = cards.map((card, key) => (
    <Card
      key={key}
      card={card}
      selectedCards={selectedCards}
      setSelectedCards={setSelectedCards}
      show={show}
    />
  ))

  return (
    <div className={styles.container}>
      <Nav />

      <Filter
        types={types}
        rarities={rarities}
        sets={sets}
        filterName={filterName}
        setFilterName={setFilterName}
        filterType={filterType}
        setFilterType={setFilterType}
        filterRarity={filterRarity}
        setFilterRarity={setFilterRarity}
        filterSet={filterSet}
        setFilterSet={setFilterSet}
        setPageSize={setPageSize}
      />

      <div className={styles.cardContainer}>
        {
          cards.length
            ? cardList
            : <h3>{(filterName || filterRarity || filterType || filterSet) ? "There is no data..." : "Loading..."}</h3>
        }
      </div>

      <div className={styles.showMoreContainer}>
        {
          cards.length >= 12 &&
          <div className={styles.showMore} onClick={() => setPageSize(pageSize + 1)}>
            <FontAwesomeIcon icon={faSearch} className={styles.showMoreIcon} />
            show more
          </div>
        }
      </div>

      <Cart
        show={show}
        setShow={setShow}
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        payBill={payBill}
        setPayBill={setPayBill}
      />

      <div className={styles.Footer} />
    </div>
  )
}
