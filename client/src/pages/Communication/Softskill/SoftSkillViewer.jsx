import React, { useEffect, useState } from "react";
import softSkillService from "../../../services/softSkillService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SoftSkillPage.css";

const SoftSkillPage = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    usedIt: "",
    example: "",
    idioms: "",
    exampleUsage: "",
    video: null,
  });
  const [videoUrl, setVideoUrl] = useState(null);

  const token = localStorage.getItem("token")?.trim();

  // Fetch all skills
  const fetchSkills = () => {
    softSkillService.getAll(token)
      .then((res) => setSkills(res.data))
      .catch((err) => toast.error("Error fetching skills"));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    if (e.target.name === "video") {
      setFormData({ ...formData, video: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit form (create or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("usedIt", formData.usedIt);
    data.append("example", formData.example);
    data.append("idioms", formData.idioms);
    data.append("exampleUsage", formData.exampleUsage);
    if (formData.video) data.append("video", formData.video);

    if (formData.id) {
      softSkillService.update(formData.id, data, token)
        .then(() => {
          toast.success("Skill updated successfully");
          setFormData({ id: null, name: "", description: "", usedIt: "", example: "", idioms: "", exampleUsage: "", video: null });
          fetchSkills();
        })
        .catch(() => toast.error("Update failed"));
    } else {
      softSkillService.create(data, token)
        .then(() => {
          toast.success("Skill created successfully");
          setFormData({ id: null, name: "", description: "", usedIt: "", example: "", idioms: "", exampleUsage: "", video: null });
          fetchSkills();
        })
        .catch(() => toast.error("Create failed"));
    }
  };

  // Edit skill
  const handleEdit = (skill) => {
    setFormData({ 
      id: skill.id,
      name: skill.name,
      description: skill.description,
      usedIt: skill.usedIt,
      example: skill.example,
      idioms: skill.idioms,
      exampleUsage: skill.exampleUsage,
      video: null
    });
    setVideoUrl(skill.videoUrl);
  };

  // Delete skill
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      softSkillService.remove(id, token)
        .then(() => {
          toast.success("Deleted successfully");
          fetchSkills();
        })
        .catch(() => toast.error("Delete failed"));
    }
  };

  // View video full screen
  const handleViewVideo = (url) => {
    setVideoUrl(url);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4">Soft Skills Management</h2>

      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded bg-light">
        <h5>{formData.id ? "Edit Skill" : "Add New Skill"}</h5>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-6 mb-2">
            <input type="text" name="usedIt" placeholder="Used It" value={formData.usedIt} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6 mb-2">
            <input type="text" name="example" placeholder="Example" value={formData.example} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6 mb-2">
            <input type="text" name="idioms" placeholder="Idioms" value={formData.idioms} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-12 mb-2">
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-12 mb-2">
            <textarea name="exampleUsage" placeholder="Example Usage" value={formData.exampleUsage} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-12 mb-2">
            <input type="file" name="video" onChange={handleChange} className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{formData.id ? "Update" : "Add"}</button>
      </form>

      <h4>All Skills</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Used It</th>
              <th>Example</th>
              <th>Idioms</th>
              <th>Video</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.usedIt}</td>
                <td>{skill.example}</td>
                <td>{skill.idioms}</td>
                <td>
                  {skill.videoUrl && 
                    <button className="btn btn-sm btn-info" onClick={() => handleViewVideo(skill.videoUrl)}>View</button>
                  }
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(skill)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(skill.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {videoUrl && (
        <div className="video-overlay" onClick={() => setVideoUrl(null)}>
          <video src={videoUrl} controls autoPlay className="video-fullscreen" />
        </div>
      )}
    </div>
  );
};

export default SoftSkillPage;
