import studentModel from "../../models/student.model.js";
import response from "../../helpers/response.module.js";

const studentController = {
  addStudent: async function (req, res) {
    try {
      const { name, username, email, mobile } = req.body;
      const isExists = Boolean(name && username && email && mobile);
      if (isExists) {
        const addStudent = await studentModel.create({
          name,
          username,
          email,
          mobile,
          createdAt: new Date().toISOString(),
        });
        if (addStudent) {
          return res
            .status(201)
            .json(response.success("Student created successfully", addStudent));
        } else {
          return res.status(200).json(response.error("Failed to create"));
        }
      } else {
        return res.status(400).json(response.error("Required all fields"));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },

  getStudents: async function (req, res) {
    try {
      return await studentModel
        .find()
        .sort({ createdAt: -1 })
        .then((result) => {
          if (result) {
            return res
              .status(200)
              .json(response.success("Data fetch successfully", result));
          } else {
            return res.status(200).json(response.error("Records not found"));
          }
        });
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },

  updateStudent: async function (req, res) {
    try {
      const { id, name } = req.body;
      const isExists = Boolean(id && name);
      if (isExists) {
        return await studentModel
          .findByIdAndUpdate(id, { name }, { new: true })
          .then((result) => {
            if (result) {
              return res
                .status(200)
                .json(response.success("Data updated successfully", result));
            } else {
              return res.status(200).json(response.error("failed to update"));
            }
          })
          .catch((error) => res.status(500).json(response.error(error)));
      } else {
        return res.status(400).json(response.error("Required all fields"));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },

  deleteStudent: async function (req, res) {
    try {
      const { id } = req.body;
      const isExists = Boolean(id);
      if (isExists) {
        return await studentModel
          .findByIdAndDelete(id)
          .then((result) => {
            if (result) {
              return res
                .status(200)
                .json(response.success("Record deleted successfully"));
            } else {
              return res.status(200).json(response.error("Record not exists"));
            }
          })
          .catch((error) => res.status(500).json(response.error(error)));
      } else {
        return res.status(400).json(response.error("Required id fields"));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },
};

export default studentController;
