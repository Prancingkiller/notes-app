type shiftType = {
    id: 0,
	date: string,
    date_start?: string,
    date_finish?: string,
	time_start: string,
	time_finish: string,
	userId: number
};
type eventFromPHP = {
    eventId:number,
    workerId: string,
    start:string,
    end:string,
    split:number,
    class:String,
    _eid?:String
}

type shiftsType = shiftType[];
export type shiftData = shiftType;
export type eventPHP = eventFromPHP;
export type shiftsData = shiftsType;