import React, { Component } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMore from "../LoadMore/LoadMore";
import Modal from "../Modal/Modal";
import axios from "axios";
import styles from "./SearchBar.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

export default class SearchBar extends Component {
  state = {
    search: [],
    currentSearch: "",
    flag: 0,
    page: 1,
    currentImg: {},
    showmodal: false,
    loader: false,
  };
  change = (e) => {
    this.setState({ currentSearch: e.target.value });
  };
  submit = (e) => {
    e.preventDefault();
    this.setState({ flag: 1 });
    setTimeout(() => {
      axios
        .get(
          `https://pixabay.com/api/?q=${this.state.currentSearch}&1=1&key=20202881-652c2a411aa551237b4134ad2&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then((response) =>
          this.setState({ search: response.data.hits, page: 2 })
        );
    }, 1400);
  };
  loadMore = () => {
    this.setState({ loader: true });
    setTimeout(() => {
      axios
        .get(
          `https://pixabay.com/api/?q=${this.state.currentSearch}&page=${this.state.page}&key=20202881-652c2a411aa551237b4134ad2&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then((response) =>
          this.setState((prevState) => ({
            search: [...prevState.search, ...response.data.hits],
            page: this.state.page + 1,
          }))
        );
    }, 1000);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      this.setState({ loader: false });
    }, 1200);
  };
  getcurrentImg = (e) => {
    const id = e.target.closest("[id]").id;
    this.setState({
      currentImg: this.state.search.find((i) => i.id === Number(id)),
    });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState(({ showmodal }) => ({ showmodal: !showmodal }));
  };
  render() {
    return (
      <>
        <header className={styles.Searchbar}>
          <form className={styles.SearchForm} onSubmit={this.submit}>
            <button type="submit" className={styles.SearchFormButton}>
              <span className={styles.SearchFormButtonLabel}></span>
            </button>
            <input
              className={styles.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.change}
              value={this.state.currentSearch}
            />
          </form>
        </header>
        {this.state.flag === 0 && (
          <div className={styles.emptySearch}>
            <span>Let`s start serfing...</span>
          </div>
        )}
        {this.state.flag === 1 && (
          <ImageGallery
            search={this.state.search}
            getImg={this.getcurrentImg}
          />
        )}
        {this.state.loader && (
          <div className={styles.moreLoader}>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={50}
              width={50}
              timeout={900}
            />
          </div>
        )}
        {this.state.search.some((i) => i !== null) && (
          <LoadMore loadMore={this.loadMore} page={this.state.page} />
        )}
        {this.state.showmodal && (
          <Modal
            currentImg={this.state.currentImg}
            toggleModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
SearchBar.propTypes = {
  page: PropTypes.number,
  search: PropTypes.array,
  currentSearch: PropTypes.string,
  currentImg: PropTypes.object,
  flag: PropTypes.number,
  showmodal: PropTypes.bool,
  loader: PropTypes.bool,
};
