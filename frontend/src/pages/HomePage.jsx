import React from "react";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events.jsx";
import Sponsored from "../components/Route/Sponsored/Sponsored";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const HomePage = () => {
	return (
		<div>
			<Header />
			<Hero />
			<Categories />
			<BestDeals />
			<Events />
			<FeaturedProduct />
			<Sponsored />
			<Footer />
		</div>
	);
};

export default HomePage;
