import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../APIURL/apiUrl";
// import { EventContext } from '../contexts/EventContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faDownload } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from "./ConfirmationModal";
import './ConfirmationModal.css';
import jsPDF from "jspdf"; 

const BankEvent = () => {
  const [eventname, setEventname] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  // const { setEventCount } = useContext(EventContext);

  const [editData , setEditData] = useState({
    eventname: "",
    description: "",
    date: "",
    place: "",
  });

  useEffect(() => {
    // Fetch event data on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "/getEventData");
        setItems(response.data);
        // setEventCount(response.data.length);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!eventname) {
      newErrors.eventname = "Event Name is required!";
    }
    if (!description) {
      newErrors.description = "Description is required!";
    }
    if (!date) {
      newErrors.date = "Date is required!";
    }
    if (!place) {
      newErrors.place = "Place is required!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitEventData = async () => {
    if (!validateForm()) return;

    const obj = {
      userEventname: eventname,
      userDescription : description,
      userDate: date,
      userPlace: place
    };

    try {
      if (editingId) {
        // Update existing record
        await axios.put(API_URL + `/updateEventData/${editingId}`, obj);
      } else {
        // Create new record
        await axios.post(API_URL + "/submitEventData", obj);
      }

      // // Clear form fields
      setEventname("");
      setDescription("");
      setDate("");
      setPlace("");
      setEditingId(null);

      // Refresh data
      const fetchData = async () => {
        try {
          const response = await axios.get(API_URL + "/getEventData");
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchData();

      // Close the modal
      document.getElementById('closeModalBtn').click();
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };
//delete data
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(API_URL + `/deleteEventData/${itemToDelete}`);
      const response = await axios.get(API_URL + "/getEventData");
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
    doc.text(`Name: ${item.eventname}`, 10, 10);
    doc.text(`Email: ${item.description}`, 10, 20);
    doc.text(`Position: ${item.date}`, 10, 30);
    doc.text(`Salary: Rs.${item.place}/-`, 10, 40);

    // Save the PDF
    doc.save(`${item.eventnamename}_details.pdf`);
  };

  const filteredItems = items.filter(
    (item) =>
      (item.eventname?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.date?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.place?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleEdit = (itemId)=>{

    const editdata = items.find((item) => item._id === itemId);
    console.log(editdata)
    setEventname(editdata.eventname);
    setDescription(editdata.description);
    setPlace(editdata.place);
    setEditingId(itemId);
    const formattedDate = new Date(editdata.date).toISOString().split('T')[0];
      setDate(formattedDate);
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <div id="content-event" className="content">
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
                    <b>Event Name</b>
                  </label>
                  <input
                    type="text"
                    id="name-event"
                    value={eventname}
                    onChange={(e) => setEventname(e.target.value)}
                    required
                  />
                  {errors.eventname && (
                    <div className="text-danger">{errors.eventname}</div>
                  )}

                  <label>
                    <b>Description</b>
                  </label>
                  <input
                    type="text"
                    id="description-event"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}

                  <label>
                    <b>Date</b>
                  </label>
                  <input
                    type="date"
                    id="date-event"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                  {errors.date && (
                    <div className="text-danger">{errors.date}</div>
                  )}

                  <label>
                    <b>Place</b>
                  </label>
                  <input
                    type="text"
                    id="place-event"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    required
                  />
                  {errors.place && (
                    <div className="text-danger">{errors.place}</div>
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
                  onClick={submitEventData}
                >
                  {editingId ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2>Events</h2>

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
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="data-count">
            <p>Total Events: {filteredItems.length}</p>
          </div>
        <div>
          <h1>Event's Data</h1>
          <table className="table">
            <thead>
              <tr>
                <th className="TableColumn">Event Name</th>
                <th className="TableColumn">Description</th>
                <th className="TableColumn">Date</th>
                <th className="TableColumn">Place</th>
                <th className="TableColumn">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td className="TableColumn">{item.eventname}</td>
                  <td className="TableColumn">{item.description}</td>
                  <td className="TableColumn">{formatDate(item.date)}</td>
                  <td className="TableColumn">{item.place}</td>
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

export default BankEvent;
