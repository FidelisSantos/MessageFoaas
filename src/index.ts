import readline from "readline";
import { Index } from './app/ui/index';

export const ready = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const index : Index = new Index();

export function initializeApp(){
    index.App();
}

initializeApp();