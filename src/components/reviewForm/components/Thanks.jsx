

export const Thanks = ({doctorFName}) => {
    return (
        <>
            <div className="text-center justify-center flex flex-col items-center pt-4"
            >
                <h1 className="text-center p-2">
                    Gracias! Review registrada
                </h1>

                <a
                    className="text-blue-700 cursor-pointer"
                    onClick={() => {
                        // Obtener el parámetro 'from' de la URL
                        const url = new URL(window.location);
                        const fromPage = url.searchParams.get('from');

                        if (fromPage) {
                            window.location.href = fromPage;
                        } else {
                            // Fallback si no hay parámetro 'from'
                            window.location.href = '/';
                        }
                    }}
                >
                    {`Volver al perfil de ${doctorFName}`}
                </a>

            </div>
        </>
    )
}

