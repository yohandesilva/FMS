import { Routes, Route } from "react-router-dom";
import Header from "../components/PassengerCargo/general/Header";
import Footer from "../components/PassengerCargo/general/Footer";
import Home from "../pages/PassengerCargo/Home";
import Cargo from "../pages/PassengerCargo/Cargo";
import Flights from "../pages/PassengerCargo/Flights";
import DepartureFlight from "../components/PassengerCargo/DepartureFlight";
import ReturnFlight from "../components/PassengerCargo/ReturnFlight";
import Price from "../components/PassengerCargo/Price";
import PassengerDetails from "../components/PassengerCargo/PassengerDetails";
import BookSeat from "../components/PassengerCargo/BookSeat";
import PaymentMethods from "../components/PassengerCargo/PaymentMethods";
import ADForm from "../components/PassengerCargo/ADForm";

const ApplicantRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* route: general */}
        <Route path="/" element={<Home />} />
        <Route path="/cargo" element={<Cargo />} />
        <Route path="/acceptance-declaration" element={<ADForm />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/departure-flight" element={<DepartureFlight />} />
        <Route path="/return-flight" element={<ReturnFlight />} />
        <Route path="/price-details" element={<Price />} />
        <Route path="/passenger-details" element={<PassengerDetails />} />
        <Route path="/booking-seats" element={<BookSeat />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        {/* add other routes below */}
      </Routes>
      <Footer />
    </>
  );
};

export default ApplicantRoutes;
