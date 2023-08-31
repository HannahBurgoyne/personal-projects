import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import DeckLibrary from './components/DeckLibrary'
import Flashcards from './components/Flashcards'
import Home from './components/Home'

export const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="home" element={<Home />} />
    <Route path="deck-library" element={<DeckLibrary />} />
    <Route path="/:deck" element={<Flashcards />} />
  </Route>
)
