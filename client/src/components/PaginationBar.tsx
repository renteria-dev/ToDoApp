import * as React from "react";
import Box from "@mui/material/Box";
import { Pagination, Typography } from "@mui/material";

function PaginationBar() {
	const [page, setPage] = React.useState(1);
	const handleChange = (_event: any, value: React.SetStateAction<number>) => {
		setPage(value);
	};
	return (
		<div className="App">
			<div
				className="head"
				style={{
					width: "fit-content",
					margin: "auto",
				}}
			>
				</div>
			<br />
			<Box
				sx={{
					margin: "auto",
					width: "fit-content",
					alignItems: "center",
				}}
			>
				<Pagination count={10} page={page} 
					onChange={handleChange} />
                    <br></br>
			</Box>
		</div>
	);
}
export default PaginationBar;
