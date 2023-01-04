import userModel from "../../models/users/user.model.js";
import addressModel from "../../models/users/address.model.js";
import response from "../../helpers/response.module.js";

const userController = {
  signup: async function (req, res) {
    try {
      const { name, username, email, password } = req.body;
      const isExists = Boolean(name && username && email && password);
      if (!isExists) {
        return res.status(400).json(response.error("Required all fields"));
      } else {
        return await userModel
          .create({
            name,
            username,
            email,
            password,
            createdAt: new Date().toISOString(),
          })
          .then((result) => {
            if (!result) {
              return res.status(200).json(response.error("Failed to signup"));
            } else {
              return res
                .status(201)
                .json(response.success("User signup successfully", result));
            }
          })
          .catch((error) => res.status(500).json(response.error(error)));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },

  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      const isExists = Boolean(email && password);
      if (!isExists) {
        return res
          .status(400)
          .json(response.error("email and password are required"));
      } else {
        return await userModel
          .findOne({ email, password })
          .then((result) => {
            if (!result) {
              return res
                .status(400)
                .json(response.error("No user found with this email"));
            } else {
              return res
                .status(200)
                .json(response.success("Login successfully", result));
            }
          })
          .catch((error) => res.status(500).json(response.error(error)));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },

  addressAdd: async function (req, res) {
    try {
      const { id, country, state, city, pincode } = req.body;
      const isExists = Boolean(id && country && state && city && pincode);
      if (!isExists) {
        return res.status(400).json(response.error("Required all fields"));
      } else {
        return await addressModel
          .create({
            user_id: id,
            country,
            state,
            city,
            pincode,
            createdAt: new Date().toISOString(),
          })
          .then((result) => {
            if (!result) {
              return res
                .status(200)
                .json(response.error("Failed to store address"));
            } else {
              return res
                .status(201)
                .json(response.success("address stored successfully", result));
            }
          })
          .catch((error) => res.status(500).json(response.error(error)));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },

  getAllUsers: async function (req, res) {
    try {
      const { size, page } = req.body;
      const isExists = Boolean(size && page);
      if (!isExists) {
        return res.status(400).json(response.error("Required all fields"));
      } else {
        let skip = size * (page - 1);
        let limit = size || 1;
        let total = await userModel.find().select({ _id: 1 }).count();
        let pages = Math.ceil(total / size);
        return await userModel
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .then((result) => {
            if (result) {
              return res
                .status(200)
                .json(
                  response.success(
                    "Data fetch successfully",
                    result,
                    pages,
                    total
                  )
                );
            } else {
              return res.status(200).json(response.error("Records not found"));
            }
          })
          .catch((error) => res.status(500).json(response.error(error)));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },

  getSigleUser: async function (req, res) {
    try {
      const { id } = req.body;
      const isExists = Boolean(id);
      if (!isExists) {
        return res.status(400).json(response.error("Required all fields"));
      } else {
        return await userModel
          .findById(id)
          .then((result) => {
            if (result) {
              return res
                .status(200)
                .json(response.success("Data fetch successfully", result));
            } else {
              return res.status(200).json(response.error("Records not found"));
            }
          })
          .catch((error) => res.status(500).json(response.error(error)));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },

  removeSingleUser: async function (req, res) {
    try {
      const { id } = req.body;
      const isExists = Boolean(id);
      if (!isExists) {
        return res.status(400).json(response.error("Required all fields"));
      } else {
        return await userModel
          .findByIdAndRemove(id)
          .then((result) => {
            if (result) {
              return res
                .status(200)
                .json(response.success("User removed successfully"));
            } else {
              return res.status(200).json(response.error("Records not found"));
            }
          })
          .catch((error) => res.status(500).json(response.error(error)));
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },
  getUserDetails: async function (req, res) {
    try {
      const { id } = req.body;
      const isExists = Boolean(id);
      if (!isExists) {
        return res.status(400).json(response.error("Required all fields"));
      } else {
        return userModel
          .aggregate([
            { $match: { $expr: { $eq: ["$_id", { $toObjectId: id }] } } },
            {
              $lookup: {
                from: "addresses",
                localField: "_id",
                foreignField: "user_id",
                pipeline: [
                  { $project: { country: 1, state: 1, city: 1, pincode: 1 } },
                ],
                as: "address",
              },
            },
            {
              $unwind: "$address",
            },
            {
              $project: {
                _id: 1,
                name: 1,
                username: 1,
                email: 1,
                role: 1,
                address: 1,
              },
            },
          ])
          .exec((err, result) => {
            if (result) {
              if (result instanceof Array && result.length < 2) {
                let obj = Object(result[0]);
                return res
                  .status(200)
                  .json(response.success("User fetch successfully", obj));
              } else {
                return res
                  .status(200)
                  .json(response.success("User fetch successfully", result));
              }
            } else {
              return res.status(200).json(response.error(err.message));
            }
          });
      }
    } catch (error) {
      const { message } = error;
      return res.status(500).json(response.error(message));
    }
  },
};

export default userController;
