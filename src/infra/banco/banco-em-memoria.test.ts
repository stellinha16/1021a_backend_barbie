import { describe, test, expect  } from "vitest";
import BancoEmMemoria from './banco-em-memoria'

describe("Banco em Memoria", ()=>{
    test("Deve salvar no banco em memória",  ()=>{
        const input = {
            id:1,
            titulo:"test",
            descricao:"test",
            foto:"test"
        }
        const bancoEmMemoria = new BancoEmMemoria();
        const result = bancoEmMemoria.salvar({})
        expect(result).toBe(true)
        expect(bancoEmMemoria.dados).toHaveLength(1)
        expect(bancoEmMemoria.dados).toEqual([input])
    }
    )
})