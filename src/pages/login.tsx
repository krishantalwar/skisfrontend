import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-muted">
      <form onSubmit={handleLogin} className="bg-white dark:bg-background p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </div>
  )
}
