import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvent";
import { types } from "../types/types";


export const eventStartAddNew = (e) => {
    return async (dispatch, getState) => {

        const {uid, name} = getState().auth;

        try {
            const resp = await fetchConToken('events', e, 'POST');

            const body = await resp.json();

            if (body.ok) {
                
                e.id = body.evento.id;
                e.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(e));
            }

        } catch (error) {
            console.log(error);
        }
    }
}



const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventCleanedLogout = () => ({
    type: types.eventLogout
})

export const setActive = (event) => ({
    type: types.eventsetActive,
    payload: event
});

export const eventCleanActiveNote = () => ({
    type: types.eventClearActivenote
})

const deletedEvent = () => ({
    type: types.eventDeleted
})

export const eventStartDeleted = () => {
    return async(dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;

        try {
            
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');

            const body = await resp.json();

            if(body.ok){
                dispatch(deletedEvent());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }
    }
} 

 const updatedEvent = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventStartUpdate = (e) => {
    return async (dispatch) => {

        try {
            
            const resp = await fetchConToken(`events/${e.id}`, e, 'PUT');

            const body = await resp.json();

            if(body.ok){
                dispatch(updatedEvent(e));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

export const eventStartLoading = () => {
    return async (dispatch) => {


        try {
            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            const events = prepareEvents(body.eventos);
             dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error);
        }

    }
}

const eventLoaded = (e) => ({
    type: types.eventLoaded,
    payload: e
})