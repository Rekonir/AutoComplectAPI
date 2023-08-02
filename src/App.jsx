import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [login, setLogin] = useState("FBKOOO");
  const [password, setPassword] = useState("fbk12345fbk");
  const [number, setNumber] = useState("MB831042");
  const [articles, setArticles] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchData = () => {
    setArticles([]);
    const url = `https://www.japarts.ru/?id=ws;action=search3;login=${login};pass=${password};makename=mitsubishi;detailnum=${number};cross=1;crosslimit=10;rowlimit=5;`;
    axios({
      method: "get",
      url: url,
      responseType: "json",
    })
      .then((data) => data.data)
      .then((data) => {
        console.log(data), setArticles(data);
      })
      .catch((err) => console.log(err), setArticles([]));
  };
  const addToCart = (priceId) => {
    const id = priceId;
    const urlAdd = `https://www.japarts.ru/?id=ws;action=addtobasket2;login=${login};pass=${password};priceid=${id};quantity=10;clientprice=100;comment=test;`;
    axios({
      method: "get",
      url: urlAdd,
      responseType: "json",
    })
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    const urlVeiw = `https://www.japarts.ru/?id=ws;action=showbasket;login=${login};pass=${password}`;
    axios({
      method: "get",
      url: urlVeiw,
      responseType: "json",
    })
      .then((data) => data.data)
      .then((data) => {
        console.log(data), setCart(data);
      })
      .catch((err) => console.log(err), setCart([]));
  };
  // const veiwCart = () => {
  //   const url = `https://www.japarts.ru/?id=ws;action=showbasket;login=${login};pass=${password}`;
  //   axios({
  //     method: "get",
  //     url: url,
  //     responseType: "json",
  //   })
  //     .then((data) => data.data)
  //     .then((data) => {
  //       console.log(data), setCart(data);
  //     })
  //     .catch((err) => console.log(err), setCart([]));
  // };
  const delFromCart = (id) => {
    const url = `https://www.japarts.ru/?id=ws;action=delfrombasket;login=${login};pass=${password};basketidm=${id}`;
    axios({
      method: "get",
      url: url,
      responseType: "json",
    })
      .then((data) => data.data)
      .then((data) => {
        console.log(data),
          setCart(cart.filter((item) => item.basketid !== data[0].basketid));
      })
      .catch((err) => console.log(err));
  };

  // const unifyingCart = (cart) => {
  //   const uniqueCart = cart
  //   uniqueCart
  //     .forEach((position) => {
  //       position.quantity = Number(position.quantity);
  //     })

  //   // const uniqueCart = cart.filter((position, index, self) => {
  //   //   // Ищем первое вхождение позиции в массиве
  //   //   const firstIndex = self.findIndex(
  //   //     (item) => item.detailnum === position.detailnum
  //   //   );
  //   //   // Возвращаем только позиции, у которых индекс равен первому вхождению
  //   //   return index === firstIndex;
  //   // });
  //   for (let i = 0; i < uniqueCart.length; i++) {
  //     for (let j = i; j < uniqueCart.length; j++) {
  //       if (uniqueCart[i].detailnum === uniqueCart[j].detailnum) {
  //         uniqueCart[i].quantity += uniqueCart[j].quantity;
  //         uniqueCart.splice(j, 1);
  //       }
  //     }
  //   }
  //   setCart(uniqueCart);
  //   // console.log(cart);
  // };

  return (
    <>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={fetchData}>Поиск</button>
      {/* <button onClick={veiwCart}> Показать корзину</button> */}
      <div className="Catalog">
        <div className="cart">
          Корзина:
          {cart.length !== 0 ? (
            cart.map((position, index) => (
              <div className="positionBox" key={position.basketid}>
                <p>№ {index + 1}</p>
                <p className="makename">
                  Производитель:
                  {position.makename ? position.makename : "Нет информации"}
                </p>
                <p className="detailname">
                  Наименование:
                  {position.detailname ? position.detailname : "Нет информации"}
                </p>
                <p className="pricerur">
                  Стоимость за шт:{" "}
                  {position.pricerur ? position.pricerur : "Нет информации"} ₽
                </p>
                <p className="quantity">В корзине: {position.quantity} шт.</p>
                <p className="time">
                  Доставим за: {position.time} дней из {position.country}
                </p>
                <button onClick={() => delFromCart(position.basketid)}>
                  Удалить
                </button>
              </div>
            ))
          ) : (
            <p> Вы еще ничего не заказали </p>
          )}
        </div>

        <div className="search">
          Результаты поиска:
          {articles.length !== 0 &&
            articles.map((article) =>
              article.error === "NO RESULTS FOUND" ? (
                <p key={"err"}>Ничего не найдено </p>
              ) : (
                <div className="article" key={article.priceid}>
                  <div className="makename">
                    Производитель:
                    {article.makename ? article.makename : "Нет информации"}
                  </div>
                  <div className="detailname">
                    Наименование:
                    {article.detailname ? article.detailname : "Нет информации"}
                  </div>
                  <div className="pricerur">
                    Стоимость за шт:{" "}
                    {article.pricerur ? article.pricerur : "Нет информации"} ₽
                  </div>
                  <div className="quantity">
                    На складе: {article.quantity ? article.quantity : "0"} шт.
                  </div>
                  <button onClick={() => addToCart(article.priceid)}>
                    Заказать
                  </button>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
}

export default App;
