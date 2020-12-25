import { types } from '../types/types';

// {
//     id: new Date().getTime(),
//     title: 'cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgColor: '#fafafa',
//     notes: 'Comprar el Pastel',
//     user: {
//         _id: '123',
//         name: 'eyder'
//     }
// }

const initialState = {
    event: [],
    activeEvent: null
}

export const calendarReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.eventsetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                event: [...state.event, action.payload]
            }

        case types.eventClearActivenote:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdate:
            return {
                ...state,
                event: state.event.map(
                    e => e.id === action.payload.id
                        ? action.payload
                        : e
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                event: state.event.filter(e => e.id !== state.activeEvent.id),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                event: [...action.payload]
            }

        case types.eventLogout:
            return {
                event: [],
                activeEvent: null
            }
        default:
            return state;
    }
}