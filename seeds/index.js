const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '64b2a0442d5dcc5eac270ebf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, sed similique aliquid minima tenetur, ab non quod magnam optio eius fuga velit magni laborum asperiores? Suscipit quod molestiae dicta molestias!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/duanvxdxw/image/upload/v1688912737/YelpCamp/auovxfho2lg6u1q4nvlw.jpg',
                    filename: 'YelpCamp/auovxfho2lg6u1q4nvlw',
                },
                {
                    url: 'https://res.cloudinary.com/duanvxdxw/image/upload/v1688912748/YelpCamp/lyfqp1czjiz7ihwuxfhi.jpg',
                    filename: 'YelpCamp/lyfqp1czjiz7ihwuxfhi',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})