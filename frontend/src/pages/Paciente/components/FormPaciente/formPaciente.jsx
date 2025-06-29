import "../../paciente.css";

export default function FormPaciente() {
    return (
        <div className="container">
            <form action="">
                <div className="informacoes">
                    <label htmlFor="paciente-nome"> Nome do Paciente: </label>
                    <input type="text" name="paciente-nome" id="paciente-nome" />
                </div>

                <div className="informacoes">
                    <label htmlFor="paciente-cpf"> CPF: </label>
                    <input type="text" name="paciente-cpf" id="paciente-cpf" />
                </div>

                <div className="informacoes">
                    <label htmlFor="paciente-nascimento"> Data de Nascimento: </label>
                    <input type="date" name="paciente-nascimento" id="paciente-nascimento" />
                </div>

                <div className="informacoes">
                    <label htmlFor="paciente-endereco"> Endereço: </label>
                    <input type="text" name="paciente-endereco" id="paciente-endereco" />
                </div>

                <div className="informacoes">
                    <label htmlFor="paciente-telefone"> Telefone: </label>
                    <input type="text" name="paciente-telefone" id="paciente-telefone" />
                </div>

                <button id="enviar" type="submit">Enviar</button>

            </form>
        </div>
    );
}