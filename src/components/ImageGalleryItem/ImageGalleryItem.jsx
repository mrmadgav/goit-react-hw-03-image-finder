import React, { Component } from "react";
import styles from "./ImageGalleryItem.module.css";

export default class ImageGalleryItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li id={item.id} className={styles.ImageGalleryItem}>
        <img
          src={item.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          onClick={this.props.getImg}
        />
      </li>
    );
  }
}
