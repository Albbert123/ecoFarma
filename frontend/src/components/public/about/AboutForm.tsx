import { FaClinicMedical, FaMobileAlt, FaHandsHelping, FaMapMarkerAlt } from 'react-icons/fa';

export default function AboutForm() {
  return (
    <section className="container my-5 py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">Sobre <span className="text-success">ecoFarma</span></h1>
            <div className="divider bg-primary mx-auto" style={{ width: '80px', height: '4px' }}></div>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary-light text-primary mb-4">
                    <FaClinicMedical size={28} />
                  </div>
                  <h3 className="h4 mb-3">Nuestra Misión</h3>
                  <p className="mb-0">
                    <strong>ecoFarma</strong> nace con el propósito de facilitar el acceso a productos farmacéuticos de forma rápida, segura y eficiente, integrando la tecnología en el día a día de una farmacia tradicional.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary-light text-primary mb-4">
                    <FaMobileAlt size={28} />
                  </div>
                  <h3 className="h4 mb-3">Nuestra Plataforma</h3>
                  <p className="mb-0">
                    Permite encargar medicamentos, subir recetas electrónicas o privadas, y recibir asistencia personalizada desde cualquier dispositivo, sin perder el trato cercano de una farmacia de confianza.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary-light text-primary mb-4">
                    <FaHandsHelping size={28} />
                  </div>
                  <h3 className="h4 mb-3">Nuestro Equipo</h3>
                  <p className="mb-0">
                    Detrás de ecoFarma hay un equipo familiar con años de experiencia en el sector farmacéutico. Conocemos las necesidades de nuestros pacientes y apostamos por una transformación digital responsable.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary-light text-primary mb-4">
                    <FaMapMarkerAlt size={28} />
                  </div>
                  <h3 className="h4 mb-3">Nuestra Ubicación</h3>
                  <p className="mb-3">
                    Nos encontramos en <strong>Calle Dolores 10, Mataró (Barcelona)</strong>.
                  </p>
                  <a 
                    href="https://maps.google.com?q=Calle+Dolores+10,+Mataró" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    Ver en mapa
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center py-4 bg-light rounded-3">
            <h3 className="h4 mb-3">Gracias por confiar en nosotros</h3>
            <p className="mb-0 text-muted">
              Estaremos encantados de atenderte tanto en la web como en persona.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}