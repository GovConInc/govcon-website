import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Resources from "./routes/Resources";
import Services from "./routes/Services";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";
import ResourceSAMDBSFema from "./routes/ResourceSAMDBSFema";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* future pages (kept as routes so the menu can be "to a T") */}
        <Route path="/resources/sam-dsbs-fema" element={<ResourceSAMDBSFema />} />
        <Route path="/resources/gsa-vehicles" element={<Resources initialSection="gsa" />} />
        <Route path="/resources/understand-opportunities" element={<Resources initialSection="opps" />} />
        <Route path="/resources/find-bid-opportunities" element={<Resources initialSection="bids" />} />
        <Route path="/resources/writing-proposals" element={<Resources initialSection="proposals" />} />

        <Route path="/services/gsa-mas-submission" element={<Services initialTab="gsa-mas" />} />
        <Route path="/services/contract-management" element={<Services initialTab="contract-management" />} />
        <Route path="/services/oasis-and-others" element={<Services initialTab="oasis" />} />
        <Route path="/services/fcp-baseline-upload" element={<Services initialTab="fcp" />} />
        <Route path="/services/registration-management" element={<Services initialTab="registration" />} />
        <Route path="/services/capture-management" element={<Services initialTab="capture" />} />
        <Route path="/services/proposal-writing" element={<Services initialTab="proposal" />} />
        <Route path="/services/process-improvement" element={<Services initialTab="process" />} />

        <Route path="/programs/kickoff" element={<Services initialTab="kickoff" />} />
        <Route path="/programs/prime" element={<Services initialTab="prime" />} />
        <Route path="/programs/vip" element={<Services initialTab="vip" />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
