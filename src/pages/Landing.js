import React, { useEffect, useState } from "react";
import "./landing.css";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Container, ModalFooter } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Add, Delete, Edit, EditNote } from "@mui/icons-material";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  deleteUser,
  employeeDetail,
} from "../redux/employeeSlice";
import { employee } from "../data/data";
import { Link } from "react-router-dom";
function Landing() {
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //onchange
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [department, setDept] = useState("");
  const [status, setStatus] = useState("");
  const [position, setPos] = useState("");

  const [filterValue, setFilterValue] = useState("All");

  const users = useSelector((state) => state.users);
  // console.log(users);
  let uniqid = require("uniqid");
  let id = uniqid();
  let dispatch = useDispatch();
  //add
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addEmployee({ id, name, gmail,photo, department, status, position }));
  };
  const handleDelete = (id) => {
    dispatch(deleteUser({ id: id }));
  };
  // New state for search input
  const [searchInput, setSearchInput] = useState("");

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <div className="landing">
      <Container style={{ height: "100vh" }}>
        <h1 style={{ textAlign: "center", marginTop: "25px" }}>
          Employee Data
        </h1>
        <div
          className="addSection"
          style={{ display: "flex", gap: "25px", alignItems: "center" }}
        >
          <div>
            <button onClick={handleShow}>
              <Add></Add>add
            </button>
          </div>

          <div>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Filter
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setFilterValue(e.target.value)}
                defaultValue="All"
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel
                  value="Active"
                  onChange={(e) => setFilterValue(e.target.value)}
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value="Onboarding"
                  onChange={(e) => setFilterValue(e.target.value)}
                  control={<Radio />}
                  label="OnBoarding"
                />
                <FormControlLabel
                  value="Departed"
                  onChange={(e) => setFilterValue(e.target.value)}
                  control={<Radio />}
                  label="Departed"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div class="container-input">
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              name="text"
              class="input"
            />
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div style={{ padding: "", marginTop: "" }} className="hero">
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Status</th>
                <th scope="col">Position</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {users.length > 0 ? (
                users
                  .filter((employee) =>
                    filterValue === "All"
                      ? true
                      : employee.status === filterValue
                  )
                  .filter((employee) =>
                    employee.name
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  )
                  .map((i) => (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={i.photo}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{i.name}</p>
                            <p className="text-muted mb-0">{i.gmail}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{i.department}</p>
                      </td>
                      <td>
                        <MDBBadge
                          color={
                            i.status == "Active"
                              ? "success"
                              : i.status == "Onboarding"
                              ? "warning"
                              : "danger"
                          }
                          pill
                        >
                          {i.status}
                        </MDBBadge>
                      </td>
                      <td>{i.position}</td>
                      <td>
                        <Link
                          to={`edit/${i.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="outlined">
                            <EditNote></EditNote>
                          </Button>{" "}
                        </Link>
                        <Button
                          onClick={() => handleDelete(i.id)}
                          variant="outlined"
                        >
                          <Delete></Delete>
                        </Button>{" "}
                      </td>
                    </tr>
                  ))
              ) : (
                <p>NO data found</p>
              )}{" "}
            </MDBTableBody>
          </MDBTable>
        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Gmail</Form.Label>
              <Form.Control
                name="gmail"
                type="email"
                onChange={(e) => setGmail(e.target.value)}
                placeholder=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>photo</Form.Label>
              <Form.Control
                name="photo"
                type="text"
                onChange={(e) => setPhoto(e.target.value)}
                placeholder=""
              />
            </Form.Group>

            <Box sx={{ minWidth: 120, marginBottom: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={department}
                  onChange={(e) => setDept(e.target.value)}
                  name="department"
                  label="department"
                >
                  <MenuItem value={"sales"}>Sales</MenuItem>
                  <MenuItem value={"IT"}>IT</MenuItem>
                  <MenuItem value={"Design"}>Design</MenuItem>
                  <MenuItem value={"Branding"}>Branding</MenuItem>
                  <MenuItem value={"Finance"}>Finance</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, marginBottom: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  label="Status"
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Onboarding"}>Onboarding</MenuItem>
                  <MenuItem value={"Departed"}>Departed</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Position
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Junior"
                  name="position"
                  onChange={(e) => setPos(e.target.value)}
                  control={<Radio />}
                  label="Junior"
                />
                <FormControlLabel
                  value="Senior"
                  name="position"
                  onChange={(e) => setPos(e.target.value)}
                  control={<Radio />}
                  label="Senior"
                />
              </RadioGroup>
            </FormControl>
            <ModalFooter>
              <Button
                sx={{ marginRight: "10px" }}
                variant="outlined"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button variant="contained" type="submit" onClick={handleClose}>
                Add
              </Button>
            </ModalFooter>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Landing;
