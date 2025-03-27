import Link from "next/link";

export default function WelcomeFarm() {
    return (
        <header className="text-center py-15 px-6">
            <h1 className="text-5xl font-bold">BIENVENIDOS A ECOFARMA</h1>
            <h2 className="text-2xl mt-10 mb-5 py-10">Sesión de farmacéutico</h2>

            <p className="mt-6 mb-4 text-lg">Elige qué quieres hacer:</p>

            <div className="mt-15 flex flex-wrap justify-center gap-4">
                <Link href="/manage-orders">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                        Gestionar encargos
                    </button>
                </Link>
                <Link href="/user-advice">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                        Asesoramiento a usuarios
                    </button>
                </Link>
                <Link href="/consult-users">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                        Consultar usuarios
                    </button>
                </Link>
            </div>
        </header>
    );
}
