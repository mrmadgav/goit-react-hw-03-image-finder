import React, { Component } from "react";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";
import { v4 as uuidv4 } from "uuid";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default class ImageGallery extends Component {
  state = {
    loader: false,
  };
  componentDidMount() {
    this.setState({ loader: true });
  }
  render() {
    return (
      <>
        {this.state.loader && (
          <div className={styles.loaderDiv}>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={200}
              width={200}
              timeout={1000}
            />
          </div>
        )}
        <ul className={styles.ImageGallery}>
          {this.props.search.map((item) => (
            <ImageGalleryItem
              item={item}
              key={uuidv4()}
              getImg={this.props.getImg}
            />
          ))}
        </ul>
      </>
    );
  }
}


