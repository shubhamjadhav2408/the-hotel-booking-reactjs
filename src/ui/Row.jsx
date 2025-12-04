import styled, { css } from "styled-components";

const Row = styled.div`
	display: flex;

	// Read the 'type' prop ONLY ONCE and apply styles based on its value
	${({ type = "vertical" }) => {
		// 1. Handle 'horizontal' styles
		if (type === "horizontal") {
			return css`
				justify-content: space-between;
				align-items: center;
			`;
		}

		// 2. Handle 'vertical' styles (includes the default case)
		return css`
			flex-direction: column;
			gap: 1.6rem;
		`;
	}}
`;

export default Row;
