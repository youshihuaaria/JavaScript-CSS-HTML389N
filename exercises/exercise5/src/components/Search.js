import React, { Component } from "react";
import List from "./List";


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      list: [],
      keyword: ""
    }
    this.handler = this.handler.bind(this);
  }

  handler(event) {
    this.setState({
      keyword: event.target.value
    }, () => {
      let regex = RegExp(this.state.keyword, 'ig');
      let rl = this.state.places.filter(element => {
        if (element.city.match(regex) || element.state.match(regex)) {
          return true;
        }
        return false;
      });
      this.setState({ list: rl });
    }
    )
  }


  render() {
    return (
      <div>
        <form style={{textAlign: "center"}}>
          Enter City or State:
        <input  onChange={this.handler} value={this.state.keyword} />
          <List returnList={this.state.list}></List>
        </form>
      </div>
    )
  }

  /* DO NOT MODIFY */
  componentDidMount() {
    const allPlaces = [];
    const endpoint =
      "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
    fetch(endpoint)
      .then(data => data.json())
      .then(results => {
        allPlaces.push(...results)
        this.setState({ places: allPlaces })
      })
      .catch(error => console.log(error));
  }

}

export default Search