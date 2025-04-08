import { Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/layout"
import Dashboard from "@/pages/dashboard"
import Profile from "@/pages/profile"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  )
}

export default App
