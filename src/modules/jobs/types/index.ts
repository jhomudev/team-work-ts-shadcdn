
export type Job = {
  is: string
  title: string
  description: string
  mode: string              
  time: string            
  openings: string       
  status: string
  tags: string[]
  createdAt: string,
  updatedAt: string,
  employer: {
    id: string
    username: string
    name: string
  }
}
// id              String @id @default(cuid())
//   title           String
//   description     String
//   mode            JobMode?  
//   time            JobTime?
//   openings        Int
//   seniority       Seniority?
//   status          JobStatus @default(DRAFT)
//   tags            String[]
//   employerId      String @map("employer_id")
//   employer        User @relation(fields: [employerId], references: [id])
//   createdAt       DateTime @default(now()) @map("created_at")
//   updatedAt       DateTime @default(now()) @updatedAt @map("updated_at")
//   applications    Application[]
//   bookmarks       Bookmark[]
export type JobInJobs = {

}