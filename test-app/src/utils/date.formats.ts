import isValid from 'date-fns/isValid'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import setMilliseconds from 'date-fns/setMilliseconds'
import isBefore from 'date-fns/isBefore'
import setSeconds from 'date-fns/setSeconds'
import isEqual from 'date-fns/isEqual'

class DateFormats {
	static FORMATS = Object.freeze({
		SHORT_MONTH_AND_DAY: 'MMM. d',
		DAY_AND_SHORT_MONTH: 'd MMM.',
		HOURS_AND_MINUTES: 'hh:mm aa',
		HOURS_AND_MINUTES_24: 'HH:mm',
		HOURS: 'h aa',
		HOURS_24: 'HH',
		MINUTES: 'mm',
		YEAR: 'yyyy',
		MONTH: 'MMMM',
		DAY: 'dd',
		STANDARD_DATE: 'MM/dd/yyyy',
		DATEPICKER: 'MMMM / dd / yyyy',
		SHORT_MONTH_AND_YEAR: 'MMM. yyyy',
		SHORT_MONTH_AND_DAY_AND_YEAR: 'MMM. dd • yyyy',
		SHORT_WEEKDAY: 'ccc.',
		EQUIPMENT_PROCEDURE: 'dd/MM/yy',
		WEEK_NUMBER: 'I',
	})

	static isDateValid = (date: any) => {
		return Boolean(date && isValid(new Date(date)))
	}

	static setTime = (
		dateOrigin: Date,
		hours = 0,
		minutes = 0,
		seconds = 0,
		milliseconds = 0
	) => {
		if (!this.isDateValid(dateOrigin)) {
			throw new Error('Date is invalid')
		}

		let date = new Date(dateOrigin)

		date = setHours(date, hours)
		date = setMinutes(date, minutes)
		date = setSeconds(date, seconds)
		date = setMilliseconds(date, milliseconds)

		return date
	}

	static isDateBefore(date: Date, dateToCompare: Date) {
		if (!this.isDateValid(date)) {
			throw new Error('date is invalid')
		}

		if (!this.isDateValid(dateToCompare)) {
			throw new Error('dateToCompare is invalid')
		}

		return isBefore(date, dateToCompare)
	}

	static areDatesEqual(date: Date, dateToCompare: Date) {
		if (!this.isDateValid(date)) {
			throw new Error('date is invalid')
		}

		if (!this.isDateValid(dateToCompare)) {
			throw new Error('dateToCompare is invalid')
		}

		return isEqual(date, dateToCompare)
	}
}

export default DateFormats
