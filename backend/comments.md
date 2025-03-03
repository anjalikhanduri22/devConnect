// app.get("/user", async (req, res) => {
// const userEmail = req.body.emailId;
// try {
// const user = await User.find({ emailId: userEmail });
// if (user.length === 0) {
// res.status(401).send("user not found");
// } else {
// res.send(user);
// }
// } catch (err) {
// res.status(400).send("something went wrong");
// }
// });

//findone
// app.get("/user", async (req, res) => {
// const userEmail = req.body.emailId;
// try {
// const user = await User.findOne({ emailId: userEmail });
// if (!user) {
// res.status(401).send("user not found");
// } else {
// res.send(user);
// }
// } catch (err) {
// res.status(400).send("something went wrong");
// }
// });

//get all the users or feed api
