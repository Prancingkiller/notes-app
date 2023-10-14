type workerType = {
    name:string,
    label:string,
    id:number,
    hours:number,
    SlotDays:{
        Lun:{start:string,finish:string}[],
        Mar:{start:string,finish:string}[],
        Mer:{start:string,finish:string}[],
        Gio:{start:string,finish:string}[],
        Ven:{start:string,finish:string}[],
        Sab:{start:string,finish:string}[],
        Dom:{start:string,finish:string}[],
    },
    favouriteSlots:{
        Lun:{start:string,finish:string}[],
        Mar:{start:string,finish:string}[],
        Mer:{start:string,finish:string}[],
        Gio:{start:string,finish:string}[],
        Ven:{start:string,finish:string}[],
        Sab:{start:string,finish:string}[],
        Dom:{start:string,finish:string}[],
    }
    showDays:boolean
};
type workersType = workerType[];
export type workerData = workerType;
export type workersData = workersType;