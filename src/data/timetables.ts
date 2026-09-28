export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type Subject = { code: string; name: string; slot: string; faculty?: string; sessionType?: 'lecture' | 'lab' };
export type ScheduleEntry = { day: Day; period: number; startTime: string; endTime: string; slot: string; room?: string; sessionType: 'lecture' | 'lab' };
export type Section = { code: string; displayName: string; year: string; semester: string; venue?: string; subjects: Subject[]; weeklySchedule: ScheduleEntry[] };

const times: Record<number, [string, string]> = {
  1: ['09:00', '09:50'], 2: ['09:50', '10:40'], 3: ['10:50', '11:40'], 4: ['11:40', '12:30'],
  5: ['12:30', '13:20'], 6: ['13:20', '14:10'], 7: ['14:10', '15:00'], 8: ['15:10', '16:00'], 9: ['16:00', '16:50'],
};
const subject = (code: string, name: string, slot: string, faculty?: string, sessionType: 'lecture' | 'lab' = 'lecture'): Subject => ({ code, name, slot, faculty, sessionType });
const schedule = (rows: [Day, number, string, string?][]): ScheduleEntry[] => rows.map(([day, period, slot, room]) => ({ day, period, slot, room, sessionType: slot === 'LAB' ? 'lab' : 'lecture', startTime: times[period][0], endTime: times[period][1] }));

const bmeSubjects = [
  subject('21MAB201T', 'Transforms and Boundary Value Problems', 'A', 'Dr. A. Manickam'),
  subject('21BMC202T', 'Biomedical Signals and Systems', 'B', 'Dr. Senthil Kumaran V N'),
  subject('21BMC203J', 'Electric and Electronic Circuits', 'C', 'Dr. Prabin Kumar Bera'),
  subject('21BMC204J', 'Digital Logic for Medical Systems', 'D', 'Dr. G. Gifta'),
  subject('21PYS202T', 'Medical Physics', 'E', 'Dr. D. Rajeswari'),
  subject('21LEM201T', 'Professional Ethics', 'F', 'Dr. H. SriBhuvaneshwari'),
  subject('21LEM202T', 'Universal Human Values-II', 'G', 'Mrs. N. Suganthi'),
  subject('21PDM201L', 'Verbal Reasoning', 'H', 'CDC-TB-106'),
  subject('21PDH201T', 'Social Engineering', 'I', 'RS - EEE'),
];
const dsASubjects = [
  subject('21MAB201T', 'Transforms and Boundary Value Problems', 'A', 'Dr. C. Arun Kumar'), subject('21ECC201T', 'Solid State Devices', 'B', 'Dr. Jeevanantham S'), subject('21CSS201T', 'Computer Organization and Architecture', 'C', 'Dr. P. Murugandiyan'), subject('21ECC203T', 'Digital Logic Design', 'D', 'Dr. S. Krishnakumar'), subject('21ECC205T', 'Electromagnetic Theory and Interference', 'E', 'Dr. V. Bharathi'), subject('21LEM201T', 'Professional Ethics', 'F', 'Dr. Jothi M'), subject('21LEM202T', 'Universal Human Values-II', 'G', 'Mrs. N. Suganthi'), subject('21PDM201L', 'Verbal Reasoning', 'H', 'CDC - TB-106'), subject('21PDH209T', 'Social Engineering', 'I', 'Mrs. D. Lavanya'), subject('21ECC211L', 'Devices and Digital IC Laboratory', 'LAB', 'Dr. Jeevanantham S', 'lab')
];
const ece3Subjects = [subject('21MAB302T', 'Discrete Mathematics', 'A', 'New Faculty'), subject('21ECC301P', 'Microprocessor, Microcontroller, and Interfacing Techniques', 'B', 'Dr. M. Manikandan'), subject('21ECC303T', 'VLSI Design and Technology', 'C', 'Dr. M. Jothi'), subject('21ECE468T', 'System and Network on Chip', 'D', 'Dr. V. Manikandan'), subject('21CSO355T', 'Machine learning for all', 'E', 'Dr. J. Jencia'), subject('21GNP301L', 'Community connect', 'F'), subject('21PDM301L', 'Analytical and logical thinking skills', 'G'), subject('21LEM301T', 'Indian Art Form', 'H', 'Dr. K. Vigneshwaran'), subject('21ECC311L', 'VLSI Design / Microprocessor Laboratory', 'LAB', 'Dr. P. Murugandiyan', 'lab')];
const ece4Subjects = [subject('21GNH401T', 'Behavioural Psychology', 'A', 'Dr. A. Anand'), subject('21ECC401T', 'Wireless Communication and Antenna Systems', 'B', 'Dr. K. Vigneshwaran'), subject('21ECC402P', 'Computer Communication and Network Security', 'C', 'Dr. S. Jeevanantham'), subject('21ECE461T', 'Semiconductor Memory Design', 'D', 'Dr. H. SriBhuvaneshwari'), subject('21ECE463T', 'Scripting Language for Electronic Design Automation', 'E', 'Dr. Sreenivasa Rao Ijada'), subject('21CSO355T', 'Machine learning for all', 'F', 'Dr. N. Prasanna Venkatesh'), subject('21ECC402P-L', 'Computer Communication and Network Security Lab', 'LAB', 'Mrs. T. Swetha', 'lab')];

const makeSection = (code: string, displayName: string, year: string, venue: string, subjects: Subject[], rows: [Day, number, string, string?][]): Section => ({ code, displayName, year, semester: 'III / V / VII Semester', venue, subjects, weeklySchedule: schedule(rows) });
const baseRows: [Day, number, string, string?][] = [['Monday',1,'E'],['Monday',2,'A'],['Monday',3,'I'],['Tuesday',1,'C'],['Tuesday',2,'A'],['Tuesday',3,'E'],['Tuesday',4,'D'],['Wednesday',1,'A'],['Wednesday',2,'B'],['Wednesday',3,'C'],['Wednesday',4,'D'],['Thursday',1,'B'],['Thursday',2,'C'],['Thursday',3,'A'],['Thursday',4,'F'],['Friday',1,'D'],['Friday',2,'B'],['Friday',3,'E'],['Friday',4,'C']];
const eceRows: [Day, number, string, string?][] = [['Monday',1,'E'],['Monday',2,'B'],['Monday',3,'B'],['Monday',4,'A'],['Monday',6,'G'],['Tuesday',1,'H'],['Tuesday',2,'D'],['Tuesday',3,'B'],['Tuesday',4,'F'],['Tuesday',7,'G'],['Wednesday',1,'C'],['Wednesday',2,'A'],['Wednesday',3,'D'],['Wednesday',4,'F'],['Thursday',1,'A'],['Thursday',2,'E'],['Thursday',3,'C'],['Thursday',4,'F'],['Friday',1,'D'],['Friday',2,'A'],['Friday',3,'E'],['Friday',4,'C']];
const finalRows: [Day, number, string, string?][] = [['Monday',1,'C'],['Monday',3,'A'],['Monday',4,'D'],['Tuesday',1,'C'],['Tuesday',2,'D'],['Tuesday',3,'B'],['Tuesday',4,'F'],['Wednesday',1,'B'],['Wednesday',2,'D'],['Wednesday',3,'E'],['Wednesday',4,'F'],['Thursday',1,'F'],['Thursday',2,'A'],['Thursday',3,'E'],['Thursday',4,'B'],['Friday',1,'C'],['Friday',2,'A'],['Friday',3,'D'],['Friday',4,'E']];

export const sections: Section[] = [
 makeSection('II-BME','II - BME','II-Year-BME','IST 602 / FN',bmeSubjects,baseRows),
 makeSection('II-ECE-DS-A','II - ECE-DS A','II-Year-DS-A','IST 416 / FN',dsASubjects,baseRows),
 makeSection('II-ECE-DS-B','II - ECE-DS B','II-Year-DS-B','IST 411 / AN',dsASubjects,baseRows.map(([d,p,s,r])=>[d,p,s,r])),
 makeSection('III-BME','III - BME','III-Year-BME','IST 211 / AN',ece3Subjects,finalRows),
 makeSection('III-ECE-A','III - ECE-A','III-Year-ECE-A','IST 518 / FN',ece3Subjects,eceRows),
 makeSection('III-ECE-B','III - ECE-B','III-Year-ECE-B','IST 518 / AN',ece3Subjects,eceRows.slice(0,18)),
 makeSection('III-ECE-DS','III - ECE-DS','III-Year-ECE-DS','IST 519 / FN',ece3Subjects,baseRows),
 makeSection('IV-ECE-A','IV - ECE-A','IV-Year-ECE-A','IST 225',ece4Subjects,finalRows.slice(0,15)),
 makeSection('IV-ECE-B','IV - ECE-B','IV-Year-ECE-B','IST 227',ece4Subjects,baseRows.slice(0,15)),
];
export const semester = { startDate: '2026-08-29', endDate: '2026-11-29' };
export const periodLabels = times;
