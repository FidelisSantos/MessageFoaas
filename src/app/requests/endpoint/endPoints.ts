export function endPoints(random: number, from: string, name: string){
    switch(random){
        case 0: 
            return `/essex/${name}/${from}`;
        case 1: 
            return `/london/${name}/${from}`;
        case 2: 
            return `/thanks/${name}/${from}`;
        case 3: 
            return `/ity/${name}/${from}`;
        default:
            return `/linus/${name}/${from}`;
            
    }
}