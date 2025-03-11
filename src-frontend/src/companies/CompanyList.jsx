import JoblyApi from "../helper/api"
import { useState, useEffect, useContext } from "react"
import SearchForm from "../common/SearchForm"
import CompanySummary from "./CompanySummary"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import Loading from "../common/Loading"

// Component to create a list of companies, filter company by name based
// on provided string by props
const CompanyList = ()=>{
  const [isLoading, setIsLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState({});
  const { userData } = useContext(AuthContext);

  // Load list of companies based on the provided search string.
  // Triggered on every change of the search string
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await JoblyApi.getCompanies(searchTerm);
        setCompanyList(companies);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, [searchTerm]);

  // Search function to be passed as props to search component
  const search = (term) => {
    term.length > 1 ? setSearchTerm({ name: term }) : setSearchTerm({});
  };

  // Redirect in case of user not authenticated
  if (userData === "") {
    return <Navigate to="/" />;
  }

  // Show loading while company data is not displayed
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container mb-3">
        <SearchForm search={search} />
      </div>
      <div className="container">
        {companyList.map((item, idx) => (
          <CompanySummary key={idx} company={item} />
        ))}
      </div>
    </>
  );
}

export default CompanyList