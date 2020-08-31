import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import axios from "axios";
import { CSVLink } from "react-csv";
import { MDBDataTableV5 } from "mdbreact";
import Modals from "./Modal";
import FormEmp from "./FormEmp";
import xlsx from "xlsx";
import Message from "./Message";

export default class Employess extends Component {
  constructor(props) {
    super(props);
    // stat emanagement
    this.state = {
      modals: {
        editModal: false,
        modal_center: false,
      },
      message: {
        visible: false,
        setMessage: "",
        color: "",
      },
      loading: true,
      empData: {},
      emps: [],
      editEmpData: {},
      deleteEmp: [],
    };

    // binding the class functions
    this.Data = this.Data.bind(this);
    this.getData = this.getData.bind(this);
    this.deleteEmpolyee = this.deleteEmpolyee.bind(this);
    this.deleteAllEmpolyee = this.deleteAllEmpolyee.bind(this);
    this.deleteEmpolyeeSever = this.deleteEmpolyeeSever.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
    this.message = this.message.bind(this);
  }

  //lifecyle component
  async componentWillMount() {
    await this.getData();
    await this.Data();
  }

  // message alert method
  async message(msg, clr) {
    await this.setState({
      message: { setMessage: msg, color: clr, visible: true },
    });
    setTimeout(() => {
      this.setState({ message: { setMessage: "", color: "", visible: false } });
    }, 5000);
  }

  // xlsx file exoprt method
  async exportExcel() {
    const ws = xlsx.utils.json_to_sheet(this.state.emps);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "SheetJS");
    xlsx.writeFile(wb, "empolyee.xlsx");
  }

  // delete empolyees form database
  async deleteEmpolyeeSever() {
    const emp = {
      emp: this.state.deleteEmp,
    };
    await axios
      .post("http://localhost:4001/api/emp/delete", emp)
      .then(async (res) => {
        await this.setState({ deleteEmp: [], loading: true });
        await this.getData();
        await this.Data();
        // console.log(res.data, "deleted");
        this.message(res.data.message, "green");
      })
      .catch((err) => {
        this.message(err.reponse.data.message, "green");
      });
  }

  //selete employee one by one  to delete
  async deleteEmpolyee(data) {
    // console.log(await this.state.deleteEmp.some((e) => e.id === data.id));
    const checkData = await this.state.deleteEmp.some((e) => e.id === data.id);
    // console.log(checkData);
    if (!checkData) {
      await this.setState({
        deleteEmp: [...this.state.deleteEmp, data],
      });
    } else {
      const updatedData = this.state.deleteEmp.filter((e) => e.id !== data.id);
      await this.setState({ deleteEmp: updatedData });
    }

    // console.log(this.state.deleteEmp);
  }

  // selecting all empolyee to delete
  async deleteAllEmpolyee(e) {
    if (this.state.emps.length === this.state.deleteEmp.length) {
      await this.setState({ deleteEmp: [] });
    } else {
      await this.setState({ deleteEmp: e });
    }
    // console.log(this.state.deleteEmp);
  }

  //fecting data from data base
  async getData() {
    await axios
      .get("http://localhost:4001/api/emp/")
      .then(async (res) => {
        await this.setState({ emps: res.data });
        this.message("Empolyee Data  Recevied successfully", "green");
        // console.log(res.data, this.state.emps);
      })
      .catch((err) =>
        this.message(
          " cant recevie Empolyee Data please connect to the database",
          "red"
        )
      );
  }

  async Data() {
    // empolyee data for datatable
    let data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 150,
        },
        {
          label: "Mobile",
          field: "mobile",
          sort: "asc",
          width: 150,
        },
        {
          label: "Location",
          field: "location",
          sort: "asc",
          width: 150,
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
          width: 150,
        },
      ],
      rows: [],
    };
    // console.log(data, this.state.loading);

    //including  actions functionality
    await this.state.emps.map(async (user, index) => {
      await data.rows.push({
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        location: user.location,
        actions: (
          <React.Fragment key={index}>
            <Row>
              <button
                className="btn btn-primary waves-effect waves-light"
                onClick={() =>
                  this.setState({
                    modals: {
                      modal_center: true,
                      editModal: true,
                      title: "Modify Table",
                    },
                    editEmpData: user,
                  })
                }
              >
                <i className="fas fa-edit"></i> edit
              </button>
            </Row>
          </React.Fragment>
        ),
      });
    });

    await this.setState({ loading: false, empData: data });
    // console.log(data, this.state.loading);
  }
  render() {
    // editing emp component
    const EditEmp = () => {
      return (
        <FormEmp
          /* empolyee  form  to modify */
          url={`http://localhost:4001/api/emp/${this.state.editEmpData.id}`}
          onSubmit={() =>
            this.setState({
              loading: true,
              modals: { ...this.state.modals, modal_center: false },
            })
          }
          getData={() => this.getData()}
          Data={() => this.Data()}
          title=" Modify Empolyee"
          empData={this.state.editEmpData}
          method={axios.put}
          message={this.message}
        />
      );
    };

    return (
      <React.Fragment>
        {
          // modals for modifying emp data
          <Modals
            modal_center={this.state.modals.modal_center}
            isClose={() =>
              this.setState({
                modals: { ...this.state.modals, modal_center: false },
              })
            }
            title={this.state.modals.title}
          >
            <EditEmp />
          </Modals>
        }
        {/* alert message */}
        {this.state.message.visible && (
          <Message
            message={this.state.message.setMessage}
            color={this.state.message.color}
          />
        )}
        {/* main divs */}
        <div className="container-fuild">
          <Row className="justify-content-center align-items-center p-5">
            <Col md={4}>
              {/* empolyee  form  to add */}
              <FormEmp
                url={"http://localhost:4001/api/emp/"}
                onSubmit={() => this.setState({ loading: true })}
                getData={() => this.getData()}
                Data={() => this.Data()}
                title="ADD EMPLOYEE"
                method={axios.post}
                message={this.message}
              />
              {this.state.emps.length > 0 && (
                <Row className="m-5">
                  <p className="text-primary text-uppercase">
                    Download Employee Data option
                  </p>
                  <div>
                    {/* expoting csv file */}
                    <CSVLink
                      data={this.state.emps}
                      filename={"employee.csv"}
                      className=" btn btn-success mr-1"
                    >
                      Download as csv
                    </CSVLink>
                    {/* expoting xlsx file */}
                    <Button
                      type="button"
                      color="success"
                      onClick={() => this.exportExcel()}
                    >
                      Download as xlsx
                    </Button>
                  </div>
                </Row>
              )}
            </Col>
            <Col md={8}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        {this.state.deleteEmp.length !== 0 && (
                          <div className="ml-3 mb-3">
                            <Row>
                              <p className="text-primary text-uppercase">
                                Are you sure you want to Delete?
                              </p>
                            </Row>
                            <Row>
                              <div>
                                <Button
                                  type="button"
                                  color="danger"
                                  className="mr-1"
                                  onClick={() => this.deleteEmpolyeeSever()}
                                >
                                  Yes
                                </Button>
                                <Button
                                  type="button"
                                  color="success"
                                  onClick={() => {
                                    this.setState({
                                      loading: true,
                                      deleteEmp: [],
                                    });
                                    this.getData();
                                    this.Data();
                                  }}
                                >
                                  NO
                                </Button>
                              </div>
                            </Row>
                          </div>
                        )}
                        <h4 className="card-title">Employee Table</h4>

                        {this.state.loading ? (
                          "loading.... please wait"
                        ) : (
                          // data table for empolyee
                          <MDBDataTableV5
                            responsive
                            bordered
                            data={this.state.empData}
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            checkbox
                            headCheckboxID="id6"
                            bodyCheckboxID="checkboxes6"
                            getValueCheckBox={(e) => this.deleteEmpolyee(e)}
                            getValueAllCheckBoxes={(e) =>
                              this.deleteAllEmpolyee(e)
                            }
                            multipleCheckboxes
                            searchTop
                            pagingTop
                            searchBottom={false}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
