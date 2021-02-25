import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Contacts from "../Contacts/Contacts";
import Filter from "../Filter/Filter";
import ContactForm from "../../components/ContactForm/ContactForm";
import PropTypes from "prop-types";

export default class Phone extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    name: "",
    number: "",
  };

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleChangeNumber = (e) => {
    this.setState({ number: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.contacts.some((e) => e.name === this.state.name)) {
      this.setState((prevState) => ({
        contacts: [
          ...prevState.contacts,
          { name: this.state.name, number: this.state.number, id: uuidv4() },
        ],
      }));
    } else {
      if (this.state.name !== "") {
        alert(`${this.state.name} is already in contacts`);
      } else {
        alert("Type the name of the contact");
      }
    }
  };
  filterContacts = (e) => {
    e.preventDefault();
    this.setState({ filter: e.target.value });
  };
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((item) => item.id !== contactId),
    }));
  };
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  render() {
    return (
      <div>
        <h1>Phone Book</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          contacts={this.state.contacts}
          handleSubmit={this.handleSubmit}
          handleChangeName={this.handleChangeName}
          handleChangeNumber={this.handleChangeNumber}
        />
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          filterContacts={this.filterContacts}
        />
        <Contacts
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
Phone.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  contacts: PropTypes.array,
};
