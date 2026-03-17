import PropTypes from "prop-types";
import "./ErrorMessage.css";
/**
 * Displays an error message in UI.
 *
 * @param {Object} props
 * @param {string} [props.message='Something went wrong.']
 * @returns {JSX.Element}
 */
export default function ErrorMessage({ message = "Something went wrong." }) {
  return <div className="error-message">{message}</div>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
