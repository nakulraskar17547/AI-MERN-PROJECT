import express from "express"

import isAuth from "../middlewares/isAuth.js"
import { changes, generateWebsite, getAll, getWebsiteById, getBySlug, markDeployed } from "../controllers/website.controller.js"


const websiteRouter = express.Router()


websiteRouter.post("/generate",isAuth, generateWebsite)
websiteRouter.post("/update/:id",isAuth, changes)
websiteRouter.get("/get-by-id/:id",isAuth, getWebsiteById)
websiteRouter.get("/get-by-slug/:slug", getBySlug)
websiteRouter.get("/get-all",isAuth, getAll)
websiteRouter.post("/mark-deployed/:id",isAuth, markDeployed)

export default websiteRouter
