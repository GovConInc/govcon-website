import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Services from "./routes/Services";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";

// New Resource Pages
import ResourceSAMDBSFema from "./routes/ResourceSAMDBSFema";
import ResourceGSA from "./routes/ResourceGSA";
import ResourceOpportunities from "./routes/ResourceOpportunities";
import ResourceBidOpps from "./routes/ResourceBidOpps";
import ResourceProposals from "./routes/ResourceProposals";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        
        {/* Redirect generic /resources to the first resource or a landing (optional) */}
        <Route path="/resources" element={<ResourceSAMDBSFema />} />
        
        <Route path="/resources/sam-dsbs-fema" element={<ResourceSAMDBSFema />} />
        <Route path="/resources/gsa-vehicles" element={<ResourceGSA />} />
        <Route path="/resources/understand-opportunities" element={<ResourceOpportunities />} />
        <Route path="/resources/find-bid-opportunities" element={<ResourceBidOpps />} />
        <Route path="/resources/writing-proposals" element={<ResourceProposals />} />

        <Route path="/services" element={<Services />} />
        
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

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
