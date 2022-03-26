import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({brandsData}) {
  return (
    <div style = {{paddingLeft: '100px'}}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Brand Name</StyledTableCell>
                <StyledTableCell align="right">Total Profiles</StyledTableCell>
                <StyledTableCell align="right">Engagement</StyledTableCell>
                <StyledTableCell align="right">Fans</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {brandsData.map((brandData) => (
                <StyledTableRow key={brandData.brandName}>
                <StyledTableCell component="th" scope="row">
                    {brandData.brandName}
                </StyledTableCell>
                <StyledTableCell align="right">{brandData.totalProfiles}</StyledTableCell>
                <StyledTableCell align="right">{brandData.engagement}</StyledTableCell>
                <StyledTableCell align="right">{brandData.fans}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}
