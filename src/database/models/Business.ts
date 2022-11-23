import { model, Schema } from "mongoose";

const businessSchema = new Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  adhesionDate: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  businessImage: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Business = model("Business", businessSchema, "business");

export default Business;
