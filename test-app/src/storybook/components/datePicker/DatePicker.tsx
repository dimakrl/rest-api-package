import { FC } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import TextField from '@mui/material/TextField'

interface DatePickerProps {
	value: Date
	onChange: (date: Date | null, keyboardInputValue?: string | undefined) => void
	label: string
	disabled: boolean
}

const DatePicker: FC<DatePickerProps> = ({
	value,
	onChange,
	label,
	disabled,
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DesktopDatePicker
				label={label}
				inputFormat='MM/dd/yyyy'
				value={value}
				onChange={onChange}
				renderInput={params => <TextField {...params} />}
				disabled={disabled}
			/>
		</LocalizationProvider>
	)
}

export default DatePicker
