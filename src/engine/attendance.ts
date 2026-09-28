import type { Section, Subject, ScheduleEntry, Day } from '@/data/timetables';

export type AttendanceRecord = { attended: number; conducted: number };
export type AttendanceMap = Record<string, AttendanceRecord>;
export type ClassInstance = ScheduleEntry & { date: string; subject: Subject };
export type SubjectMetrics = AttendanceRecord & { percentage: number; remaining: number; required75: number; required90: number; safeAbsences75: number; safeAbsences90: number; maxAchievable: number; recovery75: boolean; recovery90: boolean };

const dayNames: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as Day[];
const toDate = (value: string): Date => { const [y, m, d] = value.split('-').map(Number); return new Date(y, m - 1, d); };
export const formatDate = (date: Date): string => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const todayString = (): string => formatDate(new Date());
export const addDays = (value: string, amount: number): string => { const date = toDate(value); date.setDate(date.getDate() + amount); return formatDate(date); };
export const dateLabel = (value: string): string => toDate(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const instanceMatches = (entry: ScheduleEntry, date: Date): boolean => entry.day === dayNames[date.getDay()];
export const getClassesBetweenDates = (section: Section, start: string, end: string): ClassInstance[] => {
  const result: ClassInstance[] = []; let cursor = toDate(start); const limit = toDate(end);
  while (cursor <= limit) { for (const entry of section.weeklySchedule) if (instanceMatches(entry, cursor)) { const found = section.subjects.find((item) => item.slot === entry.slot); if (found) result.push({ ...entry, date: formatDate(cursor), subject: found }); } cursor.setDate(cursor.getDate() + 1); }
  return result;
};
export const getSubjectClassesBetweenDates = (section: Section, subjectCode: string, start: string, end: string): ClassInstance[] => getClassesBetweenDates(section, start, end).filter((item) => item.subject.code === subjectCode);
export const percentage = (attended: number, conducted: number): number => conducted > 0 ? (attended / conducted) * 100 : 0;
export const calculateProjectedAttendance = (record: AttendanceRecord, futureAttended: number, futureClasses: number): number => percentage(record.attended + futureAttended, record.conducted + futureClasses);
export const requiredForTarget = (record: AttendanceRecord, remaining: number, target: number): number => Math.max(0, Math.ceil((target * (record.conducted + remaining) / 100) - record.attended));
export const maximumSafeAbsences = (record: AttendanceRecord, remaining: number, target: number): number => { const required = requiredForTarget(record, remaining, target); return Math.max(0, remaining - required); };
export const maximumAchievable = (record: AttendanceRecord, remaining: number): number => calculateProjectedAttendance(record, remaining, remaining);
export const targetReachable = (record: AttendanceRecord, remaining: number, target: number): boolean => requiredForTarget(record, remaining, target) <= remaining;
export const statusFor = (value: number): 'SAFE' | 'CAUTION' | 'DANGER' => value >= 90 ? 'SAFE' : value >= 75 ? 'CAUTION' : 'DANGER';
export const metricFor = (record: AttendanceRecord, remaining: number): SubjectMetrics => ({ ...record, remaining, percentage: percentage(record.attended, record.conducted), required75: requiredForTarget(record, remaining, 75), required90: requiredForTarget(record, remaining, 90), safeAbsences75: maximumSafeAbsences(record, remaining, 75), safeAbsences90: maximumSafeAbsences(record, remaining, 90), maxAchievable: maximumAchievable(record, remaining), recovery75: targetReachable(record, remaining, 75), recovery90: targetReachable(record, remaining, 90) });
export const overallRecord = (subjects: Subject[], records: AttendanceMap): AttendanceRecord => subjects.reduce((total, item) => ({ attended: total.attended + (records[item.code]?.attended ?? 0), conducted: total.conducted + (records[item.code]?.conducted ?? 0) }), { attended: 0, conducted: 0 });
export const getUpcomingClasses = (section: Section, start: string, end: string): ClassInstance[] => getClassesBetweenDates(section, start, end).sort((a, b) => `${a.date}${a.period}`.localeCompare(`${b.date}${b.period}`));
export const subjectName = (section: Section, code: string): string => section.subjects.find((item) => item.code === code)?.name ?? 'Unknown subject';
