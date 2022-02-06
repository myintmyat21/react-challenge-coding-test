import styles from "../styles/Components.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import React from "react"

const Filter = (props) => {
    const [typeSelected, setTypeSelected] = React.useState(false)
    const [raritySelected, setRaditySelected] = React.useState(false)
    const [setSelected, setSetSelected] = React.useState(false)
    const [name, setName] = React.useState(props.filterName || "")

    const hideAllDropdown = () => {
        setTypeSelected(false);
        setRaditySelected(false);
        setSetSelected(false)
    }

    React.useEffect(() => {
        return () => { }
    }, [])

    const typesList = props.types.map((v, k) => <div onClick={() => { props.setFilterType(v); hideAllDropdown(); }} key={k} className={styles.menuItem}>{v}</div>)
    const raritiesList = props.rarities.map((v, k) => <div onClick={() => { props.setFilterRarity(v); hideAllDropdown(); }} key={k} className={styles.menuItem}>{v}</div>)
    const setsList = props.sets.map((v, k) => <div onClick={() => { props.setFilterSet(v); hideAllDropdown(); }} key={k} className={styles.menuItem}>{v}</div>)

    return (
        <div className={styles.filter}>
            {
                (typeSelected || raritySelected || setSelected) &&
                <div
                    onClick={e => { e.preventDefault(); e.stopPropagation(); hideAllDropdown(); }}
                    style={{ position: "fixed", left: 0, right: 0, top: 0, bottom: 0, zIndex: 3 }} />
            }

            {/* Filter Name */}
            <div className={styles.name}>
                <input
                    onKeyPress={e => {
                        if (e.key !== "Enter") return;
                        props.setPageSize(1);
                        const value = e.target.value;
                        if (value) props.setFilterName(value + "*")
                        else props.setFilterName(null)
                    }}
                    type="text"
                    placeholder="Name..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => hideAllDropdown()}
                />
                {
                    name &&
                    <div className={styles.clearName}>
                        <FontAwesomeIcon onClick={(e) => { e.stopPropagation(); setName(""); props.setFilterName(null); }} icon={faTimes} color="red" style={{ marginLeft: 4 }} />
                    </div>
                }
            </div>

            {/* Filter Type */}
            <div className={styles.dropdown}>
                <div className={styles.title} onClick={() => { hideAllDropdown(); setTypeSelected(!typeSelected); props.setPageSize(1) }}>
                    {props.filterType || "Type"}
                    {
                        props.filterType ? <FontAwesomeIcon onClick={(e) => { e.stopPropagation(); props.setFilterType(null); }} icon={faTimes} color="red" style={{ marginLeft: 4 }} />
                            :
                            <FontAwesomeIcon icon={faCaretDown} color="lightgray" style={{ marginLeft: 4 }} />
                    }
                </div>
                <div className={styles.dropdownMenu} isselected={`${typeSelected}`}>
                    {typesList}
                </div>
            </div>

            {/* Filter Rarity  */}
            <div className={styles.dropdown}>
                <div className={styles.title} onClick={() => { hideAllDropdown(); setRaditySelected(!raritySelected); props.setPageSize(1); }}>
                    {props.filterRarity || "Rarity"}
                    {
                        props.filterRarity ? <FontAwesomeIcon onClick={(e) => { e.stopPropagation(); props.setFilterRarity(null); props.setPageSize(1); }} icon={faTimes} color="red" style={{ marginLeft: 4 }} />
                            :
                            <FontAwesomeIcon icon={faCaretDown} color="lightgray" style={{ marginLeft: 4 }} />
                    }
                </div>
                <div className={styles.dropdownMenu} isselected={`${raritySelected}`}>
                    {raritiesList}
                </div>
            </div>

            {/* Filter Set */}
            <div className={styles.dropdown + " " + styles.last}>
                <div className={styles.title} onClick={() => { hideAllDropdown(); setSetSelected(!setSelected); props.setPageSize(1); }}>
                    {props.filterSet || "Set"}
                    {
                        props.filterSet ? <FontAwesomeIcon onClick={(e) => { e.stopPropagation(); props.setFilterSet(null); props.setPageSize(1); }} icon={faTimes} color="red" style={{ marginLeft: 4 }} />
                            :
                            <FontAwesomeIcon icon={faCaretDown} color="lightgray" style={{ marginLeft: 4 }} />
                    }
                </div>
                <div className={styles.dropdownMenu} isselected={`${setSelected}`}>
                    {setsList}
                </div>
            </div>
        </div>
    )
}

export default Filter;