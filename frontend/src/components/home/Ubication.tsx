export default function Ubication() {

    return (
        <section className="py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">UBICACIÓN</h2>
        <p className="text-gray-600 mb-8">Calle Dolores 10, Mataró, Barcelona 08350</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0 py-4">
          <img src="/images/interior.jpg" alt="Interior farmacia" className="w-full h-64 object-cover rounded-lg shadow-md" />
          <img src="/images/exterior.jpg" alt="Exterior farmacia" className="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>
      </section>
    );
}