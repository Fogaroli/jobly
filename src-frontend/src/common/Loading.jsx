import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import './Loading.css'

const Loading = () => {
return (
    <div className="LoadingMain">
        <p className="LoadingText">
            Loading <FontAwesomeIcon icon={faSpinner} spin />
        </p>
    </div>
);
};

export default Loading;
