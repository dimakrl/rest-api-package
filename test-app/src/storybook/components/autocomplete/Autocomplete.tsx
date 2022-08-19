import { FC } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export interface SelectOption {
	value: string
	label: string
}

interface AutocompleteProps {
	disabled: boolean
	value: SelectOption | null
	onChange: (value: SelectOption | null) => void
	options: SelectOption[]
	label?: string
}

const GeneralAutocomplete: FC<AutocompleteProps> = ({
	disabled,
	value,
	options,
	onChange,
	label,
}) => {
	return (
		<Autocomplete
			disabled={disabled}
			disablePortal
			value={value}
			options={options}
			sx={{ width: 300 }}
			renderInput={params => <TextField {...params} label={label} />}
			onChange={(event, newValue) => {
				onChange(newValue as SelectOption)
			}}
			isOptionEqualToValue={(option: SelectOption, valueOrigin: SelectOption) =>
				option.value === valueOrigin.value
			}
		/>
	)
}

GeneralAutocomplete.defaultProps = {
	label: '',
}

export default GeneralAutocomplete
