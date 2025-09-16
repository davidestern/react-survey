// Components don't need to be separeted into individual files
// Here we have a smaller component that helps compose the AnswersItem below

const answersSet = {
	swimming: "Swimming",
	bathing: "Bathing",
	chatting: "Chatting",
	noTime: "I don't like to spend time with it",
};

function ItemsList({ list }) {
	return (
		<ul>
			{list.map((item, i) => (
				<li key={i}>{answersSet[item]}</li>
			))}
		</ul>
	);
}

export default function AnswersItem({ answerItem: { username, colour, timeSpent, review }, onEdit, onDelete }) {
	return (
		<li>
			<article className="answer">
				<h3>{username || "Anon"} said:</h3>
				<p>
					<em>How do you rate your rubber duck colour?</em>
					<span className="answer__line">{colour}</span>
				</p>
				<div>
					<em>How do you like to spend time with your rubber duck?</em>
					<ItemsList list={timeSpent} />
				</div>
				<p>
					<em>What else have you got to say about your rubber duck?</em>
					<span className="answer__line">{review}</span>
				</p>
				<button type="button" onClick={onEdit}>
					Edit
				</button>
				<button type="button" onClick={onDelete} style={{ marginLeft: "1rem", color: "red" }}>
					Delete
				</button>
			</article>
		</li>
	);
}
