import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import { motion } from "framer-motion";
const EventsPage = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Header activeHeading={4} />
			<EventCard active={true} />
			<EventCard active={true} />
		</motion.div>
	);
};

export default EventsPage;
