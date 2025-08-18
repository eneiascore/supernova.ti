"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Tech Startup",
      image: "/professional-woman-headshot.png",
      rating: 5,
      testimonial:
        "A Supernova.ti transformou completamente nossa presença digital. O design é incrível e a funcionalidade perfeita!",
    },
    {
      name: "João Santos",
      company: "E-commerce Fashion",
      image: "/professional-man-headshot.png",
      rating: 5,
      testimonial:
        "Profissionais excepcionais! Entregaram nosso e-commerce no prazo e superaram todas as expectativas.",
    },
    {
      name: "Ana Costa",
      company: "Consultoria Jurídica",
      image: "/professional-woman-lawyer-headshot.png",
      rating: 5,
      testimonial: "Design elegante e funcionalidade impecável. Nossos clientes adoraram o novo site!",
    },
    {
      name: "Carlos Oliveira",
      company: "Restaurante Gourmet",
      image: "/placeholder-778i4.png",
      rating: 5,
      testimonial: "O app de delivery que criaram aumentou nossas vendas em 300%. Recomendo totalmente!",
    },
    {
      name: "Lucia Ferreira",
      company: "Clínica Médica",
      image: "/professional-doctor-woman-headshot.png",
      rating: 5,
      testimonial: "Sistema de agendamento online perfeito. Nossos pacientes adoraram a facilidade de uso.",
    },
  ]

  return (
    <div className="min-h-screen gradient-bg text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-2xl font-bold text-white hover:text-primary transition-colors">
              Supernova.ti
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Contato
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-foreground">Super</span>
            <span className="text-primary">nova</span>
            <span className="text-accent">.ti</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Transformamos suas ideias em experiências digitais extraordinárias através de design minimalista e
            tecnologia de ponta.
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="gradient-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Iniciar Projeto
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Sobre a Supernova.ti</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Somos uma agência web especializada em criar soluções digitais inovadoras. Nossa abordagem minimalista e
              artística garante que cada projeto seja único, funcional e visualmente impactante.
            </p>
            <p>
              Nossa equipe combina criatividade, técnica e estratégia para entregar projetos que não apenas atendem às
              suas necessidades, mas superam suas expectativas. Acreditamos que a simplicidade é a sofisticação suprema.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluções completas para sua presença digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Desenvolvimento Web",
                description: "Sites e aplicações web modernas, responsivas e otimizadas para performance máxima.",
                icon: "fas fa-code",
              },
              {
                title: "UI/UX Design",
                description: "Interfaces intuitivas e experiências de usuário que convertem visitantes em clientes.",
                icon: "fas fa-palette",
              },
              {
                title: "E-commerce",
                description: "Lojas virtuais completas com integração de pagamentos e gestão de produtos.",
                icon: "fas fa-shopping-cart",
              },
              {
                title: "Aplicativos Mobile",
                description: "Apps nativos e híbridos para iOS e Android com performance excepcional.",
                icon: "fas fa-mobile-alt",
              },
              {
                title: "SEO & Marketing",
                description: "Estratégias de otimização e marketing digital para aumentar sua visibilidade.",
                icon: "fas fa-chart-line",
              },
              {
                title: "Consultoria Tech",
                description: "Orientação especializada para escolher as melhores tecnologias para seu negócio.",
                icon: "fas fa-cogs",
              },
            ].map((service, index) => (
              <div key={index} className="gradient-card p-8 rounded-xl border border-border service-card">
                <div className="text-4xl mb-4 text-primary">
                  <i className={service.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-card-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Depoimentos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              O que nossos clientes dizem sobre nosso trabalho
            </p>
          </div>

          <div className="testimonial-carousel relative">
            <div className="gradient-card p-12 rounded-xl border border-border text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full object-cover mr-6"
                />
                <div className="text-left">
                  <h4 className="font-bold text-xl text-card-foreground">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-muted-foreground">{testimonials[currentTestimonial].company}</p>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current mx-1" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed italic mb-8">
                "{testimonials[currentTestimonial].testimonial}"
              </p>

              {/* Carousel indicators */}
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h2>
            <p className="text-xl text-muted-foreground">Vamos conversar sobre seu próximo projeto</p>
          </div>

          <div className="gradient-card p-8 rounded-xl border border-border">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium mb-2">
                  Tipo de Projeto
                </label>
                <input
                  type="text"
                  id="project"
                  placeholder="Site, App, E-commerce..."
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full gradient-primary text-white py-4 rounded-lg font-medium hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold text-primary mb-4">Supernova.ti</div>
          <p className="text-muted-foreground mb-4">Transformando o digital através do design minimalista</p>
          <p className="text-sm text-muted-foreground">
            © 2024 Supernova.ti - Agência Web. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
