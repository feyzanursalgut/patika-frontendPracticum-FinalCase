import React, { Component } from "react";
import "../styles/StarShips.css";

class StarShips extends Component {
  state = {
    data: [],
    index: 0,
    page: 1,
  };

  shipImages = [
    "CR90-Corvette.png",
   "stardestroyer.png",
    "Sentinel-class-landing-craft.jpg",
    "Death-Star.png",
    "Millenium_Falcon.jpg",
    "Y-wing.png",
    "x-wing.png",
    "TIE-Advanced-x1.png",
    "executor.png",
    "rebel-transport.png",
    "Slave_1.png",
    "impreial-shuttle.png",
    "ef76-nebulon.png",
    "calamar.png",
    "a-qing.png",
    "b-wing.png",
    "republic-cruiser.png",
    "droid-control.png",
    "naboo.png",
    "royal-naboo.png",
    "Scimitar.png",
    "J-type-diplomatic-barge.png",
    "AA-9-Coruscant-freighter.png",
    "Jedi-starfighter.png",
    "H-type-Nubian-yacht.png",
    "assault.png",
    "Solar-Sailer.png",
    "Trade-Federation-cruiser.png",
    "Theta-class-T-2c-shuttle.png",
    "Republic-attack-cruise.png",
    "Naboo-star-skiff.png",
    "Jedi-Interceptor.png",
    "arc-170.png",
    "Banking-clan-frigte.png",
    "Belbullab-22-starfighter.png",
    "V-wing.png",

  ];

  async getStarships() {
    const { page } = this.state;

    await fetch(`https://swapi.dev/api/starships/?page=${page}`)
      .then(async (res) => {
        let response = await res.json();
        const ship = response.results.map((result, index) => ({
          name: result.name,
          image: this.shipImages[index + 10 * (page - 1)],
          model: result.model,
          hyperdrive_rating: result.hyperdrive_rating,
          passengers: result.passengers,
          max_atmosphering_speed:result.max_atmosphering_speed,
          manufacturer:result.manufacturer,
          crew:result.crew,
          cargo_capacity:result.cargo_capacity

        }));
        this.setState((prevState) => ({
          ...prevState,
          data: [...prevState.data, ...ship]
        }));
        this.setState({});
      })
      .catch((err) => {
        console.log(err);
      });
  }

 

  componentDidMount() {
    this.getStarships();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getStarships();
    }
  }

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      index: prevState.index + 1
    }));
  };
  render() {
    const { isLoading } = this.state;

    return (
      <div className="starships-wrapper">
        <div className="top" id="top">
          <img src="./logo.png" alt="logo" />
        </div>
        <div className="bottom" id="bottom">
          <ul>
            {this.state.data.map((res, index) => {
              return (
                <li
                  key={index}
                  className="ship-list"
                  style={{
                    backgroundImage: `url(${res.image})`
                  }}
                >
                  <div className="container">
                    <div className="name">{res.name}</div>
                    <div className="overlay">
                      <p className="text"><strong className="white">Model:</strong> {res.model}</p>
                      <p className="text"><strong className="white">Passengers:</strong> {res.passengers}</p>
                      <p className="text"><strong className="white">Max Atmosphering Speed: </strong>{res.max_atmosphering_speed}</p>
                      <p className="text"><strong className="white">Manufacturer: </strong>{res.manufacturer}</p>
                      <p className="text"><strong className="white">Crew: </strong>{res.crew}</p>
                      <p className="text"><strong className="white">Cargo Capacity: </strong>{res.cargo_capacity}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="load-more">
          <button onClick={this.loadMore} className="btn-grad" variant="dark">
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    );
  }
}

export default StarShips;