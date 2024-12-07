// src/plumStore/index.js
import { reactive } from "vue";

const state = reactive({
  navItems: [
    {
      root: "/artisans",
      to: "/artisans",
      icon: "eva-globe-outline",
    },
    {
      root: "/profile",
      to: "/profile",
      icon: "eva-square",
    },
  ],
  usePageTransition: false,
  theme: "dark-blue",
  textColor: "",
  textColorOptions: {},
  craftOptions: [],
  locations: [],
  artisans: [],
  groups: [],
  shops: [],
  user: {
    displayName: "",
    username: "",
    email: "",
    jobCategory: "",
    availability: "",
  },
  isAuthenticated: false,
});

const store = {
  state,

  setUserDetails(userDetails) {
    this.state.user.displayName = userDetails.displayName;
    this.state.user.username = userDetails.username;
    this.state.user.email = userDetails.email;
    this.state.user.jobCategory = userDetails.jobCategory;
    this.state.user.availability = userDetails.availability;
  },

  setLocation(location) {
    this.state.locations.push(location);
  },

  toggleArtisanContact(artisan) {
    artisan.showContact = !artisan.showContact;
  },

  toggleGroupContact(group) {
    group.showContact = !group.showContact;
  },

  setAuthenticationStatus(isAuthenticated) {
    this.state.isAuthenticated = isAuthenticated;
  },

  assignCurrentUserToShop(shopName) {
    const newShop = {
      name: shopName,
      owner: this.state.user.email,
      employees: [this.state.user.email],
    };
    this.state.shops.push(newShop);
    console.log("Shop registered:", newShop);
  },
};

export default store;
