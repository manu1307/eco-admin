import styled from "styled-components";

const CouponWrapper = styled.div`
	width: 180px;
	background-color: #3d2e24;
	border-radius: 20px;
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	align-items: center;
	overflow: auto;
`;

const EmptyStamp = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 10px;
	border: 3px dotted white;
	background-color: #7d736c;
`;
const FilledStamp = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 10px;
	border: 3px solid #ee6c7c;
	background-color: #7d736c;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export default function StampCoupon() {
	return (
		<>
			<CouponWrapper>
				<FilledStamp>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='#ee6c7c'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
						/>
					</svg>
				</FilledStamp>
				<EmptyStamp />
				<EmptyStamp />
				<EmptyStamp />
				<EmptyStamp />
				<EmptyStamp />
				<EmptyStamp />
				<EmptyStamp />
				<EmptyStamp />
				<EmptyStamp />
			</CouponWrapper>
		</>
	);
}
