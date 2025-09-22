

import { retornaArreglo } from "../src/base-pruebas/07-deses-arr";


describe('Test in 07-deses-arr', () => { 

    test('devolver string + arreglo', () => { 
        
        const [letter, number] = retornaArreglo();
        
        expect(letter).toBe('ABC');
        expect(number).toBe(123);
        
        expect(typeof letter).toBe('string'); //expect a typeof string
        expect(typeof number).toBe('number'); //expect a typeof number
        
        expect(letter).toStrictEqual(expect.any(String)); //espera cualquier tipo de string

     })
 })