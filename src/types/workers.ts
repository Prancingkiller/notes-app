type workerType = {
    name:string,
    label:string,
    id:number,
    hours:number,
    SlotDays:{
        Lun:number[],
        Mar:number[],
        Mer:number[],
        Gio:number[],
        Ven:number[],
        Sab:number[],
        Dom:number[],
    },
    favouriteSlots:{
        Lun:number[],
        Mar:number[],
        Mer:number[],
        Gio:number[],
        Ven:number[],
        Sab:number[],
        Dom:number[],
    }
    showDays:boolean
};
type workersType = workerType[];
export type workerData = workerType;
export type workersData = workersType;