import './CompanySummary.css'
import { useNavigate } from 'react-router-dom';

// Component to show short description of each company.
const CompanySummary = ({company}) => {
    const navigate = useNavigate()

    const handleClick = (evt)=>{
        navigate(`${company.handle}`)
    }

    return (
      <>
        <div className="companySummary card mb-3" onClick={handleClick}>
          <div className="card-body">
            <p className="h6 text-start mb-3">{company.name}</p>
            <p className="text-start">{company.description}</p>
          </div>
        </div>
      </>
    );
}

export default CompanySummary