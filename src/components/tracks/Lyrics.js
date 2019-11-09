import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    books: []
  };

  componentDidMount() {
    axios.get("http://localhost:8000/article/api/").then(res => {
      this.setState({ books: res.data });
      console.log(res.data);
    });

    axios

      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track });
        console.log(res.data.message.body.track);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics, books } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
           
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album Id : {track.album_id}</strong>
            </li>

            <li className="list-group-item">
              <strong>Explicit Words</strong> :{" "}
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Rating : </strong>
              {track.track_rating}
            </li>
          </ul>
        </>
      );
    }
  }
}
export default Lyrics;
