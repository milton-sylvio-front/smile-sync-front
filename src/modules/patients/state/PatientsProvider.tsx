'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  createPatient,
  formatStamp,
} from '@/modules/patients/lib/patient'
import type {
  NewPatientContent,
  Patient,
  PatientDraft,
  PatientFile,
  PatientsContent,
} from '@/modules/patients/types/patients'

type PatientsContextValue = {
  content: PatientsContent
  formContent: NewPatientContent
  patients: Patient[]
  selectedId: string | null
  query: string
  setQuery: (value: string) => void
  select: (id: string) => void
  nextRecordNumber: string
  addPatient: (draft: PatientDraft) => string
  updatePatient: (id: string, draft: PatientDraft) => void
  addEvolution: (
    id: string,
    entry: { title: string; description: string },
  ) => void
  addFile: (id: string, file: { name: string; kind: PatientFile['kind'] }) => void
  sign: (id: string) => void
  removePatient: (id: string) => void
}

const PatientsContext = createContext<PatientsContextValue | null>(null)

type PatientsProviderProps = {
  content: PatientsContent
  formContent: NewPatientContent
  children: ReactNode
}

export function PatientsProvider({
  content,
  formContent,
  children,
}: PatientsProviderProps) {
  const [patients, setPatients] = useState(content.patients)
  const [selectedId, setSelectedId] = useState<string | null>(
    content.patients[0]?.id ?? null,
  )
  const [query, setQuery] = useState('')

  const nextRecordNumber = useMemo(() => {
    const highest = patients.reduce((current, patient) => {
      const value = Number(patient.recordNumber)
      return Number.isFinite(value) ? Math.max(current, value) : current
    }, 44828)

    return String(highest + 1)
  }, [patients])

  const value = useMemo<PatientsContextValue>(
    () => ({
      content,
      formContent,
      patients,
      selectedId,
      query,
      setQuery,
      select: setSelectedId,
      nextRecordNumber,
      addPatient: (draft) => {
        const id = crypto.randomUUID()
        const patient = createPatient(draft, {
          id,
          recordNumber: nextRecordNumber,
        })
        setPatients((current) => [patient, ...current])
        setSelectedId(id)
        setQuery('')
        return id
      },
      updatePatient: (id, draft) => {
        setPatients((current) =>
          current.map((patient) =>
            patient.id === id
              ? createPatient(draft, {
                  id,
                  recordNumber: patient.recordNumber,
                  previous: patient,
                })
              : patient,
          ),
        )
        setSelectedId(id)
      },
      addEvolution: (id, entry) => {
        const stamp = formatStamp(new Date())
        setPatients((current) =>
          current.map((patient) =>
            patient.id === id
              ? {
                  ...patient,
                  lastVisit: stamp.date,
                  signaturePending: true,
                  treatments: [
                    {
                      id: crypto.randomUUID(),
                      date: stamp.date,
                      time: stamp.time,
                      author: content.clinician,
                      title: entry.title,
                      description: entry.description,
                    },
                    ...patient.treatments,
                  ],
                }
              : patient,
          ),
        )
      },
      addFile: (id, file) => {
        setPatients((current) =>
          current.map((patient) =>
            patient.id === id
              ? {
                  ...patient,
                  files: [
                    ...patient.files,
                    {
                      id: crypto.randomUUID(),
                      name: file.name,
                      kind: file.kind,
                    },
                  ],
                }
              : patient,
          ),
        )
      },
      sign: (id) => {
        setPatients((current) =>
          current.map((patient) =>
            patient.id === id ? { ...patient, signaturePending: false } : patient,
          ),
        )
      },
      removePatient: (id) => {
        setPatients((current) => current.filter((patient) => patient.id !== id))
        setSelectedId((current) => (current === id ? null : current))
      },
    }),
    [content, formContent, nextRecordNumber, patients, query, selectedId],
  )

  return <PatientsContext.Provider value={value}>{children}</PatientsContext.Provider>
}

export function usePatients() {
  const context = useContext(PatientsContext)

  if (!context) {
    throw new Error('usePatients deve ser usado dentro de PatientsProvider')
  }

  return context
}
