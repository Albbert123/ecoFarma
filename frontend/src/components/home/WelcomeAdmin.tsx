import Link from "next/link";

export default function WelcomeAdmin() {
    return (
        <header className="text-center py-15 px-6">
            <h1 className="text-5xl font-bold">BIENVENIDOS A ECOFARMA</h1>
            <h2 className="text-2xl mt-10 mb-5 py-10">Sesión de administrador</h2>

            <p className="mt-6 mb-4 text-lg">Elige qué quieres hacer:</p>

            <div className="mt-15 flex flex-wrap justify-center gap-4">
                <Link href="/manage-products">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                        Gestionar productos
                    </button>
                </Link>
                <Link href="/manage-pharmacists">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                        Gestionar farmacéuticos
                    </button>
                </Link>
                <Link href="/manage-users">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                        Gestionar usuarios
                    </button>
                </Link>
                <Link href="/statistics">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                        Estadísticas
                    </button>
                </Link>
            </div>
        </header>
    );
}
