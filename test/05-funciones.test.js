import { getUser, getUsuarioActivo } from "../src/base-pruebas/05-funciones"


describe('Test Functions', () => {

    test('Test Functions getUser', () => {

        const user = {
            uid: 'ABC123',
            username: 'El_Papi1502'

        }

        const message = getUser();

        console.log(message)

        expect(message).toStrictEqual(user)
    })

    /* note:
     1. toBo es distitno a toStrictEqual o toEqual... el objeto user tiene 2 key que APUNTAN A DISTITNOS ESPACIOS EN MEMORIA
    
    */

    test('Test getUsuarioActivo', () => {

        const nombre = 'Pancho'

        const activeUser = {
            uid: 'ABC567',
            username: nombre
        }

        const message = getUsuarioActivo(nombre)

        expect(message).toStrictEqual(activeUser)
    })

})