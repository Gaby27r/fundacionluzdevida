import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Users, Heart, Target, Phone, MapPin, ChevronRight, Sun, Moon, ExternalLink } from 'lucide-react';
import iconoLogoClaro from './assets/logos/icono_sin_fondo_claro.png';
import iconoLogoOscuro from './assets/logos/icono_sin_fondo_oscuro.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'quienes-somos', 'que-hacemos', 'a-quien-apoyamos', 'transparencia', 'contacto'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'quienes-somos', label: 'Quiénes Somos' },
    { id: 'que-hacemos', label: 'Qué Hacemos' },
    { id: 'a-quien-apoyamos', label: 'A Quién Apoyamos' },
    { id: 'transparencia', label: 'Transparencia' },
    { id: 'contacto', label: 'Contacto' }
  ];

  const logoActual = isDark ? iconoLogoOscuro : iconoLogoClaro;

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] dark:bg-[#121212] dark:text-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#E8E6E1] dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => scrollToSection('inicio')}
              className="flex items-center space-x-3 group"
              aria-label="Ir a inicio"
            >
              <div className="w-12 h-12 rounded-full bg-[#EFE6D3] dark:bg-gray-700 border border-[#BFA15A] flex items-center justify-center group-hover:border-[#d4b86a] transition-colors overflow-hidden">
                <img src={logoActual} alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-serif text-xl hidden sm:block text-[#1A1A1A] dark:text-gray-100">Fundación Luz de Vida</span>
            </button>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-[#BFA15A] bg-[#F7F6F3] dark:bg-gray-800'
                      : 'text-[#5F5F5F] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-gray-100 hover:bg-[#F7F6F3] dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-[#F7F6F3] dark:hover:bg-gray-800 transition-colors text-[#1A1A1A] dark:text-gray-100"
                aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
                title={isDark ? 'Modo claro' : 'Modo oscuro'}
              >
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#F7F6F3] dark:hover:bg-gray-800 transition-colors text-[#1A1A1A] dark:text-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-[#E8E6E1] dark:border-gray-800">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-[#BFA15A] bg-[#F7F6F3] dark:bg-gray-800'
                      : 'text-[#5F5F5F] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-gray-100 hover:bg-[#F7F6F3] dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main>
        <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#F7F6F3] to-white dark:from-[#121212] dark:via-[#1A1A1A] dark:to-[#121212]">
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="mb-2 flex justify-center">
              <img
                src={logoActual}
                alt="Logo Fundación Luz de Vida"
                className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
              />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#1A1A1A] dark:text-gray-100">
              Fundación <span className="text-[#BFA15A]">Luz de Vida</span>
            </h1>

            <div className="mb-6 space-y-1 text-[#5F5F5F] dark:text-gray-400">
              <p className="text-lg sm:text-xl font-semibold text-[#1A1A1A] dark:text-gray-100">NIT: 9003299113</p>
              <p className="text-sm sm:text-base font-bold">Inscripción N° S0036006</p>
              <p className="text-sm sm:text-base font-bold">21 de Diciembre de 2009</p>
            </div>

            <p className="text-xl sm:text-2xl text-[#5F5F5F] dark:text-gray-400 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
              Educando las nuevas generaciones para construir un mejor país
            </p>

            <p className="text-base sm:text-lg text-[#5F5F5F] dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Facilitamos el acceso a oportunidades educativas y acompañamos a niños y jóvenes en su desarrollo formativo en Soacha, Cundinamarca.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/573103367911?text=Hola%2C%20quiero%20solicitar%20información%20sobre%20la%20Fundación%20Luz%20de%20Vida"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#BFA15A] text-white font-semibold rounded-lg hover:bg-[#d4b86a] transition-all hover:shadow-lg hover:shadow-[#BFA15A]/20 group"
              >
                Solicitar información
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => scrollToSection('que-hacemos')}
                className="inline-flex items-center px-8 py-4 bg-[#F7F6F3] dark:bg-gray-800 text-[#1A1A1A] dark:text-gray-100 font-semibold rounded-lg hover:bg-[#E8E6E1] dark:hover:bg-gray-700 transition-all border border-[#E8E6E1] dark:border-gray-700 hover:border-[#BFA15A]"
              >
                Cómo participar
              </button>
            </div>
          </div>
        </section>

        <section id="quienes-somos" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F6F3] dark:bg-[#1A1A1A]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-gray-100">
              Quiénes <span className="text-[#BFA15A]">Somos</span>
            </h2>

            <div className="h-1 w-24 bg-[#BFA15A] mx-auto mb-12"></div>

            <div className="space-y-6 text-[#5F5F5F] dark:text-gray-400 leading-relaxed text-base sm:text-lg">
              <p>
                <strong className="text-[#1A1A1A] dark:text-gray-100">Fundación Luz de Vida</strong> es una organización educativa y social con enfoque comunitario, establecida en Soacha, Cundinamarca. Nuestro propósito es incentivar el estudio y facilitar el acceso a beneficios educativos para niños y jóvenes de nuestra región.
              </p>

              <p>
                Trabajamos directamente con las comunidades locales, creando puentes entre las familias y oportunidades formativas que fortalezcan el desarrollo académico y personal de los estudiantes. A través de actividades comunitarias, sociales y pedagógicas, nos acercamos a quienes más lo necesitan.
              </p>

              <p>
                Contamos con alianzas estratégicas con instituciones educativas de trayectoria reconocida, permitiéndonos ofrecer programas de formación en áreas académicas y tecnológicas que preparan a las nuevas generaciones para un futuro prometedor.
              </p>
            </div>
          </div>
        </section>

        <section id="que-hacemos" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-gray-100">
              Qué <span className="text-[#BFA15A]">Hacemos</span>
            </h2>

            <div className="h-1 w-24 bg-[#BFA15A] mx-auto mb-12"></div>

            <p className="text-center text-[#5F5F5F] dark:text-gray-400 text-base sm:text-lg mb-16 max-w-3xl mx-auto leading-relaxed">
              Desarrollamos actividades integrales orientadas a facilitar el acceso educativo y fortalecer el aprendizaje de niños y jóvenes en Soacha y zonas cercanas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#F7F6F3] dark:bg-gray-800/50 p-8 rounded-xl border border-[#E8E6E1] dark:border-gray-700 hover:border-[#BFA15A] transition-all hover:shadow-lg hover:shadow-[#BFA15A]/10 group">
                <div className="w-14 h-14 rounded-lg bg-[#EFE6D3] dark:bg-gray-700 border border-[#BFA15A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="text-[#BFA15A]" size={28} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4 text-[#1A1A1A] dark:text-gray-100">Acceso Educativo</h3>
                <p className="text-[#5F5F5F] dark:text-gray-400 leading-relaxed">
                  Facilitamos el acceso a beneficios y programas educativos que fortalecen la formación académica y tecnológica.
                </p>
              </div>

              <div className="bg-[#F7F6F3] dark:bg-gray-800/50 p-8 rounded-xl border border-[#E8E6E1] dark:border-gray-700 hover:border-[#BFA15A] transition-all hover:shadow-lg hover:shadow-[#BFA15A]/10 group">
                <div className="w-14 h-14 rounded-lg bg-[#EFE6D3] dark:bg-gray-700 border border-[#BFA15A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="text-[#BFA15A]" size={28} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4 text-[#1A1A1A] dark:text-gray-100">Actividades Comunitarias</h3>
                <p className="text-[#5F5F5F] dark:text-gray-400 leading-relaxed">
                  Organizamos eventos sociales, recreativos y pedagógicos para acercarnos a las comunidades y motivar el aprendizaje.
                </p>
              </div>

              <div className="bg-[#F7F6F3] dark:bg-gray-800/50 p-8 rounded-xl border border-[#E8E6E1] dark:border-gray-700 hover:border-[#BFA15A] transition-all hover:shadow-lg hover:shadow-[#BFA15A]/10 group">
                <div className="w-14 h-14 rounded-lg bg-[#EFE6D3] dark:bg-gray-700 border border-[#BFA15A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="text-[#BFA15A]" size={28} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4 text-[#1A1A1A] dark:text-gray-100">Acompañamiento</h3>
                <p className="text-[#5F5F5F] dark:text-gray-400 leading-relaxed">
                  Brindamos orientación y apoyo continuo a estudiantes y familias durante su proceso formativo.
                </p>
              </div>

              <div className="bg-[#F7F6F3] dark:bg-gray-800/50 p-8 rounded-xl border border-[#E8E6E1] dark:border-gray-700 hover:border-[#BFA15A] transition-all hover:shadow-lg hover:shadow-[#BFA15A]/10 group">
                <div className="w-14 h-14 rounded-lg bg-[#EFE6D3] dark:bg-gray-700 border border-[#BFA15A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="text-[#BFA15A]" size={28} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4 text-[#1A1A1A] dark:text-gray-100">Alianzas Educativas</h3>
                <p className="text-[#5F5F5F] dark:text-gray-400 leading-relaxed">
                  Mantenemos convenios con instituciones de trayectoria para ofrecer formación de calidad en diversas áreas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="a-quien-apoyamos" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F6F3] dark:bg-[#1A1A1A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-gray-100">
              A Quién <span className="text-[#BFA15A]">Apoyamos</span>
            </h2>

            <div className="h-1 w-24 bg-[#BFA15A] mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl border border-[#E8E6E1] dark:border-gray-700">
                <div className="text-5xl font-serif text-[#BFA15A] mb-3">6 - 20 años</div>
                <div className="text-lg font-semibold mb-2 text-[#1A1A1A] dark:text-gray-100">Rango de Edad</div>
                <div className="text-[#5F5F5F] dark:text-gray-400">Niños y jóvenes en edad escolar y bachilleres</div>
              </div>

              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl border border-[#E8E6E1] dark:border-gray-700">
                <div className="text-5xl font-serif text-[#BFA15A] mb-3">Soacha</div>
                <div className="text-lg font-semibold mb-2 text-[#1A1A1A] dark:text-gray-100">Área de Cobertura</div>
                <div className="text-[#5F5F5F] dark:text-gray-400">Cundinamarca y zonas cercanas</div>
              </div>

              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl border border-[#E8E6E1] dark:border-gray-700">
                <div className="text-5xl font-serif text-[#BFA15A] mb-3">+</div>
                <div className="text-lg font-semibold mb-2 text-[#1A1A1A] dark:text-gray-100">Comunidad</div>
                <div className="text-[#5F5F5F] dark:text-gray-400">Familias comprometidas con la educación</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl border border-[#E8E6E1] dark:border-gray-700">
              <p className="text-[#5F5F5F] dark:text-gray-400 leading-relaxed text-base sm:text-lg mb-6">
                Nuestro enfoque está dirigido a <strong className="text-[#1A1A1A] dark:text-gray-100">estudiantes de colegios y bachilleres</strong> entre 6 y 20 años que buscan fortalecer su formación académica y acceder a oportunidades educativas de calidad.
              </p>
              <p className="text-[#5F5F5F] leading-relaxed text-base sm:text-lg">
                Trabajamos especialmente con <strong className="text-[#1A1A1A] dark:text-gray-100">comunidades y familias</strong> en Soacha que desean invertir en el futuro de sus hijos a través de la educación, brindándoles el acompañamiento y las herramientas necesarias para alcanzar sus metas.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-gray-100">
              Nuestros <span className="text-[#BFA15A]">Valores</span>
            </h2>

            <div className="h-1 w-24 bg-[#BFA15A] mx-auto mb-12"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Compromiso Educativo', desc: 'Dedicados al desarrollo integral de cada estudiante' },
                { title: 'Transparencia', desc: 'Gestión clara y responsable de todos nuestros procesos' },
                { title: 'Inclusión', desc: 'Acceso equitativo a oportunidades para todas las familias' },
                { title: 'Excelencia', desc: 'Búsqueda constante de la calidad en nuestros programas' },
                { title: 'Respeto', desc: 'Valoración de la dignidad y derechos de cada persona' },
                { title: 'Responsabilidad Social', desc: 'Contribución activa al desarrollo de nuestra comunidad' }
              ].map((value, index) => (
                <div key={index} className="bg-[#F7F6F3] dark:bg-gray-800/50 p-6 rounded-xl border border-[#E8E6E1] dark:border-gray-700 hover:border-[#BFA15A] transition-all">
                  <h3 className="font-serif text-lg font-semibold mb-2 text-[#BFA15A]">{value.title}</h3>
                  <p className="text-[#5F5F5F] dark:text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="transparencia" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F6F3] dark:bg-[#1A1A1A]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-gray-100">
              Transparencia y <span className="text-[#BFA15A]">Protección de Datos</span>
            </h2>

            <div className="h-1 w-24 bg-[#BFA15A] mx-auto mb-12"></div>

            <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl border border-[#E8E6E1] dark:border-gray-700">
              <h3 className="font-serif text-xl font-semibold mb-6 text-[#BFA15A]">Compromiso con la Privacidad</h3>

              <div className="space-y-4 text-[#5F5F5F] dark:text-gray-400 leading-relaxed">
                <p>
                  En <strong className="text-[#1A1A1A] dark:text-gray-100">Fundación Luz de Vida</strong> manejamos la información con el máximo respeto y responsabilidad. Los datos recopilados durante nuestras actividades se utilizan exclusivamente con fines educativos e informativos.
                </p>

                <div className="pl-6 border-l-2 border-[#BFA15A] my-6">
                  <p className="text-sm mb-4">
                    <strong className="text-[#1A1A1A] dark:text-gray-100">Información que recopilamos:</strong>
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Nombre del estudiante</li>
                    <li>• Teléfono del acudiente o responsable</li>
                    <li>• Información básica necesaria para actividades comunitarias, sociales y recreativas</li>
                  </ul>
                </div>

                <p>
                  <strong className="text-[#1A1A1A] dark:text-gray-100">Uso de la información:</strong> Los datos recopilados se utilizan únicamente para mantener contacto informativo, coordinar actividades educativas y brindar acompañamiento en el proceso formativo. No compartimos información personal con terceros sin consentimiento previo.
                </p>

                <p>
                  <strong className="text-[#1A1A1A]">Confidencialidad:</strong> Implementamos medidas de seguridad para proteger la información y garantizar su manejo confidencial conforme a las normativas colombianas de protección de datos personales.
                </p>

                <p className="text-sm pt-4 border-t border-[#E8E6E1] dark:border-gray-700 mt-6">
                  Para consultas sobre el tratamiento de datos o ejercer sus derechos de acceso, rectificación o supresión, puede contactarnos a través de nuestros canales oficiales.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-gray-100">
              <span className="text-[#BFA15A]">Contacto</span>
            </h2>

            <div className="h-1 w-24 bg-[#BFA15A] mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#F7F6F3] dark:bg-gray-800/50 p-8 rounded-xl border border-[#E8E6E1] dark:border-gray-700">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#EFE6D3] dark:bg-gray-700 border border-[#BFA15A] flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#BFA15A]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1A1A1A] dark:text-gray-100">WhatsApp</h3>
                    <div className="space-y-1">
                      <a
                        href="https://wa.me/573103367911"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[#BFA15A] hover:text-[#d4b86a] transition-colors font-medium"
                      >
                        +57 310 336 7911
                      </a>
                      <a
                        href="https://wa.me/573103350100"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[#BFA15A] hover:text-[#d4b86a] transition-colors font-medium"
                      >
                        +57 310 335 0100
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-[#5F5F5F] dark:text-gray-400 text-sm leading-relaxed">
                  Contáctanos por WhatsApp para solicitar información sobre nuestros programas y beneficios educativos.
                </p>
              </div>

              <div className="bg-[#F7F6F3] dark:bg-gray-800/50 p-8 rounded-xl border border-[#E8E6E1] dark:border-gray-700">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#EFE6D3] dark:bg-gray-700 border border-[#BFA15A] flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#BFA15A]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1A1A1A] dark:text-gray-100">Ubicación</h3>
                    <p className="text-[#5F5F5F] dark:text-gray-400 mb-4">
                      Calle 19 # 7-14 Piso 1<br />
                      Soacha, Cundinamarca<br />
                      Colombia
                    </p>
                    <a
                      href="https://maps.app.goo.gl/dpZxhVcATAs9qP1C6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#BFA15A] text-white text-sm font-medium rounded-lg hover:bg-[#d4b86a] transition-colors"
                    >
                      Cómo llegar
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                <p className="text-[#5F5F5F] text-sm leading-relaxed">
                  Visítanos en nuestra sede en Soacha para conocer más sobre la fundación y nuestras actividades.
                </p>
              </div>
            </div>

            <div className="mb-12 overflow-hidden rounded-xl border border-[#E8E6E1] dark:border-gray-700 shadow-lg max-w-2xl mx-auto">
              <div className="h-64 sm:h-72 bg-[#E8E6E1] dark:bg-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.033986523388!2d-74.21408579999999!3d4.582888299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9fe5d9d81235%3A0xdbbba4b78fe2ac0e!2sFundaci%C3%B3n%20Luz%20de%20Vida%20Soacha!5e1!3m2!1ses!2sco!4v1770932823510!5m2!1ses!2sco"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Fundación Luz de Vida"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/dpZxhVcATAs9qP1C6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#F7F6F3] dark:bg-gray-800 text-[#BFA15A] hover:bg-[#EFE6D3] dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Abrir en Google Maps
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="bg-[#F7F6F3] dark:bg-gray-800/50 p-8 sm:p-12 rounded-xl border border-[#E8E6E1] dark:border-gray-700 text-center">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-[#1A1A1A] dark:text-gray-100">¿Listo para comenzar?</h3>
              <p className="text-[#5F5F5F] dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                Si deseas conocer más sobre nuestros programas educativos y cómo tu familia puede beneficiarse, escríbenos por WhatsApp. Estamos aquí para acompañarte en este importante proceso.
              </p>
              <a
                href="https://wa.me/573103367911?text=Hola%2C%20quiero%20solicitar%20información%20sobre%20la%20Fundación%20Luz%20de%20Vida"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#BFA15A] text-white font-semibold rounded-lg hover:bg-[#d4b86a] transition-all hover:shadow-lg hover:shadow-[#BFA15A]/20 group"
              >
                Enviar mensaje por WhatsApp
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#121212] border-t border-[#2A2A2A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#EFE6D3] dark:bg-gray-700 border border-[#BFA15A] flex items-center justify-center overflow-hidden">
                  <img src={logoActual} alt="Logo" className="w-6 h-6 object-contain" />
                </div>
                <span className="font-serif text-lg text-white">Luz de Vida</span>
              </div>
              <p className="text-[#D6D6D6] text-sm leading-relaxed">
                Fundación educativa y social comprometida con el desarrollo integral de niños y jóvenes en Soacha, Cundinamarca.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#BFA15A]">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-[#D6D6D6] hover:text-[#BFA15A] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#BFA15A]">Contacto</h3>
              <ul className="space-y-3 text-sm text-[#D6D6D6]">
                <li className="flex items-start space-x-2">
                  <Phone size={16} className="mt-1 flex-shrink-0 text-[#BFA15A]" />
                  <a
                    href="https://wa.me/573103367911"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#BFA15A] transition-colors"
                  >
                    +57 310 336 7911
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <Phone size={16} className="mt-1 flex-shrink-0 text-[#BFA15A]" />
                  <a
                    href="https://wa.me/573103350100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#BFA15A] transition-colors"
                  >
                    +57 310 335 0100
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <Phone size={16} className="mt-1 flex-shrink-0 text-[#BFA15A]" />
                  <a
                    href="https://wa.me/573171622489"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#BFA15A] transition-colors"
                  >
                    +57 317 162 2489
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0 text-[#BFA15A]" />
                  <span>
                    Calle 19 # 7-14 Piso 1<br />
                    Soacha, Cundinamarca<br />
                    Colombia
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#BFA15A]">Horario de Atención</h3>
              <p className="text-sm text-[#D6D6D6] leading-relaxed mb-4">
                Lunes a sábado<br />
                8:00 a.m. – 5:00 p.m.
              </p>
              <p className="text-sm text-[#D6D6D6] leading-relaxed">
                Escríbenos por WhatsApp en cualquier momento y te responderemos a la brevedad posible.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#2A2A2A]">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-[#D6D6D6] text-center sm:text-left">
                © {new Date().getFullYear()} Fundación Luz de Vida. Todos los derechos reservados.
              </p>
              <p className="text-xs text-[#D6D6D6] text-center sm:text-right max-w-md">
                Organización sin ánimo de lucro dedicada a facilitar el acceso educativo en Soacha, Cundinamarca.
              </p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-xs text-[#D6D6D6] leading-relaxed">
                Los datos personales son tratados conforme a la normativa colombiana de protección de datos. Para más información, consulte nuestra sección de Transparencia y Protección de Datos.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
