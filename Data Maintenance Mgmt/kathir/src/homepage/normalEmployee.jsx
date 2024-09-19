import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../APIURL/apiUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faDownload,
} from "@fortawesome/free-solid-svg-icons"; 
import ConfirmationModal from "./ConfirmationModal";
import "./ConfirmationModal.css";
import jsPDF from "jspdf";

const NormalEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
    address: "",
    contact: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "/getNormalEmpData");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);



  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required!";
    } else if (!/^[A-Z][a-z]*\s[A-Z][a-z]*$/.test(name)) {
      newErrors.name =
        "Name should start with a capital letter and include an initial!";
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required!";
    }
    if (!position) {
      newErrors.position = "Position is required!";
    }
    if (!salary || isNaN(salary) || salary <= 0) {
      newErrors.salary = "Valid salary is required!";
    }
    if (!address) {
      newErrors.address = "Address is required!";
    }
    if (!contact || !/^\d{10}$/.test(contact)) {
      newErrors.contact = "Valid contact number (10 digits) is required!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitNormalEmpData = async () => {
    if (!validateForm()) return;

    const obj = {
      userName: name,
      userEmail: email,
      userAddress: address,
      userPosition: position,
      userSalary: salary,
      userContact: contact,
    };

    try {
      if (editingId) {
        await axios.put(API_URL + `/updateNormalEmpData/${editingId}`, obj);
      } else {
        await axios.post(API_URL + "/submitNormalEmpData", obj);
      }

      setName("");
      setEmail("");
      setPosition("");
      setSalary("");
      setAddress("");
      setContact("");
      setEditingId(null);

      const fetchData = async () => {
        try {
          const response = await axios.get(API_URL + "/getNormalEmpData");
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchData();
      document.getElementById("closeModalBtn").click();
      // const modal = document.getElementById("exampleModal");
      // const modalInstance = bootstrap.Modal.getInstance(modal);
      // modalInstance.hide();
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(API_URL + `/deleteNormalEmpData/${itemToDelete}`);
      const response = await axios.get(API_URL + "/getNormalEmpData");
      setItems(response.data);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting data", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleDownload = (item) => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text(`Name: ${item.name}`, 10, 10);
    doc.text(`Email: ${item.email}`, 10, 20);
    doc.text(`Position: ${item.position}`, 10, 30);
    doc.text(`Salary: Rs.${item.salary}/-`, 10, 40);
    doc.text(`Address: ${item.address}`, 10, 50);
    doc.text(`Contact: ${item.contact}`, 10, 60);

    // Save the PDF
    doc.save(`${item.name}_details.pdf`);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (itemId) => {
    const editdata = items.find((item) => item._id === itemId);
    console.log(editdata);
    setName(editdata.name);
    setEmail(editdata.email);
    setPosition(editdata.position);
    setSalary(editdata.salary);
    setAddress(editdata.address);
    setContact(editdata.contact);
    setEditingId(itemId);
  };

  return (
    <>
      <div id="content-normal" className="content">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {editingId ? "Edit Data" : "Add Data"}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeModalBtn"
                ></button>
              </div>
              <div className="modal-body">
                <form id="dataForm-normal" className="form-container">
                  <label>
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    id="name-normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {errors.name && <div className="error">{errors.name}</div>}

                  <label>
                    <b>Email</b>
                  </label>
                  <input
                    type="email"
                    id="email-normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && <div className="error">{errors.email}</div>}

                  <label>
                    <b>Position</b>
                  </label>
                  <input
                    type="text"
                    id="position-normal"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  />
                  {errors.position && (
                    <div className="error">{errors.position}</div>
                  )}

                  <label>
                    <b>Salary</b>
                  </label>
                  <input
                    type="number"
                    id="salary-normal"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                  {errors.salary && (
                    <div className="error">{errors.salary}</div>
                  )}

                  <label>
                    <b>Address</b>
                  </label>
                  <input
                    type="text"
                    id="address-normal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  {errors.address && (
                    <div className="error">{errors.address}</div>
                  )}

                  <label>
                    <b>Contact</b>
                  </label>
                  <input
                    type="text"
                    id="contact-normal"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                  {errors.contact && (
                    <div className="error">{errors.contact}</div>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitNormalEmpData}
                >
                  {editingId ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2>Employees</h2>

        <button
          type="button"
          className="openFormBtn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Data
        </button>

        <div className="mb-3">
          <label>
            <b>Search:</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="data-count">
            <p>Total Employees: {filteredItems.length}</p>
          </div>
        <div>
          <h1 className="tableTopic">Employee's Data</h1>
          <table className="table">
            <thead>
              <tr className="TableRow">
                <th className="TableColumn">Name</th>
                <th className="TableColumn">Email</th>
                <th className="TableColumn">Position</th>
                <th className="TableColumn">Salary</th>
                <th className="TableColumn">Address</th>
                <th className="TableColumn">Contact</th>
                <th className="TableColumn">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td className="TableColumn">{item.name}</td>
                  <td className="TableColumn">{item.email}</td>
                  <td className="TableColumn">{item.position}</td>
                  <td className="TableColumn">Rs.{item.salary}/-</td>
                  <td className="TableColumn">{item.address}</td>
                  <td className="TableColumn">{item.contact}</td>
                  <td className="TableColumn">
                    <button
                      className="btn btn-warning btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleEdit(item._id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleDownload(item)}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default NormalEmployee;


