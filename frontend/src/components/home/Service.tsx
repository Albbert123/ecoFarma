import Link from "next/link";

export default function Service() {
    return (
        <section className="bg-white text-gray-900 py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-3">
                    <div className=" mb-4 w-20 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto"></div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                        NUESTROS <span className="text-green-600">SERVICIOS</span>
                    </h2>
                </div>
                
                {/* Primera fila */}
                <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative group overflow-hidden rounded-xl shadow-lg">
                        <img
                            src="/images/encargo.jpg"
                            alt="Encargo de productos"
                            className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    </div>
                    
                    <div className="text-center md:text-left px-4">
                        <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-3 mb-6">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">ENCARGO DE PRODUCTOS</h3>
                        <p className="text-gray-600 mb-6">
                            Realiza tus encargos desde la comodidad de tu hogar. Evita perder tiempo esperando en la cola. 
                            ¡Llega, coge tus productos y listo!
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                            style={{ textDecoration: 'none', color: 'inherit'}}
                        >
                            Ir a la tienda
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Segunda fila (invertida) */}
                <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left px-4 order-1 md:order-2">
                        <div className="inline-flex items-center justify-center bg-blue-100 rounded-full p-3 mb-6">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">GESTIÓN DE RECETAS</h3>
                        <p className="text-gray-600 mb-6">
                            Digitaliza tus recetas médicas en segundos. Sube PDFs o imágenes,
                            consulta tus recetas almacenadas y añade productos al carrito con
                            un solo clic.
                        </p>
                        <Link
                            href="/prescriptions"
                            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                            style={{ textDecoration: 'none', color: 'inherit'}}
                        >
                            Gestionar recetas
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="relative group overflow-hidden rounded-xl shadow-lg order-2 md:order-1">
                        <img
                            src="/images/recetas.jpg"
                            alt="Gestión de recetas"
                            className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    </div>
                </div>

                {/* Tercera fila */}
                <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative group overflow-hidden rounded-xl shadow-lg">
                        <img
                            src="/images/asesoramiento.jpg"
                            alt="Asesoramiento farmacéutico"
                            className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    </div>
                    
                    <div className="text-center md:text-left px-4">
                        <div className="inline-flex items-center justify-center bg-purple-100 rounded-full p-3 mb-6">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">ASESORAMIENTO FARMACÉUTICO</h3>
                        <p className="text-gray-600 mb-6">
                            Resuelve tus dudas con nuestros farmacéuticos. Consulta en línea y
                            recibe respuestas rápidas y confiables.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
                            style={{ textDecoration: 'none', color: 'inherit'}}
                        >
                            Contactar ahora
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}