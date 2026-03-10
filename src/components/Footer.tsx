import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Achado Inteligente" className="h-8 w-8" />
              <span className="font-display font-bold text-lg">Achado Inteligente</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Descobrimos os melhores produtos da internet para você. Preços baixos, qualidade alta.
            </p>
            <div className="flex gap-3">
              {["Instagram", "TikTok", "YouTube", "Telegram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-3 py-1.5 text-xs rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Produtos Virais", "Gadgets Úteis", "Barato até R$50", "Casa Inteligente", "Cozinha Organizada"].map((item) => (
                <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Sobre Nós", "Blog", "Contato", "Política de Privacidade", "Termos de Uso"].map((item) => (
                <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>📧 contato@achadointeligente.com</li>
              <li>📱 Siga no Instagram</li>
              <li>🎬 Siga no TikTok</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/50">
          <p>© 2026 Achado Inteligente. Todos os direitos reservados.</p>
          <p className="mt-1">Este site contém links de afiliados. Podemos receber comissões por compras realizadas.</p>
        </div>
      </div>
    </footer>
  );
}
