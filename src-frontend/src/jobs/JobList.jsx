import JoblyApi from "../helper/api";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import SearchForm from "../common/SearchForm";
import JobSummary from "./JobSummary";
import Loading from "../common/Loading";

// Component to show job list based on a optional search string
const JobList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState({});
  const { userData } = useContext(AuthContext);

  // Load jobs based on search string provided
  // Executed on first render and when search term is changed
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await JoblyApi.getAllJobs(searchTerm);
        setJobList(jobs);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, [searchTerm]);

  // Function to update search term passed to search component as props.
  const search = (term) => {
    term.length > 1 ? setSearchTerm({ title: term }) : setSearchTerm({});
  };

  // Redirect in case of user not authenticated
  if (userData === "") {
    return <Navigate to="/" />;
  }

  // Show loading while job data is not displayed
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container mb-3">
        <SearchForm search={search} />
      </div>
      <div className="container">
        {jobList.map((item, idx) => (
          <JobSummary key={idx} details={item} />
        ))}
      </div>
    </>
  );
};

export default JobList;
