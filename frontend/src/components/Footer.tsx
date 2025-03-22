import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo y descripción */}
          <div>
            <h2 className="text-xl font-bold">ECOFARMA FARMACIA</h2>
          </div>
  
          {/* Menú */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menú</h3>
            <ul className="space-y-2">
                <li><Link 
                    href="/dashboard" 
                    className="hover:text-gray-400" 
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >Gestión de recetas
                    </Link>
                </li>
                <li><Link 
                    href="/shop" 
                    className="hover:text-gray-400"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >Tienda
                    </Link>
                </li>
                <li><Link 
                    href="/orders" 
                    className="hover:text-gray-400"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >Encargos
                    </Link>
                </li>
                <li><Link 
                    href="/contact" 
                    className="hover:text-gray-400"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >Contacto
                    </Link>
                </li>
                <li><Link 
                    href="/about" 
                    className="hover:text-gray-400"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >Acerca de
                    </Link>
                </li>
            </ul>
          </div>
  
          {/* Redes sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <ul className="space-y-2">
                <li><Link 
                    href="#" 
                    className="hover:text-gray-400"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >Facebook
                    </Link>
                </li>
                <li><Link 
                    href="#" 
                    className="hover:text-gray-400"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >Instagram
                    </Link>
                </li>
                <li><Link 
                    href="#" 
                    className="hover:text-gray-400"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >Yelp
                    </Link>
                </li>
                <li><Link
                    href="#" 
                    className="hover:text-gray-400"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >TripAdvisor
                    </Link>
                </li>
            </ul>
          </div>
  
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Reservas</h3>
            <p>Mail: info@mistilo.com</p>
            <p>Tel: +52-1-33-12345678</p>
          </div>
        </div>
        {/* Derechos */}
        <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
          © 2025 Creado por EcoFarma | <a href="#" className="hover:text-gray-400">Términos y condiciones</a> | <a href="#" className="hover:text-gray-400">Política de envío</a> | <a href="#" className="hover:text-gray-400">Política de privacidad</a>
        </div>
      </footer>
    );
  }
  