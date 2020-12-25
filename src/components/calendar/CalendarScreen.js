import React, { useEffect, useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../actions/ui';
import { eventCleanActiveNote, eventStartLoading, setActive } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const {event, activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');


    const onDoubleClick = (e) => {
        dispatch(openModal());
    }
    
    const onSelectEvent = (e) => {
        dispatch(setActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        

            const style = {
                backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
                borderRadius: '0px',
                opacity: 0.8,
                display: 'block',
                color: 'white'
            }
            return {
                style
            }
    }

    moment.locale('es');

    const localizer = momentLocalizer(moment); // or globalizeLocalizer

    const onSelectSlot = (e) => {
        // console.log(e);
        dispatch(eventCleanActiveNote())
    } 

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={event}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter= {eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />


            <AddNewFab/>
            {
                (activeEvent)
                && <DeleteEventFab/>
            }
            

            <CalendarModal/>
        </div>
    )
}
