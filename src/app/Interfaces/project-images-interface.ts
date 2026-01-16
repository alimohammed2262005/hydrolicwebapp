export interface ProjectImagesInterface {
id: number
projectId:number,
projectName:string
description:string
image:string
isDeleted:boolean
}
export interface AddOrUpdateProject {
ProjectId:number
Image:string
}