import { JobMode, JobStatus, JobTime, Seniority, UserRole } from "@prisma/client";

export const jobStatus: { [key in JobStatus]: string }= {
  DRAFT: 'Borrador',
  OPEN: 'Abierto',
  CLOSED: 'Finalizado'
}

export const jobMode: {[key in JobMode]: string } = {
  HYBRID: 'Híbrido',
  ON_SITE: 'Presencial',
  REMOTE: 'Remoto'
}

export const seniority: {[key in Seniority]: string } = {
  JUNIOR: 'Junior',
  MID_LEVEL: 'Mid level',
  SENIOR: 'Senior',
  TRAINER: 'Trainer'
}

export const jobTime: {[key in JobTime]: string } = {
  FULL_TIME: 'Tiempo completo',
  PART_TIME: 'Tiempo parcial',
}

export const userRole: {[key in UserRole]: string } = {
  EMPLOYER: 'Compañía',
  PEOPLE: 'Persona',
}