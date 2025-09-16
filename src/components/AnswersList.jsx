import AnswersItem from "./AnswersItem";

export default function AnswersList({ answersList, onEdit, onDelete }) {
	return (
		<ul>
			{answersList.map((answerItem, i) => (
				<AnswersItem answerItem={answerItem} key={answerItem.id || i} onEdit={() => onEdit(i)} onDelete={() => onDelete(i)} />
			))}
		</ul>
	);
}
