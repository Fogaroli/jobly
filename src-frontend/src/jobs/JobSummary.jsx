import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

// Component used to display information for each job.
// Component should show a button to allow user application to the job
const Job = ({details})=>{
    const {userData, applyJob} = useContext(AuthContext)
    const [applicationLoading, setApplicationLoading] = useState(false)

    // Function to send job application request
    const sendApplication = async ()=>{
      setApplicationLoading(true)
      const success = await applyJob(details.id)
      if (success) setApplicationLoading(false)
    }

    return (
      <>
        <div className="Job card mb-3">
          <div className="card-body">
            <div className="text-start mb-3">
              <p className="h6 mb-0">{details.title}</p>
              {details.companyName && <p>{details.companyName}</p>}
            </div>
            <p className="text-start mb-0">Salary: {details.salary}</p>
            <p className="text-start mb-0">Equity: {details.equity}</p>
            <div className="d-flex justify-content-end">
              <div>
                {applicationLoading && <FontAwesomeIcon icon={faSpinner} size="2x" spin/>}
              </div>
              <div>
                {userData.applications.includes(details.id) ? (
                  <button type="button" className="btn btn-dark" disabled>
                    Applied
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={sendApplication}
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Job