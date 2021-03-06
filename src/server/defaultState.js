import md5 from "md5";

export const defaultState = {
  users: [
    {
      name: "Test Profile",
      username: "test",
      passwordHash: md5("123"),
      email: "testing@gmail.com",
      phoneNo: "0000000000",
      role: "user",
    },
    {
      name: "Devesh",
      username: "devesh111",
      passwordHash: md5("142q"),
      email: "deveshgusain33@gmail.com",
      phoneNo: "7409692728",
      role: "user",
    },
    {
      name: "guide1",
      username: "guide1",
      passwordHash: md5("123"),
      email: "tour123@gmail.com",
      phoneNo: "1234567890",
      role: "guide",
    },
    {
      name: "guide2",
      username: "guide2",
      passwordHash: md5("123"),
      email: "tour1232@gmail.com",
      phoneNo: "1234567892",
      role: "guide",
    },
    {
      name: "guide3",
      username: "guide3",
      passwordHash: md5("123"),
      email: "tour1232@gmail.com",
      phoneNo: "1234567893",
      role: "guide",
    },
  ],
  guides: [
    {
      id: "guide1",
      languageIds: ["hindi", "english"],
      placeId: "p1",
      location: "https://www.google.co.in/maps/@30.1837897,78.1450406,15z",
    },
    {
      id: "guide2",
      languageIds: ["hindi", "english"],
      placeId: "p1",
      location: "https://www.google.co.in/maps/@30.1942024,78.135535,15.13z",
    },
    {
      id: "guide3",
      languageIds: ["hindi"],
      placeId: "p3",
      location: "https://www.google.co.in/maps/@30.3445675,77.9967391,15.41z",
    },
    {
      id: "guide2",
      languageIds: ["english"],
      placeId: "p2",
      location: "https://www.google.co.in/maps/@30.3445675,77.9967391,15.41z",
    },
  ],
  places: [
    {
      id: "p1",
      name: "Sahastradara",
      cityId: "dehradun",
      location: "https://maps.google.co.in/maps?q=30.387231,78.131606",
      description:
        "Sahastradhara literally means 'thousand-fold spring'. It is a popular attraction, famous for its medicinal & therapeutic value as its water contains sulphur. Sahastradhara is one of the most popular tourist destinations in Uttarakhand and is situated about 14 km from the city of Dehradun, near Robber's Cave.",
      total_guides: 2,
      price: 1000,
    },
    {
      id: "p2",
      name: "Robber's Cave",
      cityId: "dehradun",
      location: "https://maps.google.co.in/maps?q=30.376897,78.0617505",
      description:
        "Robber's Cave, locally known as Gucchu Pani, is a river cave formed in the Himalayas, about 8 kilometres from Dehradun, Uttarakhand. This river cave is believed to be an abode of Lord Shiva and is very close to Sahasradhara.",
      total_guides: 1,
      price: 1500,
    },
    {
      id: "p3",
      name: "Har Ki Pauri",
      cityId: "haridwar",
      location: "https://maps.google.co.in/maps?q=29.9512762,78.1667751",
      description:
        "Regarded as one of the most sacred Ghats in Haridwar and India, Har Ki Pauri is a revered landmark and is visited by devotees and visitors in large number seeking the blessings of Holy Ganga by offering their prayers.",
      total_guides: 1,
      price: 2500,
    },
  ],
  visits: [],
  booked: [],
  ratings: [],
  languages: [
    {
      id: "hindi",
      name: "Hindi",
    },
    {
      id: "english",
      name: "English",
    },
  ],
  state: [
    {
      id: "uttarakhand",
      name: "Uttarakhand",
    },
  ],
  city: [
    {
      id: "dehradun",
      name: "Dehradun",
      stateId: "uttarakhand",
    },
    {
      id: "haridwar",
      name: "Haridwar",
      stateId: "uttarakhand",
    },
  ],
  images: [
    {
      placeId: "p1",
      header:
        "https://www.holidify.com/images/cmsuploads/compressed/Sahastradhara-Dehradun-925752519-4250723-1_20171121221603.jpg",
      all: [
        "https://i.pinimg.com/originals/1e/6c/a1/1e6ca193dbe9a55f5064c96995d3cad4.png",
        "https://media-cdn.tripadvisor.com/media/photo-w/17/61/df/b9/views.jpg",
      ],
    },
    {
      placeId: "p2",
      header:
        "https://media-cdn.tripadvisor.com/media/photo-w/02/f5/01/46/robber-s-cave.jpg",
      all: [
        "https://media-cdn.tripadvisor.com/media/photo-o/03/64/08/48/robber-s-cave.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-p/1a/2d/77/de/robber-s-cave-gucchu.jpg",
      ],
    },
    {
      placeId: "p3",
      header:
        "https://media-cdn.tripadvisor.com/media/photo-w/0a/bb/05/83/budh-poornima-holy-bath.jpg",
      all: [
        "https://i.pinimg.com/originals/1e/6c/a1/1e6ca193dbe9a55f5064c96995d3cad4.png",
        "https://media-cdn.tripadvisor.com/media/photo-w/17/61/df/b9/views.jpg",
      ],
    },
  ],
};
