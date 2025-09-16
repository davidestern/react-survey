import PropTypes from "prop-types";

function LabeledInput({ label, ...props }) {
	return (
		<label>
			{label}
			<input {...props} />
		</label>
	);
}

LabeledInput.propTypes = {
	label: PropTypes.string.isRequired,
};

export default LabeledInput;
