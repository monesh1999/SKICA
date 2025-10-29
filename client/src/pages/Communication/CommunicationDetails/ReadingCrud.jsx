import React, { useState, useEffect } from "react";
import readingService from "../../../services/ReadingService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button, Form } from "react-bootstrap";

const ReadingCrud = () => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editFile, setEditFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    readingService.getAll().then((res) => setFiles(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (file) formData.append("file", file);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      if (editFile) {
        await readingService.update(editFile.id, formData);
        toast.success("Updated successfully!");
      } else {
        await readingService.create(formData);
        toast.success("Uploaded successfully!");
      }
      fetchFiles();
      handleCloseModal();
    } catch (err) {
      toast.error("Error uploading file");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await readingService.delete(id);
      toast.success("Deleted successfully!");
      fetchFiles();
    }
  };

  const handleEdit = (file) => {
    setEditFile(file);
    setTitle(file.title);
    setCategory(file.category);
    setDescription(file.description || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditFile(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setFile(null);
    setThumbnail(null);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2>Reading Files CRUD</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Upload New File
      </Button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Thumbnail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f.id}>
              <td>{f.title}</td>
              <td>{f.category}</td>
              <td>
                {f.thumbnailUrl && (
                  <img
                    src={f.thumbnailUrl}
                    alt="thumb"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(f)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(f.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editFile ? "Edit File" : "Upload File"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>PDF File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="application/pdf"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                accept="image/*"
              />
            </Form.Group>
            <Button variant="success" type="submit">
              {editFile ? "Update" : "Upload"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReadingCrud;
