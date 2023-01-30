// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from 'utils/mongoose'
import Task from 'models/Tasks'
import type { NextApiRequest, NextApiResponse } from 'next'

dbConnect();

export default async function  handler(req: NextApiRequest,res: NextApiResponse){
  const {method, body} = req

  switch(req.method){

    case 'GET':

      try {
      const task = await Task.find()
      console.log(req.method,req.url);
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
    
    case 'POST':
      const newTask = new Task(body)
      const savedTask = await newTask.save()
      return res.status(201).json(savedTask)

    default:
    return res.status(400).json({msg: 'Este metodo no es soportado'})

  }
  
}
