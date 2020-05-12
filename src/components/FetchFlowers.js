import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import gradient from './images/gradient.png';
import Star from '@material-ui/icons/Star';

class FetchFlowers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      flowers: [],
    }
  }

  componentDidMount() {
    fetch("https://flowrspot-api.herokuapp.com/api/v1/flowers")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            flowers: result.flowers
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { flowers } = this.state;
    let isLoginSuccesful = this.props.loginState;
    return (
      <div id="card-container" className="container-fluid">
        <div className="row align-items-start">
          <div className="card-deck justify-content-center">
            {flowers.map(flower => (
              <div key={flower.id} className="Card-item col-lg-3 col-md-4">
                <Card style={{ width: '280px' }}>
                  <div className="Card-img-caption">
                    <div className="Card-text">
                      <h5 id="flower-name">{flower.name}</h5>
                      <p id="lating-name"><i>{flower.latin_name}</i></p>
                      <button id="sightings-button" className="button">{flower.sightings} sightings</button>
                    </div>
                    <Card.Img className="Card-img Card-img-flower" src={flower.profile_picture} />
                    <Card.Img className="Card-img Card-img-gradient" src={gradient} />
                    {isLoginSuccesful ? <button id="favorite-button" className="button" onClick={() => this.markFlowerFavorite(flower.id, this.props.authToken)}>
                      <Star id="star-icon" color="disabled" fontSize="small" />
                    </button> : null }
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  markFlowerFavorite(id, clientToken) {
    fetch("https://flowrspot-api.herokuapp.com/api/v1/flowers/" + id + "/favorites", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + clientToken,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }
}

export default FetchFlowers;