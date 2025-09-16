import PropTypes from "prop-types";

function LabeledTextarea({ label, ...props }) {
	return (
		<label>
			{label}
			<textarea {...props} />
		</label>
	);
}

LabeledTextarea.propTypes = {
	label: PropTypes.string.isRequired,
};

export default LabeledTextarea;
