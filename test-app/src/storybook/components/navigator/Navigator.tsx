import { FC, MutableRefObject } from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import DoneIcon from '@mui/icons-material/Done'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'

const useStyles = makeStyles({
	navigator: {
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
		padding: 20,
		zIndex: 5,
		'& .item': {
			padding: 10,
			cursor: 'pointer',
			'& > *': {
				display: 'flex',
				alignItems: 'center',
				gap: 10,
			},
		},
	},
})

interface NavigatorProps {
	processingTableRef: MutableRefObject<any>
	acceptedTableRef: MutableRefObject<any>
	rejectedTableRef: MutableRefObject<any>
	invalidTableRef: MutableRefObject<any>
	unknownTableRef: MutableRefObject<any>
}

const Navigator: FC<NavigatorProps> = ({
	processingTableRef,
	acceptedTableRef,
	rejectedTableRef,
	invalidTableRef,
	unknownTableRef,
}) => {
	const classes = useStyles()

	return (
		<div className={classes.navigator}>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
			<div
				className='item'
				onClick={() =>
					processingTableRef.current?.scrollIntoView({ behavior: 'smooth' })
				}
			>
				<Typography>
					В Обработке <DonutLargeIcon />
				</Typography>
			</div>
			<div
				className='item'
				onClick={() =>
					acceptedTableRef.current?.scrollIntoView({ behavior: 'smooth' })
				}
			>
				<Typography>
					Принятые <DoneIcon />
				</Typography>
			</div>
			<div
				className='item'
				onClick={() =>
					rejectedTableRef.current?.scrollIntoView({ behavior: 'smooth' })
				}
			>
				<Typography>
					Откаленные <ThumbDownIcon />
				</Typography>
			</div>
			<div
				className='item'
				onClick={() =>
					invalidTableRef.current?.scrollIntoView({ behavior: 'smooth' })
				}
			>
				<Typography>
					Невалидные <DoDisturbOnIcon />
				</Typography>
			</div>
			<div
				className='item'
				onClick={() =>
					unknownTableRef.current?.scrollIntoView({ behavior: 'smooth' })
				}
			>
				<Typography>
					Остальные
					<MoreHorizIcon />
				</Typography>
			</div>
		</div>
	)
}

export default Navigator
