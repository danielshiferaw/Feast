/**
 * Maybe Fill with dummy entries to start. Follow format for addition. Learned how to initialize map and comment file (roughly).
 * current date format: month-date time e.g. 11-30 0:00 (no trailing zeros).
 * consider working with JSON later for facilities for working with data.
 * Look into advantages and disadvantages of this approach (seems incredibly insecure haha)
 * Elements of Applications To Consider Noting: Accounts, Authentication/Security, Data, UI, Loading Screen, Home Screen,
 * High-Fi Prototype: Focus more on core user experience, not on fully implemented back-end, security/authentication, or
 * other elements that most users do not die for. TRY TO AVOID DECLARING DYNAMIC IMAGES
 */
export default {
	/* example: {date: "12-01 12:00", carbs: 40, sugars: 20, fats: 10, proteins: 5, uri: "", name: ""}
	 * 
	 */
	logs: [
	{date: "Friday December 8\n 12:20 PM", carbs: 77, sugars: 45, fats: 27, proteins: 35, 
	uri: require("../assets/images/food_photos/lamb_gyro.jpg"), name: "lamb gyro", 'source': null},
	{date: "Friday December 8\n 3:15 PM", carbs: 32, sugars: 20, fats: 27, proteins: 19, 
	uri: require("../assets/images/food_photos/egg_biscut.jpg"), name: "egg biscuit", 'source': null},
	{date: "Friday December 8\n 6:20 PM", carbs: 72, sugars: 40, fats: 34, proteins: 31, 
	uri: require("../assets/images/food_photos/pizza.jpg"), name: "pizza", 'source': null},
	].reverse(),
	names: {"vanilla cupcake": "../assets/images/food_photos/vanilla_cupcake.jpg", "tacos": "../assets/images/food_photos/tacos.jpg",
	"veggie burger": "../assets/images/food_photos/veggie_burger.jpg", "lamb gyro": "../assets/images/food_photos/lamb_gyro.jpg",
	"egg biscuit": "../assets/images/food_photos/egg_biscut.jpg", "steak": "../assets/images/food_photos/steak_with_mushrooms.jpg",
	"pizza": "../assets/images/food_photos/pizza.jpg",
	},
}