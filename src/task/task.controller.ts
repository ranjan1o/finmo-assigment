


import {Body, Controller,Delete,Get, Param, Patch, Post, UploadedFile, UseInterceptors} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';

import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task/')
export class TaskController {
    constructor(private tasksSrvice: TaskService) {}

    @Get()
    getAllTask():Task[]{
        return this.tasksSrvice.getAllTask()
    }
    
    @Post()
    @UseInterceptors(
        FileInterceptor("photo", {
            dest:"./upload"
        })
        )
    createTask(@Body('tag') tag:string,@Body('price') price:number,@UploadedFile() file):Task {
        return this.tasksSrvice.createTask(tag, price,file.path)
    }

 

    @Get("findbytag")
    getTaskByTagName(@Body('tag') tag: string){
        return this.tasksSrvice.getTaskByTag(tag)
    }

  
    @Get("range")
    getTaskByrange(@Body("low") low: number, @Body("high") high: number){
        return this.tasksSrvice.getTaskByRange(low,high)
    }

    @Get("Price")
    getTaskByPrice(@Body("price") price: number){
        return this.tasksSrvice.getTaskByPrice(price)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        this.tasksSrvice.deleteTask(id);
        return `task ${id} is deleted`
    }
   
        
    @Patch('/:id')
    updateTask(@Param('id') id: string, 
        @Body('price') price: number,@Body('tag') tag:string) {
        return this.tasksSrvice.updateTask(id,price,tag)
    }
   
    
}
