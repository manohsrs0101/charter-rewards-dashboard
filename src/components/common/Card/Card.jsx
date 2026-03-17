import PropTypes from "prop-types";
import "./Card.css";

/**
 * Simple wrapper component for card-style containers.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - content rendered inside the card
 * @returns {JSX.Element}
 */
export default function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
