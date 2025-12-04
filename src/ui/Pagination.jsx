import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${(props) =>
		props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
	color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

const Pagination = ({ count }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currPage = searchParams.get("page")
		? Number(searchParams.get("page"))
		: searchParams.set("page", 1);

	const pageCount = Math.ceil(count / PAGE_SIZE);

	const handleNext = () => {
		if (currPage === pageCount) return;
		searchParams.set("page", currPage + 1);
		setSearchParams(searchParams);
	};

	const handlePrev = () => {
		if (currPage === 1) return;
		searchParams.set("page", currPage - 1);
		setSearchParams(searchParams);
	};

	if (pageCount <= 1) return null;

	return (
		<StyledPagination>
			<P>
				Showing <span>{(currPage - 1) * PAGE_SIZE}</span> to{" "}
				<span>
					{currPage * PAGE_SIZE > count
						? count
						: currPage * PAGE_SIZE}
				</span>{" "}
				records of <span>{count}</span> results
			</P>

			<Buttons>
				<PaginationButton
					onClick={handlePrev}
					disabled={currPage === 1}
				>
					<HiChevronLeft /> <span>Previous</span>
				</PaginationButton>
				<PaginationButton
					onClick={handleNext}
					disabled={currPage === pageCount}
				>
					<span>Next</span> <HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
};

export default Pagination;
