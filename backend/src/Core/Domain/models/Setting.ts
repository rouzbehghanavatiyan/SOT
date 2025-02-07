export class Setting {
    constructor(
        public readonly id: number,
        public readonly profile: string,
        public readonly private: string,
        public readonly comments: string,
        public readonly learn: string,
        public readonly help: string,
        public readonly support: string,
        public readonly logout: string,
    ){
        
    }
}