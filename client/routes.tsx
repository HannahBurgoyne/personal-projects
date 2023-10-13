import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import DeckLibrary from './components/DeckLibrary'
import Flashcards from './components/Flashcards'
import Home from './components/Home'

export const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="/deck-library" element={<DeckLibrary />} />
    <Route path="deck/:deckId" element={<Flashcards />} />
  </Route>
)
