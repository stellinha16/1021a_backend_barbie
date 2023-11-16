import express, {Request} from 'express';
import BancoMongoDB from './infra/banco/banco-mongodb';
import ListarFilme from './aplicacao/listar-filme.use-case'
import SalvarFilme from './aplicacao/salva-filme.use-case'

const bancoMongoDB = new BancoMongoDB();
const app = express();
app.use(express.json())

let filmes_repositorio:Filme[] = []



app.get('/filmes', async (req, res) => {
   const listarFilme = new ListarFilme(bancoMongoDB)
   const filmes = await listarFilme.execute()
   res.send(filmes).status(200)
})

app.post('/filmes', async (req:Request, res) => {
    const {id, titulo, descricao, foto} = req.body
    const filme:Filme = {
        id,
        titulo,
        descricao,
        foto,
    }
    const salvarFilme = new SalvarFilme(bancoMongoDB)
    const filmes = await salvarFilme.execute(filme)
    filmes_repositorio.push(filme)
    res.status(201).send(filmes)
});

app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const filme = filmes_repositorio.find(filme => filme.id === id)
    if (!filme) return res.status(404).send(filme)
    const filterFilme = filmes_repositorio.filter(filme => filme.id !== id)
    filmes_repositorio = filterFilme
    res.status(200).send(filme)
});


app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});

type Filme = {
    id: number,
    titulo: string,
    descricao: string,
    foto: string,
}