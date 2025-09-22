import { FirstApp } from "../src/components/React"
import { render } from "@testing-library/react"

describe('React File Testing, Learning Mode', () => { 

    test('debe hacer match con el snapshoot', () => { 

        const title = 'hola'
        const subtitle = 'hola'
        const name = 'hola'
        render(<FirstApp title={title} subtitle={subtitle} name={name} />) //render actualiza el objeto screen, entre varias cosas..(container)




     })

 })