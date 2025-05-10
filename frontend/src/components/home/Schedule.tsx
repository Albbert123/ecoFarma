export default function Schedule() {
  return (
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold text-gray-800 mb-3">
                      <span className="text-green-600">HORARIO</span> DE ATENCIÓN
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
                  <p className="mt-4 text-gray-600 max-w-lg mx-auto">
                      Estamos disponibles para atenderte cuando nos necesites
                  </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Días laborales */}
                      <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center transition-all hover:shadow-lg">
                          <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Lunes - Viernes</h3>
                          <p className="text-lg text-green-600 font-medium">7:00 - 22:00</p>
                      </div>

                      {/* Sábado */}
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center transition-all hover:shadow-lg">
                          <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Sábado</h3>
                          <p className="text-lg text-blue-600 font-medium">8:00 - 22:00</p>
                      </div>

                      {/* Domingo */}
                      <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 text-center transition-all hover:shadow-lg">
                          <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Domingo</h3>
                          <p className="text-lg text-purple-600 font-medium">8:00 - 22:00</p>
                      </div>
                  </div>

                  <div className="mt-8 text-center">
                      <p className="text-gray-500 text-sm">
                          * Horario especial en días festivos: 9:00 - 20:00
                      </p>
                  </div>
              </div>
          </div>
      </section>
  );
}