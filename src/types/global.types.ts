
export interface DataEntry {
    updateAll(): Promise<any>;
    updateCache(): Promise<any>;
    updateDatabase(): Promise<any>;
}

export interface Indexable {
    [key: string]: any;
}

