/* INTRODUCTION */
/* Qué estoy probando? Agrupar */
describe('Demo Component (test title)', () => { //pyeden haber varios describes.


    test('Esta prueba no debe fallar', () => {

        /* 1. Inicialización */
        const message1 = 'Hola Mundo';

        /* 2. Estimulo */
        const message2 = message1.trim();

        /* 3. Observar comportamiento esperado... */
        expect(message1).toBe(message2)


    })

})
