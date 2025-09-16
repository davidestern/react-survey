import PropTypes from "prop-types";

function CheckboxGroup({ name, options, selected, onChange, legend }) {
	return (
		<div className="form__group">
			<h3>{legend}</h3>
			<ul>
				{options.map((opt) => (
					<li key={opt.value}>
						<label>
							<input name={name} type="checkbox" value={opt.value} checked={selected.includes(opt.value)} onChange={onChange} />
							{opt.label}
						</label>
					</li>
				))}
			</ul>
		</div>
	);
}

CheckboxGroup.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	selected: PropTypes.arrayOf(PropTypes.string).isRequired,
	onChange: PropTypes.func.isRequired,
	legend: PropTypes.string.isRequired,
};

export default CheckboxGroup;
