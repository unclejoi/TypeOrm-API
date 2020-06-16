import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as http from 'http';
import * as express from 'express';
import routes from './routes';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as bcrypt from 'bcrypt';

createConnection().then(async connection => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/', routes);
    const server = http.createServer(app);
    server.listen(process.env.PORT || 5000, () => {
        console.log("running on PORT 5000");
    });

    // let a = [3,5,3,5,3,5, 7,9];
    // let n = a.length;
    // if (n<=1) return n;
    // let j = 0;
    // let mL = 0;
    // while (j<n) {
    //     let firstIndex = j;
    //     let secondIndex = j+1;
    //     while (secondIndex+2<n && a[firstIndex]==a[firstIndex+2] && a[secondIndex]==a[secondIndex+2]) {
    //         firstIndex+=2;
    //         secondIndex+=2;
    //     }
    //     if (firstIndex+2<n && a[firstIndex]==a[firstIndex+2]) {
    //         firstIndex+=2;
    //     }
    //     let end = Math.max(firstIndex,secondIndex);
    //     mL = Math.max(mL, end-j+1);
    //     j = end;
    // }
    // return mL;

    // let str = "aaooo";
    // let x : Array<any> = [];
    // let o : Array<any> = [];

    // for(let i = 0; i < str.length; i++){
    //     if(str[i] == "x" || str[i] == "X"){
    //         x.push(str[i]);
    //     }

    //     if(str[i] == "o" || str[i] == "O"){
    //         o.push(str[i]);
    //     }
    // }

    // if(x.length == o.length){
    //     console.log(true);
    // }
    // else{
    //     console.log(false);
    // }

// console.log(Date.parse("September 5, 2014"))



}).catch(error => console.log(error));

