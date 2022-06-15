import React from "react"
import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"

export const App = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="Main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
