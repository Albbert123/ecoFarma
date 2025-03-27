export default function Schedule() {

    return (
        <section className="bg-gray-100 py-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 py-6">HORARIO LABORAL</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-12 text-lg">
          <div>
            <p className="font-medium">Lunes - Viernes</p>
            <p className="text-gray-600">7:00 - 22:00</p>
          </div>
          <div>
            <p className="font-medium">Sábado</p>
            <p className="text-gray-600">8:00 - 22:00</p>
          </div>
          <div>
            <p className="font-medium">Domingo</p>
            <p className="text-gray-600">8:00 - 22:00</p>
          </div>
        </div>
      </section>
    );
}