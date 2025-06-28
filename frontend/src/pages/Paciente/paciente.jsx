import { MdCreate, MdDeleteForever } from "react-icons/md";
import "./paciente.css";

export default function Paciente() {
    return (
        <>
            <div class="container-paciente">
                <h1 class="titulo"> Paciente </h1>

                <div class="container-opcoes">
                    <button class="opcoes">Cadastrar</button>
                    <button class="opcoes">Buscar</button>
                </div>

                <div class="container">
                    <form action="">
                        <div class="informacoes">
                            <label htmlFor="paciente-nome"> Nome do Paciente: </label>
                            <input type="text" name="paciente-nome" id="paciente-nome" />
                        </div>

                        <div class="informacoes">
                            <label htmlFor="paciente-cpf"> CPF: </label>
                            <input type="text" name="paciente-cpf" id="paciente-cpf" />
                        </div>

                        <div class="informacoes">
                            <label htmlFor="paciente-nascimento"> Data de Nascimento: </label>
                            <input type="date" name="paciente-nascimento" id="paciente-nascimento" />
                        </div>

                        <div class="informacoes">
                            <label htmlFor="paciente-endereco"> Endereço: </label>
                            <input type="text" name="paciente-endereco" id="paciente-endereco" />
                        </div>

                        <div class="informacoes">
                            <label htmlFor="paciente-telefone"> Telefone: </label>
                            <input type="text" name="paciente-telefone" id="paciente-telefone" />
                        </div>

                        <button id="enviar" type="submit">Enviar</button>

                    </form>
                </div>

                <div class="container">
                    <table className="tabela-pacientes">
                        <thead>
                            <tr>
                                <th>NOME</th>
                                <th>CPF</th>
                                <th>OPÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>NOME DO PACIENTE</th>
                                <th>CPF DO PACIENTE</th>
                                <th class="acoes">
                                    <MdCreate fontSize="30px" color="#4d6477"/>
                                    <MdDeleteForever fontSize="30px" color="#d64859"/>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>

        </>
    )
}