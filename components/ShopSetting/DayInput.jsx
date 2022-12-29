export default function DayInput(props) {
	const { day } = props;
	return (
		<div className='mb-2 flex items-center gap-2 '>
			<label for='' className='text-xs'>
				{day.day}
			</label>
			<input
				className='rounded-lg p-1 w-24 sm:w-32 text-xs'
				type='time'
				onChange={(event) => {
					day.openTime = event.target.value;
				}}
				required></input>
			<div className='mx-3 font-bold'>~</div>
			<input
				className='rounded-lg p-1 w-24 sm:w-32 text-xs'
				type='time'
				onChange={(event) => {
					day.closeTime = event.target.value;
				}}
				required></input>
		</div>
	);
}
