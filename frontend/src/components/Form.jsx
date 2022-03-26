import { DateRange } from "react-date-range";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";


export default function DatePickerForm({callBackFunc}){

    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
    ]);

    const onSubmit = () => {
        callBackFunc(dateRange);
    }

    return (
        <div style = {{ display: 'flex', flexDirection: 'column'}}>
            <DateRange
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
            />
            <Button variant="contained" endIcon={<SendIcon />} onClick={onSubmit}>
                Send Request
            </Button>
        </div>
    )
}