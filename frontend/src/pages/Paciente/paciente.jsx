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

                <div class="container-forms">
                    <form action="">
                        <div class="informacoes">
                            <label htmlFor="paciente-nome"> Nome do Paciente: </label>
                            <input type="text" name="paciente-nome" id="paciente-nome" />
                        </div>

                        <div class="informacoes">
                            <label htmlFor="paciente-nome"> Nome do Paciente: </label>
                            <input type="text" name="paciente-nome" id="paciente-nome" />
                        </div>

                        <div class="informacoes">
                            <label htmlFor="paciente-nome"> Nome do Paciente: </label>
                            <input type="text" name="paciente-nome" id="paciente-nome" />
                        </div>

                    </form>
                </div>


            </div>

        </>
    )
}