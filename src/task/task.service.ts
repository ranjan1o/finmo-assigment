

import { Injectable } from '@nestjs/common';

import { Task } from './task.model';

@Injectable()
export class TaskService {
    private task :Task[]=[]
    getAllTask(): Task[] {
        return this.task
    }
    createTask(tag: string,price:number,image_url:string):Task {
        const id = new Date().toString();
        const task: Task = {
            id,
            tag,
            price,
            image_url,
        }
        this.task.push(task)
        return task
    }
    getTaskByID(id: string):Task{
        let temp = this.task.find(task => task.id === id);
        if (temp) {
            return temp;
        }
        console.log("id doesn't exist there");
       
       
    }
    getTaskByRange(low: number, high: number){
        if (low && high) {
            let temp = this.task.filter(task => task.price > low && task.price < high);
            if (temp.length>0) {
                return temp;
            }
        }
        return "data does't exit in this range";
    }
    getTaskByPrice(price: number){
        if (price) {
            let temp = this.task.filter(task => task.price >= price);
            if (temp) {
                return temp;
            }
        }
        return "id doesn't exist there"
    }
    getTaskByTag(tag: string){
        if (tag) {
            let temp = this.task.filter(task => task.tag === tag);
            console.log(temp)
            if (temp) {
                return temp;
                
            }
        }
        return "data not found"
    }


    deleteTask(id: string) {
        this.task=this.task.filter(task=>task.id!==id)
    }


    updateTask(id: string,price:number,tag:string):Task {
        let task = this.getTaskByID(id);
        if (price) {
            task.price = price;
        }
        if (tag) {
            task.tag = tag;
        }
        
        return task;
    }
}
