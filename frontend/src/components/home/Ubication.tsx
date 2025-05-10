export default function Ubication() {
  return (
      <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-800 mb-3">
                      <span className="text-green-600">NUESTRA</span> UBICACIÓN
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full mb-4"></div>
                  <div className="flex items-center justify-center space-x-2">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <p className="text-xl text-gray-700 font-medium">Calle Dolores 10, Mataró, Barcelona 08350</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1">
                      <img 
                          src="/images/interior.jpg" 
                          alt="Interior farmacia" 
                          className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent flex items-end p-6">
                          <h3 className="text-white text-2xl font-semibold">Nuestro Espacio Interior</h3>
                      </div>
                  </div>

                  <div className="relative group overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1">
                      <img 
                          src="/images/exterior.jpg" 
                          alt="Exterior farmacia" 
                          className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent flex items-end p-6">
                          <h3 className="text-white text-2xl font-semibold">Fachada Principal</h3>
                      </div>
                  </div>
              </div>

              <div className="mt-12 text-center">
                  <a 
                      href="https://maps.google.com?q=Calle+Dolores+10,Mataró,Barcelona+08350" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
                  >
                      Ver en Google Maps
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                  </a>
              </div>
          </div>
      </section>
  );
}