import "../styles/App.scss";
import { useState, useEffect } from "react";
//Router
import { Switch, Route } from "react-router-dom";

// Components
import Header from "./Header";
import Landing from "./Landing";
import Form from "./Form";
import Footer from "./Footer";
import ls from "../services/localStorage";
import callToApi from "../services/Api";

function App() {
  const [paletteClass, setPaletteClass] = useState(
    ls.get("class", "--palette1")
  );
  const [desingArrow, setDesingArrow] = useState(false);
  const [formArrow, setFormArrow] = useState(true);
  const [shareArrow, setShareArrow] = useState(true);
  const [formClass, setFormClass] = useState(true);
  const [shareClass, setShareClass] = useState(true);
  const [desingClass, setDesingClass] = useState(false);
  const [imgInfo, setImgInfo] = useState(ls.get("image", ""));

  //crea la link: back to front:
  const [card, setCard] = useState("");

  const [data, setData] = useState(
    ls.get("data", {
      name: "",
      job: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      photo: "",
      palette: "1",
    })
  );

  useEffect(() => {
    ls.set("data", data);
    ls.set("class", paletteClass);
    ls.set("image", imgInfo);
  }, [data, paletteClass]);

  const handleCollapsable = (ev) => {
    let selection = ev.currentTarget.id;
    if (selection === "desing") {
      setDesingArrow(!desingArrow);
      setDesingClass(!desingClass);
      setShareClass(true);
      setShareArrow(true);
      setFormClass(true);
      setFormArrow(true);
    } else if (selection === "form") {
      setFormClass(!formClass);
      setFormArrow(!formArrow);
      setDesingClass(true);
      setDesingArrow(true);
      setShareClass(true);
      setShareArrow(true);
    } else if (selection === "share") {
      setShareClass(!shareClass);
      setShareArrow(!shareArrow);
      setFormClass(true);
      setFormArrow(true);
      setDesingClass(true);
      setDesingArrow(true);
    }
  };

  const handleInput = (ev) => {
    const inputChange = ev.currentTarget.name;
    if (inputChange === "palette") {
      if (ev.currentTarget.value === "1") {
        setPaletteClass("--palette1");
      } else if (ev.currentTarget.value === "2") {
        setPaletteClass("--palette2");
      } else if (ev.currentTarget.value === "3") {
        setPaletteClass("--palette3");
      }
    }
    setData({
      ...data,
      [inputChange]: ev.currentTarget.value,
    });
  };

  const handlerSubmit = (ev) => {
    ev.preventDefault();
  };

  const handlerReset = () => {
    setData({
      name: "",
      job: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      photo: "",
      palette: "1",
    });
    setPaletteClass("--palette1");
    setImgInfo("");
  };

  const handleImage = (dataImg) => {
    setImgInfo(dataImg);
    setData({
      ...data,
      ["photo"]: dataImg,
    });
  };

  const handlerClickShare = (ev) => {
    ev.preventDefault();
    callToApi(data).then((dataApi) => {
      
      setCard(dataApi.cardURL);
      console.log(card);
    });
   

    // const dataFetch = Api.callToApi(data);
    // console.log(dataFetch);
    
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/create-preview-card">
          <Header />
          <Form
            handlerSubmit={handlerSubmit}
            handlerReset={handlerReset}
            paletteClass={paletteClass}
            name={data.name}
            job={data.job}
            phone={data.phone}
            email={data.email}
            linkedin={data.linkedin}
            github={data.github}
            handleCollapsable={handleCollapsable}
            desingArrow={desingArrow}
            desingClass={desingClass}
            handleInput={handleInput}
            palette={data.palette}
            formClass={formClass}
            formArrow={formArrow}
            shareArrow={shareArrow}
            shareClass={shareClass}
            imgInfo={imgInfo}
            handleImage={handleImage}
            handlerClickShare={handlerClickShare}
            data={data}
            card={card}
          />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
