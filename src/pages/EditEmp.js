import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/employeeSlice';
function EditEmp() {
    let dispatch=useDispatch()
const { id } = useParams();
const users = useSelector((state) => state.users);
const existingUser = users.filter((f) => f.id == id);
const { name, gmail,photo,department,status,position } = existingUser[0];
const [uname, setName] = useState(name);
const [ugmail, setGmail] = useState(gmail);
const [uphoto, setPhoto] = useState(photo);
const [uDept, setDept] = useState(department);
const [uStatus, setStatus] = useState(status);
const [uPos, setPos] = useState(position);

const navigate=useNavigate()


const handleUpdate=(event)=>{
event.preventDefault()
dispatch(
  updateUser({
    id: id,
    name: uname,
    gmail: ugmail,
    photo:uphoto,
    department: uDept,
    status: uStatus,
    position: uPos,
  })
 
);
 navigate("/");
}
  return (
    <div>
      {" "}
      <div style={{ display: "grid", placeItems: "center", width: "100vw" }}>
        <div
          className="modal show"
          style={{ display: "block", width: "30%", position: "initial" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={uname}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Gmail</Form.Label>
                <Form.Control
                  name="gmail"
                  onChange={(e) => setGmail(e.target.value)}
                  value={ugmail}
                  type="email"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>photo</Form.Label>
                <Form.Control
                  name="photo"
                  type="text"
                  value={uphoto}
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
                    value={uDept}
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
                    value={uStatus}
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
                    name="position"
                    onChange={(e) => setPos(e.target.value)}
                    control={<Radio />}
                    label="Senior"
                  />
                </RadioGroup>
              </FormControl>
              <Modal.Footer>
                <Link to={"/"}>
                  <Button sx={{ marginRight: "10px" }} variant="outlined">
                    Back
                  </Button>
                </Link>

                <Button variant="contained" type="submit">
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </div>
      </div>
    </div>
  );
}

export default EditEmp