// src/pages/Communication/CommunicationDetails/ReadingForm.js
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import readingService from "../../../services/readingService";

const ReadingForm = ({ token, editingFile, onSuccess, clearEdit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("novel");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  useEffect(() => {
    if (editingFile) {
      setTitle(editingFile.title);
      setCategory(editingFile.category);
      setDescription(editingFile.description);
    }
  }, [editingFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !description) return alert("Fill all fields");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (pdfFile) formData.append("file", pdfFile);
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

    try {
      if (editingFile) {
        await readingService.update(editingFile.id, formData);
        clearEdit();
      } else {
        await readingService.create(formData);
      }
      setTitle("");
      setCategory("novel");
      setDescription("");
      setPdfFile(null);
      setThumbnailFile(null);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded shadow-sm">
      <h5>{editingFile ? "Edit Reading Content" : "Add New Reading Content"}</h5>
      <Form.Group className="mb-2">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Category</Form.Label>
        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="novel">Novel</option>
          <option value="newspaper">Newspaper</option>
          <option value="magazine">Magazine</option>
          <option value="book">Book</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>PDF File</Form.Label>
        <Form.Control type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Thumbnail Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files[0])} />
      </Form.Group>
      <Button type="submit" variant="primary">{editingFile ? "Update" : "Upload"}</Button>
      {editingFile && <Button variant="secondary" className="ms-2" onClick={clearEdit}>Cancel</Button>}
    </Form>
  );
};

export default ReadingForm;
