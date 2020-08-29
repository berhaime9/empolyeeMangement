import React, { Component } from "react";
import { Modal } from "reactstrap";

export default class Modals extends Component {
  constructor(props) {
    super(props);
    this.tog_center = this.tog_center.bind(this);
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  tog_center() {
    this.props.isClose();
    this.removeBodyCss();
  }

  componentWillMount() {
    // console.log(this.props);
    this.setState({ modal_center: this.props.modal_center });
  }
  render() {
    // console.log(this.props);
    return (
      <Modal isOpen={this.props.modal_center} toggle={this.tog_center}>
        <div className="modal-header">
          <h5 className="modal-title mt-0">{this.props.title}</h5>
          <button
            type="button"
            onClick={this.props.isClose}
            className="close"
            // data-dismiss="modal"
            // aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{this.props.children}</div>
      </Modal>
    );
  }
}
