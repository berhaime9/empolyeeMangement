// npm modules components
import React, { Component } from "react";
import { FormGroup, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

export default class FormEmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  async handleValidSubmit(event, values) {
    // console.log(this.props);
    event.persist();
    await this.props
      .method(this.props.url, values)
      .then(async (res) => {
        this.props.onSubmit();
        // console.log("added successfully")
        this.form && this.form.reset();
        await this.props.getData();
        await this.props.Data();
        this.props.message(res.data.message, "green");
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          return this.props.message(err.response.data.message, "red");
        }
        this.props.message("please connect to database", "red");
      });
  }
  render() {
    return (
      <div>
        {/* {console.log(this.props)} */}
        <FormGroup className="mb-0">
          <AvForm
            onValidSubmit={this.handleValidSubmit}
            ref={(c) => (this.form = c)}
          >
            <label>{this.props.title}</label>
            {this.props.empData && (
              <AvField
                name="emp_id"
                type="text"
                value={this.props.empData && this.props.empData.id}
                disabled
              />
            )}
            <AvField
              name="emp_name"
              type="text"
              placeholder="employee name"
              errorMessage="Enter employee name"
              value={this.props.empData && this.props.empData.name}
              validate={{ required: { value: true } }}
            />
            <AvField
              name="emp_email"
              type="email"
              placeholder=" empolyee Email"
              errorMessage="Enter email"
              value={this.props.empData && this.props.empData.email}
              validate={{
                required: { value: true },
              }}
            />

            <AvField
              name="emp_mobile"
              type="text"
              placeholder="employee mobile "
              errorMessage="Enter employee mobile number"
              value={this.props.empData && this.props.empData.mobile}
              validate={{ required: { value: true } }}
            />
            <AvField
              name="emp_location"
              type="text"
              placeholder="employee location"
              errorMessage="Enter employee location"
              value={this.props.empData && this.props.empData.location}
              validate={{ required: { value: true } }}
            />
            <div>
              <Button type="submit" color="primary" className="mr-1">
                Submit
              </Button>
            </div>
          </AvForm>
        </FormGroup>
      </div>
    );
  }
}
