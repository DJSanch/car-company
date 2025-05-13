import React, { useEffect, useState } from "react";
import { getDrivers, addDriver, deleteDriver, updateDriver } from "../services/Api";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "", status: "active" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", contact: "", status: "active" });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await getDrivers();
      setDrivers(res.data);
    } catch (err) {
      console.error("Failed to load drivers:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDriver(form);
      setForm({ name: "", contact: "", status: "active" });
      fetchDrivers();
    } catch (err) {
      alert("Error adding driver");
    }
  };

  const handleEditClick = (driver) => {
    setEditingId(driver.id);
    setEditForm({ name: driver.name, contact: driver.contact, status: driver.status });
  };

  const handleUpdate = async (id) => {
    try {
      await updateDriver(id, editForm);
      setEditingId(null);
      fetchDrivers();
    } catch (err) {
      alert("Error updating driver");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id);
      fetchDrivers();
    } catch (err) {
      alert("Error deleting driver");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Grab Drivers</h2>

      <table border="1" cellPadding="10" style={{ marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>
                {editingId === driver.id ? (
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  driver.name
                )}
              </td>
              <td>
                {editingId === driver.id ? (
                  <input
                    name="contact"
                    value={editForm.contact}
                    onChange={handleEditChange}
                  />
                ) : (
                  driver.contact
                )}
              </td>
              <td>
                {editingId === driver.id ? (
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                ) : (
                  driver.status
                )}
              </td>
              <td>
                {editingId === driver.id ? (
                  <button onClick={() => handleUpdate(driver.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(driver)}>Edit</button>
                )}
                <button onClick={() => handleDelete(driver.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Driver</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Add Driver
        </button>
      </form>
    </div>
  );
};

export default Drivers;
