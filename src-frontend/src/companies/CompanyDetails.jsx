import JoblyApi from "../helper/api";
import { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import JobSummary from "../jobs/JobSummary";
import Loading from "../common/Loading";

/** Component to show company details and correlated jobs*/
const CompanyDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({});
  const { userData } = useContext(AuthContext);
  const params = useParams();
  const handle = params.handle;

  // Should execute async data request on first load of the component to 
  // collect company details from the API
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompanyDetails(company);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompany();
  }, []);

  // Redirect in case of user not authenticated
  if (userData === "") {
    return <Navigate to="/" />;
  }

  // Show loading while company data is not displayed
  if (isLoading) {
    return <Loading/>;
  }
  return (
    <>
      <div className="container">
        <div className="container">
          <p className="h4 text-start">{companyDetails.name}</p>
          <p className="text-start">{companyDetails.description}</p>
        </div>
      </div>
      <div className="container">
        {companyDetails.jobs.map((item, idx) => (
          <JobSummary key={idx} details={item} />
        ))}
      </div>
    </>
  );
};

export default CompanyDetails;
