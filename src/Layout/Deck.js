import React, { useState, useEffect} from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { deleteCard, deleteDeck, readDeck } from "../utils/api/index"

// This will be the Deck path:	/decks/:deckId 

function Deck() {
    const [deck, setDeck] = useState({})
    const {deckId} = useParams()
    const history = useHistory()

// call readDeck() from utils to load deck
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
        }
        loadDeck()
    }, [deckId])


// add breadcrumbs nav
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {deck.name}
                        </li>
                    </ol>
                </nav>
            </div>        
        </div>
    )    
}

export default Deck