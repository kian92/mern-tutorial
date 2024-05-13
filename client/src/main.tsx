import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Deck from './Deck.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/deck/:deckId",
    element: <Deck />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
