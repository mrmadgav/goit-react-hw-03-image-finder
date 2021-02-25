import React, { Component } from "react";
import styles from "./LoadMore.module.css";

export default class LoadMore extends Component {
  render() {
    return (
      <>
        <button
          type="button"
          onClick={this.props.loadMore}
          className={styles.loadBtn}
        >
          Load More
        </button>
      </>
    );
  }
}
