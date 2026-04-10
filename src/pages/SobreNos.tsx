import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTrackVisit } from "@/hooks/useTrackVisit";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SobreNos = () => {
  useTrackVisit("/sobre");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </button>

        <h1 className="text-3xl font-display font-bold text-foreground mb-6">Sobre Nós</h1>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Apresentação da Empresa</h2>
            <p>
              Somos uma empresa especializada na divulgação de links de afiliados, com o objetivo de conectar pessoas às melhores ofertas disponíveis na internet de forma simples, rápida e confiável.
            </p>
            <p>
              Nosso trabalho é pesquisar, selecionar e compartilhar produtos e serviços que realmente valem a pena. Atuamos como uma ponte entre o cliente e as melhores oportunidades do mercado, facilitando a tomada de decisão na hora da compra.
            </p>
            <p>
              Além disso, trabalhamos em parceria com empresas e plataformas, divulgando seus produtos de forma estratégica e ajudando a ampliar seu alcance e suas vendas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">O que fazemos</h2>
            <ul className="space-y-2 list-none pl-0">
              {[
                "Divulgamos ofertas atualizadas diariamente",
                "Selecionamos produtos com bom custo-benefício",
                "Compartilhamos links diretos para compra",
                "Organizamos os produtos por categorias para facilitar a navegação",
                "Criamos parcerias com empresas para promover seus produtos",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Tudo isso de forma prática, para que você encontre exatamente o que procura sem perder tempo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Nosso diferencial</h2>
            <p>
              Prezamos pela transparência, agilidade e qualidade das informações. Não divulgamos qualquer produto — buscamos sempre opções confiáveis e relevantes para o público.
            </p>
            <p>
              Também valorizamos nossas parcerias, trabalhando junto às empresas para garantir que os produtos divulgados tenham qualidade e credibilidade.
            </p>
            <p>
              Além disso, nosso foco é proporcionar uma experiência simples: você vê a oferta, clica no link e já é direcionado para o local de compra.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Nossa missão</h2>
            <p>
              Ajudar pessoas a encontrarem boas oportunidades de compra na internet, economizando tempo e dinheiro, enquanto fortalecemos parcerias com empresas e marcas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Nossa visão</h2>
            <p>
              Ser referência na divulgação de ofertas e links de afiliados, com credibilidade, confiança e fortes parcerias no mercado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Nossos valores</h2>
            <ul className="space-y-2 list-none pl-0">
              {["Transparência", "Compromisso com o cliente", "Parcerias sólidas", "Praticidade", "Confiança"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SobreNos;
