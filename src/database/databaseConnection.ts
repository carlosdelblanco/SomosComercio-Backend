import debug from "debug";
import mongoose from "mongoose";
import "../loadEnvironment.js";

const debugInfo = debug("somoscomercio:database");

const databaseConnection = async (mongoUrl: string) => {
  await mongoose.connect(mongoUrl);

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret._v;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ret;
    },
  });
  debugInfo("Connected to database");
};

export default databaseConnection;
