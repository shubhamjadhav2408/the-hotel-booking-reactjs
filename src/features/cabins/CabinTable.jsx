import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

function CabinTable() {
	const { isPending, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isPending) return <Spinner />;
	if (!cabins.length) return <Empty resource="cabins" />;

	const filterValue = searchParams.get("discount") || "all";

	const filteredCabins = cabins.filter((cabin) => {
		if (filterValue === "with-discount") {
			return cabin.discount > 0;
		} else if (filterValue === "no-discount") {
			return cabin.discount === 0;
		}
		return true;
	});

	const sortBy = searchParams.get("sortBy") || "startDate-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;

	const sortedCabins = filteredCabins.sort((a, b) => {
		const valueA = a[field];
		const valueB = b[field];

		// If the values are strings, use localeCompare
		if (typeof valueA === "string") {
			return valueA.localeCompare(valueB) * modifier;
		}

		// If they are numbers, use standard subtraction
		return (valueA - valueB) * modifier;
	});

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					render={(cabin) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
