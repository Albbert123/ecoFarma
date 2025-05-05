import { subscribeToNewsletter } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaInstagram, FaYelp, FaTripadvisor, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validación básica del email
    if (!email || !email.includes("@")) {
      alert("Por favor ingresa un correo electrónico válido");
      setIsSubmitting(false);
      return;
    }

    if (!isAuthenticated) {
      alert("Debes estar autenticado para suscribirte al newsletter");
      setIsSubmitting(false);
      return;
    }

    try {
      await subscribeToNewsletter(email);
      
      toast.success("Te has suscrito al newsletter con éxito!");
      setEmail("");
    } catch (error) {
      toast.error("Error al suscribirte al newsletter");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo y descripción */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="bg-white text-green-800 px-2 py-1 rounded mr-2">ECO</span>
            <span>FARMA</span>
          </h2>
          
          {/* Newsletter */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Suscríbete a nuestro newsletter</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Suscribirse"}
              </button>
            </form>
            <p className="text-xs text-gray-300 mt-2">Te enviaremos ofertas y novedades a ecofarma.newsletter@gmail.com</p>
          </div>
        </div>

        {/* Resto del footer (igual que antes) */}
        <div>
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-green-500 inline-block">Menú</h3>
          <ul className="space-y-3">
            <li>
              <Link 
                href="/prescriptions" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Gestión de recetas
              </Link>
            </li>
            <li>
              <Link 
                href="/shop" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Tienda
              </Link>
            </li>
            <li>
              <Link 
                href="/orders" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Encargos
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Contacto
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Acerca de
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-green-500 inline-block">Síguenos</h3>
          <ul className="space-y-3">
            <li>
              <Link 
                href="#" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <FaFacebook className="mr-2 text-blue-400" />
                Facebook
              </Link>
            </li>
            <li>
              <Link 
                href="#" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <FaInstagram className="mr-2 text-pink-400" />
                Instagram
              </Link>
            </li>
            <li>
              <Link 
                href="#" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <FaYelp className="mr-2 text-red-400" />
                Yelp
              </Link>
            </li>
            <li>
              <Link
                href="#" 
                className="hover:text-yellow-400 transition duration-300 flex items-center"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                <FaTripadvisor className="mr-2 text-green-400" />
                TripAdvisor
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-green-500 inline-block">Contacto</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-3 text-yellow-400" />
              <div>
                <p className="font-medium">Dirección:</p>
                <p className="text-gray-300">Calle Dolores 10, Mataró, Barcelona 08350</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <FaEnvelope className="mr-3 text-yellow-400" />
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-300">info@ecofarma.com</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <FaPhone className="mr-3 text-yellow-400" />
              <div>
                <p className="font-medium">Teléfono:</p>
                <p className="text-gray-300">+52-1-33-12345678</p>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-2">Horario:</h4>
              <p className="text-gray-300">Lunes a Viernes: 8:00 - 20:00</p>
              <p className="text-gray-300">Sábados: 9:00 - 15:00</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm mt-12 border-t border-green-700 pt-6">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <a href="#" className="hover:text-yellow-400 transition duration-300">Términos y condiciones</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-yellow-400 transition duration-300">Política de envío</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-yellow-400 transition duration-300">Política de privacidad</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-yellow-400 transition duration-300">Aviso legal</a>
        </div>
        <p className="text-gray-300">© {new Date().getFullYear()} EcoFarma Farmacia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}