import express from 'express'
import prisma from '../prismaSetup.js'

const router = express.Router()

router.get('/standard', async (req, res) => {
    
    const u = parseInt(req.query.u)
    const v = parseInt(req.query.v)

    const inEdge = await prisma.edge.findUnique({where: {u_v: {u: u, v: v}}})
    const outEdge = await prisma.edge.findUnique({where: {u_v: {u: v, v: u}}})

    if(inEdge || outEdge){
        res.send(`Edge between ${u} and ${v} exists.\n`)
    }
    else{
        res.send(`No edge between ${u} and ${v}.\n`)
    }

})

export default router
