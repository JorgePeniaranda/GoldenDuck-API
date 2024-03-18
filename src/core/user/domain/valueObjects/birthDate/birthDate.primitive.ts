import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'

export interface PrimitiveBirthDate {
  birthDate: PrimitivePastDate['pastDate']
}
