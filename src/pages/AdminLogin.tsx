import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password);
      setLoading(false);
      if (error) {
        setError("Erro ao criar conta. Tente novamente.");
      } else {
        setSuccess("Conta criada! Agora faça login.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        setError("Email ou senha incorretos.");
      } else {
        navigate("/admin");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card rounded-lg shadow-card-hover p-8 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="Achado Inteligente" className="h-12" />
          <h1 className="font-display font-bold text-xl text-foreground">Painel Administrativo</h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? "Crie sua conta" : "Faça login para gerenciar o site"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@exemplo.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Aguarde..." : isSignUp ? "Criar conta" : "Entrar"}
          </Button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(""); setSuccess(""); }}
          className="block w-full text-center text-sm text-secondary hover:underline"
        >
          {isSignUp ? "Já tem conta? Faça login" : "Criar uma conta"}
        </button>

        <a href="/" className="block text-center text-sm text-muted-foreground hover:underline">
          ← Voltar ao site
        </a>
      </div>
    </div>
  );
}