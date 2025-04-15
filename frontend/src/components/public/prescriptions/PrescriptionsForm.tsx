import Image from "next/image";
import { FaUpload, FaSearch, FaTrash, FaShoppingCart, FaClock, FaShieldAlt, FaTabletAlt } from "react-icons/fa";

const PrescriptionsForm = () => {
  return (
    <section className="px-6 py-16 max-w-6xl mx-auto text-gray-800">
      {/* Encabezado con degradado */}
      <div className="text-center mb-9">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#3498db] to-[#2ecc71] bg-clip-text text-transparent mb-6">
          GESTIÓN DE RECETAS
        </h1>
        <p className="text-xl text-gray-600 max-w-6xl mx-auto leading-relaxed py-6">
          Bienvenido a la sección de Gestión de Recetas de EcoFarma. Esta herramienta está diseñada para facilitarte el proceso de subir, consultar y gestionar tus recetas médicas de manera rápida, segura y eficiente.
        </p>
      </div>

      {/* Tarjetas de funcionalidades */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Tarjeta 1 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#3498db]">
          <div className="text-[#3498db] text-4xl mb-4">
            <FaUpload />
          </div>
          <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Subir Recetas</h3>
          <p className="text-gray-600 mb-4">
            Digitaliza tus recetas médicas en formato PDF o imagen y guárdalas en tu perfil de manera segura.
          </p>
          <button className="mt-auto bg-gradient-to-r from-[#3498db] to-[#2ecc71] text-white px-6 py-2 rounded-full hover:opacity-90 transition">
            Subir ahora
          </button>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#2ecc71]">
          <div className="text-[#2ecc71] text-4xl mb-4">
            <FaSearch />
          </div>
          <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Consultar Recetas</h3>
          <p className="text-gray-600 mb-4">
            Accede a todas tus recetas almacenadas en cualquier momento y desde cualquier dispositivo.
          </p>
          <button className="mt-auto bg-gradient-to-r from-[#2ecc71] to-[#3498db] text-white px-6 py-2 rounded-full hover:opacity-90 transition">
            Ver recetas
          </button>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#9b59b6]">
          <div className="text-[#9b59b6] text-4xl mb-4">
            <FaShoppingCart />
          </div>
          <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Gestionar Recetas</h3>
          <p className="text-gray-600 mb-4">
            Elimina recetas antiguas o añade productos de tus recetas directamente al carrito de compras.
          </p>
          <button className="mt-auto bg-gradient-to-r from-[#9b59b6] to-[#3498db] text-white px-6 py-2 rounded-full hover:opacity-90 transition">
            Gestionar
          </button>
        </div>
      </div>

      {/* Imagen ajustada - más pequeña y más estrecha */}
        <div className="mb-16 relative group max-w-xl mx-auto"> {/* Reducir el ancho máximo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3498db] to-[#2ecc71] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="aspect-w-16 aspect-h-5 rounded-xl overflow-hidden shadow-lg relative z-10 transform group-hover:scale-[1.01] transition duration-500">
                <Image
                    src="/images/receta2.jpg"
                    alt="Persona usando tablet en farmacia"
                    width={600} // Reducir el ancho
                    height={150} // Reducir la altura para hacerla más estrecha
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

      {/* Beneficios */}
      <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-12 rounded-xl shadow-lg mb-16">
        <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-12">
          <span className="border-b-4 border-[#0e52ff] pb-2">¿Por qué es útil?</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-5">
          {/* Beneficio 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#3498db] p-4 rounded-full text-white mb-4">
              <FaClock size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Ahorra tiempo</h3>
            <p className="text-gray-600">
              No necesitas llevar tus recetas físicas a la farmacia. Todo está disponible en línea.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#2ecc71] p-4 rounded-full text-white mb-4">
              <FaTabletAlt size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Acceso rápido</h3>
            <p className="text-gray-600">
              Consulta tus recetas desde cualquier dispositivo, en cualquier momento.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#9b59b6] p-4 rounded-full text-white mb-4">
              <FaShieldAlt size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Seguridad</h3>
            <p className="text-gray-600">
              Tus recetas están protegidas con cifrado y solo tú puedes acceder a ellas.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="text-center bg-[#2C3E50] rounded-xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-6">¿Listo para probarlo?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Empieza a gestionar tus recetas médicas de forma digital hoy mismo.
        </p>
        <button className="bg-gradient-to-r from-[#3498db] to-[#2ecc71] text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Comenzar ahora
        </button>
      </div>
    </section>
  );
};

export default PrescriptionsForm;