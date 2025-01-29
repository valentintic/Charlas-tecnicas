
import { Calendar } from 'primereact/calendar';
        

export const CalendarComponent = ({ value, onChange }) => {

    

    nextHour = () => {
        const date = new Date(this.state.value);
        date.setHours(date.getHours() + 1);
        this.setState({ value: date });
    };
    prevHour = () => {
        const date = new Date(this.state.value);
        date.setHours(date.getHours() - 1);
        this.setState({ value: date });
    };

    return (
        <Calendar
            value={value}
            onChange={onChange}
            showTime={true}
            timeOnly={true}
            locale="es"
            dateFormat="dd/mm/yyyy"
            timeFormat="HH:mm"
            minTime="09:00"
            maxTime="18:00"
            showTimezone={false}
            disabledDates={[
                {
                    before: new Date(),
                    label: 'No puedes seleccionar fechas anteriores a la fecha actual',
                },
            ]}
        />
    );
};