import Link from "next/link";

export default function Service() {

    return (
        <section className="bg-white text-gray-900">
            <h2 className="text-3xl font-bold text-center mb-12 py-10">SERVICIOS</h2>
    
            <div className="max-w-6xl mx-auto px-6 space-y-2">
                {/* Primera fila */}
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Imagen */}
                    <img
                        src="/images/encargo.jpg"
                        alt="Encargo de productos"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    {/* Texto */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold">ENCARGO DE PRODUCTOS</h3>
                        <p className="mt-2 text-gray-700">
                        Realiza tus encargos desde la comodidad de tu hogar. Evita perder
                        tiempo esperando en la cola. ¡Llega, coge tus productos y listo!
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block mt-4 px-6 py-2 border rounded-full hover:bg-blue-100 hover:text-white transition"
                            style={{ textDecoration: 'none', color: 'inherit'}}
                        >
                            Ir a la tienda
                        </Link>
                    </div>
                </div>
    
                {/* Segunda fila (invertida) */}
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Texto */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold">GESTIÓN DE RECETAS</h3>
                        <p className="mt-2 text-gray-700">
                        Digitaliza tus recetas médicas en segundos. Sube PDFs o imágenes,
                        consulta tus recetas almacenadas y añade productos al carrito con
                        un solo clic.
                        </p>
                        <Link
                            href="/recetas"
                            className="inline-block mt-4 px-6 py-2 border rounded-full hover:bg-blue-100 hover:text-white transition"
                            style={{ textDecoration: 'none', color: 'inherit'}}
                        >
                            Gestionar recetas
                        </Link>
                    </div>
                    {/* Imagen */}
                    <img
                        src="/images/recetas.jpg"
                        alt="Gestión de recetas"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
    
                {/* Tercera fila */}
                <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Imagen */}
                    <img
                        src="/images/asesoramiento.jpg"
                        alt="Asesoramiento farmacéutico"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    {/* Texto */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold">ASESORAMIENTO FARMACÉUTICO</h3>
                        <p className="mt-2 text-gray-700">
                        Resuelve tus dudas con nuestros farmacéuticos. Consulta en línea y
                        recibe respuestas rápidas y confiables.
                        </p>
                        <Link
                            href="/contacto"
                            className="inline-block mt-4 px-6 py-2 border rounded-full hover:bg-blue-100 hover:text-white transition"
                            style={{ textDecoration: 'none', color: 'inherit'}}
                        >
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>
        </section>    
    );
}
