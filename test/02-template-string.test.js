import { getSaludo } from "../src/base-pruebas/02-template-string";

describe('Test in 03-template-string', () => { 

    test('getSaludo debe retornat "Fernando"', () => { 

        const nombre = 'Fernando';

        const message = getSaludo(nombre);

        expect(message).toBe(`Hola ${nombre}`)

     })

 })