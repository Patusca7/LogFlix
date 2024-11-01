import { Card, Container } from "react-bootstrap";

function TextCard() {
    return (
        <Container className="mt-5">
            <Card>
                <Card.Header className="text-start bg-dark text-white">
                    Sobre o Projeto:
                </Card.Header>
                <Card.Body>
                    <p className="text-start">O projeto tem o nome de LogFlix, e está incluído na área de Media e Entretenimento. A finalidade deste software é que o utilizador tenha a oportunidade de saber todos os filmes/séries que já viu e os detalhes dos mesmos.<br />
                        Através das funcionalidades do projeto é possivel:
                        <ul>
                            <li>Consultar a lista pessoal;</li>
                            <li>Adicionar filme á lista pessoal;</li>
                            <li>Adicionar comentário a um filme;</li>
                            <li>Ver os comentários sobre um filme;</li>
                            <li>Remover o próprio comentário;</li>
                            <li>Adicionar filme á lista total (admin);</li>
                            <li>Remover qualquer comentário (admin).</li>
                        </ul>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default TextCard;