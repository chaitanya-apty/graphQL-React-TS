import { IConfig } from "types/common";

type MayBe<T> = undefined | null | T; 

export default (MODE: MayBe<string>): IConfig => {
    switch(MODE) {
        case 'development': return require('./dev').default;
        case 'production': return require('./prod').default;
    }
}