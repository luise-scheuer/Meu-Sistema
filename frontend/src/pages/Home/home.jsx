import "./home.css"
import homeImg from './homem.png';
import icon from './icon.png';
export default function Home() {
    return (
        <main>
            <div id="inicial">
                <div id="titulo">
                    <h1><span class="destaque">Sistema</span> de Gerenciamento Hospitalar</h1>
                    <p>Otimize seu tempo com um sistema simples. Cadastre pacientes, médicos e atendimentos com rapidez e segurança.</p>
                </div>

                <div id="box-imagem">
                    <img src={homeImg} alt="Imagem da home" />
                </div>
            </div>

            <div id="box-pai">
                <div class="box">
                    <img src={icon} alt="Imagem da home" />
                    <h2>Faça check-ups</h2>
                    <p> Realizar exames de rotina ajuda na prevenção e detecção precoce de doenças. Consulte seu médico regularmente.</p>
                </div>
                <div class="box">
                    <img src={icon} alt="Imagem da home" />
                    <h2>Saúde mental importa</h2>
                    <p> Ansiedade e estresse também merecem atenção. Tire um tempo para você e procure ajuda profissional se precisar.</p>
                </div>
                <div class="box">
                    <img src={icon} alt="Imagem da home" />
                    <h2>Hidrate-se</h2>
                    <p> Beba ao menos 2 litros de água por dia e mantenha uma dieta variada. Seu corpo agradece.</p>
                </div>
            </div>

        </main>

    )
}