// import { configDotenv } from "dotenv";
// configDotenv();

// import express, { json } from "express";
// import cors from "cors";

// import  connectDB  from "./config/connectdb.js";
// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import {
//   errorHandler,
//   notFoundHandler,
// } from "./middleware/notfounderrorhandler.js";

// const app = express();
// app.use(cors());
// app.use(json());

// await connectDB();


// // // Routes
// app.use("/auth", authRoutes);
// app.use("/user", userRoutes);
// // app.use("/restaurants", RestaurantsRoutes);
// // app.use("/admin", SettingsRoutes);
// // app.use("/favorites", favRestaurantsRoutes);
// // app.use("/reviews", ReviewsRoutes);
// // app.use("/restaurant-data", restaurantDataRoutes);

// app.use(notFoundHandler);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running locally on http://localhost:${PORT}`);
// });
// export default app;



import { configDotenv } from "dotenv";
configDotenv();

import express, { json } from "express";
import cors from "cors";

import connectDB from "./config/connectdb.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/notfounderrorhandler.js";

const app = express();
app.use(cors());
app.use(json());

connectDB(); 

app.get("/", (req, res) => {
  res.send("Server is running perfectly on Vercel!");
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// الـ listen دي بتنفعك بس وانتي شغالة Local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running locally on http://localhost:${PORT}`);
    });
}

export default app;