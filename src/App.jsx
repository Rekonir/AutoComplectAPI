import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [login, setLogin] = useState('FBKOOO')
  const [password, setPassword] = useState('fbk12345fbk')
  const [number, setNumber] = useState('MB831042')
  const [articles, setArticles] = useState([])

  const fetchData = () => {
    setArticles([])
    const url = `https://www.japarts.ru/?id=ws;action=search3;login=${login};pass=${password};makename=mitsubishi;detailnum=${number};cross=1;crosslimit=10;rowlimit=5;`;

    axios({
      method: 'get',
      url: url,
      responseType: 'json',

    })
      .then(data => data.data)
      .then(data => { console.log(data), setArticles(data) })
      .catch(err => setArticles([err]))
  }


  return (
    <>
      <input type='text' placeholder='Login' value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type='text' placeholder='Number' value={number} onChange={(e) => setNumber(e.target.value)} />
      <button onClick={fetchData}>Search</button>

      {articles.length !== 0 && articles.map(article => (
        article.error === "NO RESULTS FOUND" ?
          <p key={'err'}>Ничего не найдено </p>
          :
          <div className="article" key={article.priceid}>
            <div className="makename">
              Производитель: {article.makename ? article.makename : 'Undefined'}
            </div>
            <div className="detailname">
              Наименование: {article.detailname ? article.detailname : 'Undefined'}
            </div>
            <div className="pricerur">
              Стоимость: {article.pricerur ? article.pricerur : 'Undefined'} ₽
            </div>
            <div className="quantity">
              На складе осталось: {article.quantity ? article.quantity : '0'} шт.
            </div>
          </div>
      ))
      }
    </>
  )
}

export default App
