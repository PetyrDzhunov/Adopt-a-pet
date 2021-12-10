module.exports = {
	PORT: process.env.PORT || 3030,
	DB_CONNECTION_STRING: "mongodb+srv://PetyrDjunov:secretPassword@cubicles.hdzkr.mongodb.net/petAdoption?retryWrites=true&w=majority",
	JWT_KEY: "token",
	PASSWORD_HASH_SALT: 12
}