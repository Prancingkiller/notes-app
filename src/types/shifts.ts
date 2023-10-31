type shiftType = {
    id: 0,
	date: string,
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
    class:String
}

type shiftsType = shiftType[];
export type shiftData = shiftType;
export type eventPHP = eventFromPHP;
export type shiftsData = shiftsType;