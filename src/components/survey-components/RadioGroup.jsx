import PropTypes from "prop-types";

function RadioGroup({ name, options, selected, onChange, legend }) {
	return (
		<div className="form__group radio">
			<h3>{legend}</h3>
			<ul>
				{options.map((opt) => (
					<li key={opt.value}>
						<input
							id={`${name}-${opt.value}`}
							type="radio"
							name={name}
							value={opt.value}
							checked={selected === String(opt.value)}
							onChange={onChange}
						/>
						<label htmlFor={`${name}-${opt.value}`}>{opt.label}</label>
					</li>
				))}
			</ul>
		</div>
	);
}

RadioGroup.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	selected: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	legend: PropTypes.string.isRequired,
};

export default RadioGroup;
