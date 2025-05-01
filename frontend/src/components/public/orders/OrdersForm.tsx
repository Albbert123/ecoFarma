import { useRouter } from "next/navigation";
import { FaClock, FaShieldAlt, FaUserCog, FaShoppingCart, FaBell, FaStore } from "react-icons/fa";

export default function OrdersForm() {
  const router = useRouter();

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          <span className="bg-gradient-to-r bg-clip-text">
            ENCARGOS
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Bienvenidos a la sección de Encargos. Realiza tus pedidos de productos farmacéuticos de manera rápida y sencilla, 
          asegurándote de que todo esté listo para cuando nos visites.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Benefits Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <h2 className="text-2xl font-bold text-sky-800 mb-6 flex items-center">
            <span className="bg-sky-100 p-2 rounded-full mr-3">
              <FaShieldAlt className="text-sky-600" />
            </span>
            ¿Por qué hacer encargos?
          </h2>
          <ul className="space-y-5">
            <li className="flex items-start">
              <div className="bg-sky-50 p-2 rounded-full mr-4">
                <FaClock className="text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Ahorra tiempo</h3>
                <p className="text-gray-600">Evita esperas innecesarias. Tus productos estarán listos al llegar.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-sky-50 p-2 rounded-full mr-4">
                <FaShieldAlt className="text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Seguridad garantizada</h3>
                <p className="text-gray-600">Productos revisados y empaquetados por nuestro equipo farmacéutico.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-sky-50 p-2 rounded-full mr-4">
                <FaUserCog className="text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Personalización</h3>
                <p className="text-gray-600">Selecciona lo que necesitas y elige cuándo recogerlo.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Steps Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <h2 className="text-2xl font-bold text-sky-800 mb-6 flex items-center">
            <span className="bg-teal-100 p-2 rounded-full mr-3">
              <FaShoppingCart className="text-teal-600" />
            </span>
            ¿Cómo empezar?
          </h2>
          <ol className="space-y-5">
            <li className="flex items-start">
              <div className="bg-teal-50 text-teal-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Añade productos</h3>
                <p className="text-gray-600">Busca y selecciona los productos que necesitas.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-teal-50 text-teal-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Realiza el encargo</h3>
                <p className="text-gray-600">Confirma tu pedido con un solo clic.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-teal-50 text-teal-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Recibe notificación</h3>
                <p className="text-gray-600">Te avisaremos cuando tu pedido esté listo.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-teal-50 text-teal-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Recoge en tienda</h3>
                <p className="text-gray-600">Visítanos y lleva tus productos sin esperas.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Location Card */}
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-sky-50 to-teal-50 p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-6">
            <div className="bg-sky-100 p-4 rounded-full">
              <FaStore className="text-sky-600 text-3xl" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-sky-800 mb-3">¿Dónde recoger los encargos?</h2>
            <p className="text-gray-700 mb-4">
              Todos los encargos deben recogerse en nuestra tienda física:
              <br />
              <span className="font-semibold">Calle Dolores, Mataró, Barcelona 08450</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => router.push("/myOrders")}
                className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-500 text-white font-medium rounded-lg hover:from-sky-700 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
              >
                Ver mis encargos
              </button>
              <button 
                onClick={() => router.push("/shop")}
                className="px-6 py-3 bg-white border border-sky-500 text-sky-600 font-medium rounded-lg hover:bg-sky-50 transition-all shadow-md hover:shadow-lg"
              >
                Comenzar encargo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}