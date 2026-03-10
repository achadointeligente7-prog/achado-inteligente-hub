import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Achado Inteligente" className="h-8" />
            </div>
            <p className="text-sm text-muted-foreground">
              Descobrimos os melhores produtos da internet para você.
            </p>
            <div className="flex gap-3">
              {["Instagram", "TikTok", "YouTube", "Telegram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-3 py-1.5 text-xs rounded-sm bg-muted text-muted-foreground hover:bg-border transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">Categorias</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Produtos Virais", "Gadgets Úteis", "Barato até R$50", "Casa Inteligente", "Cozinha Organizada"].map((item) => (
                <li key={item}><a href="#" className="hover:text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">Informações</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Sobre Nós", "Blog", "Contato", "Política de Privacidade", "Termos de Uso"].map((item) => (
                <li key={item}><a href="#" className="hover:text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📧 contato@achadointeligente.com</li>
              <li>📱 Siga no Instagram</li>
              <li>🎬 Siga no TikTok</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Achado Inteligente. Todos os direitos reservados.</p>
          <p className="mt-1">Este site contém links de afiliados. Podemos receber comissões por compras realizadas.</p>
        </div>
      </div>
    </footer>
  );
}
