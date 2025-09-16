import { useState, useEffect } from "react";
import CheckboxGroup from "./survey-components/CheckboxGroup";
import RadioGroup from "./survey-components/RadioGroup";
import LabeledTextarea from "./survey-components/LabeledTextarea";
import LabeledInput from "./survey-components/LabeledInput";
import AnswersList from "./AnswersList";

const API_URL = "http://localhost:3000/answers";

const initialForm = {
	colour: "",
	timeSpent: [],
	review: "",
	username: "",
	email: "",
};

const colourOptions = [
	{ value: "1", label: "1" },
	{ value: "2", label: "2" },
	{ value: "3", label: "3" },
	{ value: "4", label: "4" },
];
const timeSpentOptions = [
	{ value: "swimming", label: "Swimming" },
	{ value: "bathing", label: "Bathing" },
	{ value: "chatting", label: "Chatting" },
	{ value: "noTime", label: "I dont like to spend time with it" },
];

function Survey() {
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState(initialForm);
	const [answers, setAnswers] = useState([]);
	const [editIndex, setEditIndex] = useState(null);

	// Fetch answers from server on mount
	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => setAnswers(data));
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === "checkbox") {
			setForm((prev) => ({
				...prev,
				timeSpent: checked ? [...prev.timeSpent, value] : prev.timeSpent.filter((v) => v !== value),
			}));
		} else if (type === "radio") {
			setForm((prev) => ({
				...prev,
				[name]: value,
			}));
		} else {
			setForm((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleEdit = (index) => {
		const answer = answers[index];
		setForm({
			colour: answer.colour,
			timeSpent: answer.timeSpent,
			review: answer.review,
			username: answer.username,
			email: answer.email,
			id: answer.id, // keep id for editing
		});
		setEditIndex(index);
	};

	const handleDelete = (index) => {
		const answer = answers[index];
		fetch(`${API_URL}/${answer.id}`, { method: "DELETE" }).then(() => {
			setAnswers((prev) => prev.filter((_, i) => i !== index));
			if (editIndex === index) {
				setForm(initialForm);
				setEditIndex(null);
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editIndex !== null && form.id) {
			// Update existing answer
			fetch(`${API_URL}/${form.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			})
				.then((res) => res.json())
				.then((updated) => {
					setAnswers((prev) => prev.map((ans, i) => (i === editIndex ? updated : ans)));
					setEditIndex(null);
					setForm(initialForm);
				});
		} else {
			// Add new answer
			fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			})
				.then((res) => res.json())
				.then((newAnswer) => {
					setAnswers((prev) => [...prev, newAnswer]);
					setForm(initialForm);
				});
		}
	};

	return (
		<main className="survey">
			<section className={`survey__list ${open ? "open" : ""}`}>
				<h2>Answers list</h2>
				<AnswersList answersList={answers} onEdit={handleEdit} onDelete={handleDelete} />
			</section>
			<section className="survey__form">
				<form className="form" onSubmit={handleSubmit}>
					<h2>Tell us what you think about your rubber duck!</h2>
					<RadioGroup
						name="colour"
						options={colourOptions}
						selected={form.colour}
						onChange={handleChange}
						legend="How do you rate your rubber duck colour?"
					/>
					<CheckboxGroup
						name="spend-time"
						options={timeSpentOptions}
						selected={form.timeSpent}
						onChange={handleChange}
						legend="How do you like to spend time with your rubber duck"
					/>
					<LabeledTextarea
						label="What else have you got to say about your rubber duck?"
						name="review"
						cols="30"
						rows="10"
						value={form.review}
						onChange={handleChange}
					/>
					<LabeledInput
						label="Put your name here (if you feel like it):"
						type="text"
						name="username"
						value={form.username}
						onChange={handleChange}
					/>
					<LabeledInput label="Leave us your email pretty please??" type="email" name="email" value={form.email} onChange={handleChange} />
					<input className="form__submit" type="submit" value={editIndex !== null ? "Save Changes" : "Submit Survey!"} />
				</form>
			</section>
		</main>
	);
}

export default Survey;
