import express from 'express'
import prisma from '../prismaSetup.js'

const router = express.Router()

router.post('/standard', async (req, res) => {

    const {u, v} = req.body

    const inEdge = await prisma.edge.findUnique({where: {u_v: {u : u, v : v}}}) 
    const outEdge = await prisma.edge.findUnique({where: {u_v: {u : v, v : u}}}) 

    if(inEdge || outEdge){
        res.send(`An edge between ${u} and ${v} already exists.\n`);
        return
    }

    const checkU = await prisma.node.findUnique({where: {label: u}})
    const checkV = await prisma.node.findUnique({where: {label: v}})

    if(!checkU){
        await prisma.node.create({data:{label: u}})
    }
    if(!checkV){
        await prisma.node.create({data:{label: v}})
    }

    await prisma.node.update({where: {label : u}, data: {adj: {push : v}}})
    await prisma.node.update({where: {label : v}, data: {adj: {push : u}}})

    await prisma.edge.create({data: {u, v}})

    res.send(`Edge added between ${u} and ${v}.\n`);
})

export default router
