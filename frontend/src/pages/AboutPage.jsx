function AboutPage() {
    return (
        /* Una estructura simple para 'Sobre Nosotros' */
        <div className="max-w-4xl mx-auto p-8 space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Sistema de Gestión Bibliotecaria</h1>
                <p className="mt-4 text-lg text-gray-600">Optimizando el acceso a la cultura y el conocimiento de forma local.</p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Nuestra Misión</h3>
                    <p className="text-blue-900/70">Facilitar el control y préstamo de material bibliográfico de manera eficiente.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-green-800 mb-2">El Objetivo</h3>
                    <p className="text-green-900/70">Reducir los tiempos de espera y mejorar la organización de los ejemplares.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage