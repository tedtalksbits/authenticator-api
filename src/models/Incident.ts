export class Incident {
    readonly id: string;
    type: string;
    program: string;
    prn: string;
    prod_id: string;
    product: string;
    ch_name: string;
    ch_id: string;
    date_time: Date;
    meta_data: {}

    constructor(id: string, type: string, program: string, prn: string, prodId: string, product: string, chName: string, chId: string, dateTime: Date, metaData: {}) {
        this.id = id;
        this.type = type;
        this.program = program;
        this.prn = prn;
        this.prod_id = prodId;
        this.product = product;
        this.ch_name = chName;
        this.ch_id = chId;
        this.date_time = dateTime;
        this.meta_data = metaData;
    }
}

