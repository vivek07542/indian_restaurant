import React, { Component } from "react";

export default class ReadMore extends Component {
  state = {
    toggleSwitch: this.props.readMore,
  };

  toggleHandler = () => {
    this.setState({ toggleSwitch: !this.state.toggleSwitch });
  };

  render() {
    let textRead = this.state.toggleSwitch ? (
      <p>{this.props.text.slice(0, 200)}</p>
    ) : (
      <p>{this.props.text}</p>
    );
    return (
      <div>
        {textRead}
        <div className="row justify-content-end mr-4 ">
          <p
            className="nav-link text-info small"
            onClick={this.toggleHandler}
          >
            {this.state.toggleSwitch ? "Read More" : "Read Less"}
          </p>
        </div>
      </div>
    );
  }
}
