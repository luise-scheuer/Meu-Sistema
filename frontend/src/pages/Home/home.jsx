import "./home.css"
import homeImg from './homem.png';
export default function Home() {
    return (
        <main>
            <div id="titulo">
                <h1>Sistema de Gerenciamento Hospitalar</h1>

                <div id="box-imagem">
                    <img src={homeImg} alt="Imagem da home" />
                </div>
            </div>

            <div id="box-pai">
                <div class="box">1</div>
                <div class="box">2</div>
                <div class="box">3</div>
            </div>

        </main>

    )
}