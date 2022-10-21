export default function Box(props) {
	const { title, data, unit } = props;
	return (
		<div>
			<div>{title}</div>
			<div>
				{data}
				<span>{unit}</span>
			</div>
		</div>
	);
}
