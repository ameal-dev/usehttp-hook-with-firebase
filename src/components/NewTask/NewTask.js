import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const FIREBASE_URL = "";

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendPostRequest } = useHttp();

	const enterTaskHandler = async (taskText) => {
		const transformData = (task) => {
			const generatedId = task.name; // firebase-specific => "name" contains generated id
			const createdTask = { id: generatedId, text: taskText };

			props.onAddTask(createdTask);
		};
		sendPostRequest(
			{
				url: FIREBASE_URL,
				method: "POST",
				body: taskText,
				headers: { "Content-Type": "application/json" },
			},
			transformData
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
