const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI = "mongodb://127.0.0.1:27017/shop";

const app = express();
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: "sessions"
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const AuthRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret:
			"ASoasnS2@#$@#twdefDWqcQW65D1WQEDW54Ed4WEr5tY%%#$#@$R236R5325R42533",
		resave: false,
		saveUninitialized: false,
		store: store
	})
);

app.use((req, res, next) => {
	if(!req.session.user) return next();
	User.findById(req.session.user._id)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use(AuthRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(result => {
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					name: "Caio",
					email: "caio@gmail.com",
					password: "123",
					cart: {
						items: []
					}
				}).save();
			}
		});
		console.log("Connected to MongoDB Server!");
		app.listen(3000);
		console.log("Server running on port 3000!");
	})
	.catch(err => {
		console.log(err);
	});
